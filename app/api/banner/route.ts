import { NextResponse } from 'next/server';
import cloudinary from '../utils/cloudinary';
import { query } from '../utils/db';
import { Readable } from 'stream';
import sql from 'mssql';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    console.log('FormData entries:', [...formData.entries()]);

    const imageFile = formData.get('image') as File;
    if (!imageFile) {
      throw new Error('No file selected');
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const stream = Readable.from(buffer);

    const uploadResponse = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'banners' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Cloudinary upload result:', result);
            resolve(result);
          }
        }
      );
      stream.pipe(uploadStream);
    });

    if (!uploadResponse || !uploadResponse.secure_url) {
      throw new Error('Image upload failed');
    }

    const imageUrl = uploadResponse.secure_url;
    console.log('Image URL:', imageUrl);

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const createdBy = formData.get('createdBy') as string;
    const userId = formData.get('userId') as string;
    const companyId = formData.get('companyId') as string;
    const modifiedBy = formData.get('modifiedBy') as string;

    const insertQuery = `
      INSERT INTO Banners (Title, Description, Image, CreatedBy, UserId, CompanyId, ModifiedBy)
      VALUES (@title, @description, @image, @createdBy, @userId, @companyId, @modifiedBy);
    `;

    const parameters = {
      title: { type: sql.NVarChar, value: title },
      description: { type: sql.NVarChar, value: description },
      image: { type: sql.NVarChar, value: imageUrl },
      createdBy: { type: sql.NVarChar, value: createdBy },
      userId: { type: sql.NVarChar, value: userId },
      companyId: { type: sql.NVarChar, value: companyId },
      modifiedBy: { type: sql.NVarChar, value: modifiedBy }
    };

    const result = await query(insertQuery, parameters);

    console.log('Database insert result:', result);

    if (result && result.recordset && result.recordset.length > 0) {
      return NextResponse.json({
        message: 'Banner created successfully',
        imageUrl: imageUrl,
        sqlStatus: 'Data inserted successfully',
      });
    } else {
      throw new Error('Data insertion failed');
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Failed to create banner', error }, { status: 500 });
  }
}
