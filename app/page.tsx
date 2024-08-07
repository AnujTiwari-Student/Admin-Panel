'use client'

import Table from '@/components/Table';
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
//   const [banners, setBanners] = useState<Banner[]>([]);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState('');
//   const [createdBy, setCreatedBy] = useState('');
//   const [userId, setUserId] = useState('');
//   const [companyId, setCompanyId] = useState('');
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const fetchBanners = async () => {
//       const response = await fetch('/api/banners');
//       const data = await response.json();
//       setBanners(data);
//   };

//   const handleAddOrUpdate = async () => {
//       const method = editingId ? 'PUT' : 'POST';
//       const response = await fetch('/api/banners', {
//           method,
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//               id: editingId,
//               title,
//               description,
//               image,
//               createdBy,
//               userId,
//               companyId,
//           }),
//       });
//       if (response.ok) {
//           setTitle('');
//           setDescription('');
//           setImage('');
//           setCreatedBy('');
//           setUserId('');
//           setCompanyId('');
//           setEditingId(null);
//           fetchBanners();
//       }
//   };

//   const handleEdit = (banner: Banner) => {
//       setTitle(banner.Title);
//       setDescription(banner.Description);
//       setImage(banner.Image);
//       setCreatedBy(banner.CreatedBy);
//       setUserId(banner.UserId);
//       setCompanyId(banner.CompanyId);
//       setEditingId(banner.Id);
//   };

//   const handleDelete = async (id: number) => {
//       await fetch('/api/banners', {
//           method: 'DELETE',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ id }),
//       });
//       fetchBanners();
//   };

//   useEffect(() => {
//       fetchBanners();
//   }, []);


    return (
        <div className='overflow-x-auto'>

            <section className='lg:mx-64'>
                <div className='mx-10 my-4'>
                    <h1 className='text-4xl md:text-4xl font-bold text-center lg:text-start'>Create Banner</h1>
                </div>
            </section>

            <section className='lg:mx-64'>
                <Table />
            </section>

        </div>
    );
};

export default AdminPage;
