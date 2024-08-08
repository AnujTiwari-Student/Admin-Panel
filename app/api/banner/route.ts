import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { query } from '../utils/db';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
      INSERT INTO banners (title, description, image_url, created_by, user_id, company_id, modified_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await query(insertQuery, [title, description, imageUrl, createdBy, userId, companyId, modifiedBy]);

    if (!result || result.affectedRows === undefined) {
      throw new Error('Data insertion failed or affectedRows not available');
    }

    console.log('Database insert result:', result);

    return NextResponse.json({
      message: 'Banner created successfully',
      imageUrl: imageUrl,
      sqlStatus: 'Data inserted successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Failed to create banner', error: error.message }, { status: 500 });
  }
}
