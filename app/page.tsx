'use client'

import React, { useEffect, useState } from 'react';

interface Banner {
    Id: number;
    Title: string;
    Description: string;
    Image: string;
    CreatedBy: string;
    UserId: string;
    CompanyId: string;
}

const AdminPage: React.FC = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchBanners = async () => {
        try {
            const response = await fetch('https://external-api.com/banners');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBanners(data);
        } catch (error) {
            console.error('Failed to fetch banners:', error);
        }
    };

    const handleEdit = (banner: Banner) => {
        setEditingId(banner.Id);
    };

    const handleDelete = async (id: number) => {
        console.log(`Delete banner with id: ${id}`);
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    return (
        <main>
            <h1>Admin Page</h1>
            <ul>
                {banners.map((banner) => (
                    <li key={banner.Id}>
                        <h2>{banner.Title}</h2>
                        <p>{banner.Description}</p>
                        <img src={banner.Image} alt={banner.Title} />
                        <p>Created By: {banner.CreatedBy}</p>
                        <p>User ID: {banner.UserId}</p>
                        <p>Company ID: {banner.CompanyId}</p>
                        <button onClick={() => handleEdit(banner)}>Edit</button>
                        <button onClick={() => handleDelete(banner.Id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default AdminPage;
