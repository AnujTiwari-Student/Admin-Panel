'use client'

import Image from 'next/image';
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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [userId, setUserId] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchBanners = async () => {
      const response = await fetch('/api/banners');
      const data = await response.json();
      setBanners(data);
  };

  const handleAddOrUpdate = async () => {
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch('/api/banners', {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              id: editingId,
              title,
              description,
              image,
              createdBy,
              userId,
              companyId,
          }),
      });
      if (response.ok) {
          setTitle('');
          setDescription('');
          setImage('');
          setCreatedBy('');
          setUserId('');
          setCompanyId('');
          setEditingId(null);
          fetchBanners();
      }
  };

  const handleEdit = (banner: Banner) => {
      setTitle(banner.Title);
      setDescription(banner.Description);
      setImage(banner.Image);
      setCreatedBy(banner.CreatedBy);
      setUserId(banner.UserId);
      setCompanyId(banner.CompanyId);
      setEditingId(banner.Id);
  };

  const handleDelete = async (id: number) => {
      await fetch('/api/banners', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
      });
      fetchBanners();
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
                        <Image src={banner.Image} alt={banner.Title} />
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
