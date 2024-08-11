import { NextResponse } from 'next/server';
import cloudinary from '../utils/cloudinary';
import { Readable } from 'stream';
import sql from 'mssql';
import { callStoredProcedure } from '../../db'

export async function GET() {
  try {
    console.log("Attempting to call stored procedure...");
    const result = await callStoredProcedure(
      'sp_admin_get_banner',
      [],
      ['StatusID', 'StatusMessage', 'TotalCount']
    );
    console.log("Stored procedure result:", result);

    if (result.statusid === 1) {
      return NextResponse.json(
        {
          statusid: result.statusid,
          statusmessage: result.statusmessage,
          totalcount: result.totalcount,
          data: result.data,
        },
        { status: 200 }
      );
    } else {
      console.warn("Stored procedure returned an error:", result);
      return NextResponse.json(
        { statusid: result.statusid, statusmessage: result.statusmessage },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching banner:", error);
    return NextResponse.json(
      { statusid: 0, statusmessage: "Error fetching banner" },
      { status: 500 }
    );
  }
}

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

    const Image = uploadResponse.secure_url;
    console.log('Image URL:', Image);

    const Title = formData.get('title') as string;
    const Description = formData.get('description') as string;
    // const CreatedBy = formData.get('createdBy') as string
    const UserId = 1;
    const CompanyId = 1;
    const id=0;


    const result = await callStoredProcedure('sp_admin_add_update_banner', { id, Title, Description , Image , UserId , CompanyId  }, [
      'StatusID',
      'StatusMessage'
    ])

    if (result.statusid === 1) {
      return NextResponse.json({ statusid: result.statusid, statusmessage: result.statusmessage }, { status: 200 })
    } else {
      return NextResponse.json({ statusid: result.statusid, statusmessage: result.statusmessage }, { status: 400 })
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Failed to create banner', error }, { status: 500 });
  }
}


export async function PUT(request: Request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    const { BannerId, Title, Description, Image, ModifiedBy, ModifiedOn } = data;

    console.log('Received data for update:', data);

    if (!BannerId) {
      return NextResponse.json({ statusid: 0, statusmessage: 'Missing BannerId parameter' }, { status: 400 });
    }

    const result = await callStoredProcedure(
      'sp_admin_update_banner',
      { BannerId, Title, Description, Image, ModifiedBy, ModifiedOn },
      ['StatusID', 'StatusMessage', 'TotalCount']
    );

    if (result.statusid === 1) {
      return NextResponse.json({ statusid: result.statusid, statusmessage: result.statusmessage }, { status: 200 });
    } else {
      return NextResponse.json({ statusid: result.statusid, statusmessage: result.statusmessage }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating banner:', error);
    return NextResponse.json({ statusid: 0, statusmessage: 'Error updating banner' }, { status: 500 });
  }
}

export async function DELETE(request : Request) {
  try {
    const { searchParams } = new URL(request.url)
    const bannerId = searchParams.get('bannerId')

    console.log('Extracted bannerId:', bannerId);
    
    if (bannerId) {
      const result = await callStoredProcedure('sp_admin_delete_banner', { BannerId: parseInt(bannerId, 10) }, ['StatusID', 'StatusMessage' , 'TotalCount'])
      
      console.log('Stored procedure result:', result);

      if (result.statusid === 1) {
        return NextResponse.json({ statusid: result.statusid, statusmessage: result.statusmessage }, { status: 200 })
      } else {
        return NextResponse.json({ statusid: result.statusid, statusmessage: result.statusmessage }, { status: 400 })
      }
    } else {
      return NextResponse.json({ statusid: 0, statusmessage: 'Missing ID parameter' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error deleting banner:', error)

    return NextResponse.json({ statusid: 0, statusmessage: 'Error deleting banner with given ID' }, { status: 500 })
  }
}
