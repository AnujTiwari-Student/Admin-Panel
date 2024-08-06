'use server'

import sql from 'mssql';
import dotenv from 'dotenv';


dotenv.config();

const config = {
    connectionString: process.env.DB_CONNECTION_STRING,
};

export default async function handler(req, res) {
    try {
        await sql.connect(config); 

        if (req.method === 'GET') {
            const result = await sql.query`SELECT * FROM Banners WHERE IsDeleted = 0`;
            res.status(200).json(result.recordset);
        } else if (req.method === 'POST') {
            const { title, description, image, createdBy, userId, companyId } = req.body;
            await sql.query`INSERT INTO Banners (Title, Description, Image, IsActive, IsDeleted, CreatedBy, UserId, CompanyId) VALUES (${title}, ${description}, ${image}, 1, 0, ${createdBy}, ${userId}, ${companyId})`;
            res.status(201).json({ message: 'Banner added successfully' });
        } else if (req.method === 'PUT') {
            const { id, title, description, image, modifiedBy } = req.body;
            await sql.query`UPDATE Banners SET Title = ${title}, Description = ${description}, Image = ${image}, ModifiedBy = ${modifiedBy}, ModifiedOn = GETDATE() WHERE Id = ${id}`;
            res.status(200).json({ message: 'Banner updated successfully' });
        } else if (req.method === 'DELETE') {
            const { id } = req.body;
            await sql.query`UPDATE Banners SET IsDeleted = 1 WHERE Id = ${id}`;
            res.status(204).json({ message: 'Banner deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await sql.close();
    }
}
