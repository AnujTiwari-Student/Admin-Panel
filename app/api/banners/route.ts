import { NextResponse } from 'next/server';
import sql from 'mssql';

const config: sql.config = {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    server: process.env.DB_SERVER as string,
    database: process.env.DB_DATABASE as string,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

export async function GET() {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Banners WHERE IsDeleted = 0');
        return NextResponse.json(result.recordset);
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { title, description, image, createdBy, userId, companyId } = await request.json();
        const pool = await sql.connect(config);
        const query = `INSERT INTO Banners (Title, Description, Image, IsActive, IsDeleted, CreatedBy, CreatedOn, UserId, CompanyId) 
                       VALUES (@title, @description, @image, 1, 0, @createdBy, GETDATE(), @userId, @companyId)`;

        await pool.request()
            .input('title', sql.NVarChar, title)
            .input('description', sql.NVarChar, description)
            .input('image', sql.NVarChar, image)
            .input('createdBy', sql.NVarChar, createdBy)
            .input('userId', sql.Int, userId)
            .input('companyId', sql.Int, companyId)
            .query(query);

        return NextResponse.json({ message: 'Banner created successfully' }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.Int, id)
            .query('UPDATE Banners SET IsDeleted = 1 WHERE Id = @id');
        return NextResponse.json({ message: 'Banner deleted successfully' });
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}
