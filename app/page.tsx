'use client'

import BannerTable from '@/components/BannerTable';
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

    return (
        <div className='overflow-x-auto'>

            <section className='lg:mx-64'>
                <div className='mx-10 my-4'>
                    <h1 className='text-4xl md:text-4xl font-bold text-center lg:text-start'>Create Banner</h1>
                </div>
            </section>

            <section className='lg:ml-64'>
                <BannerTable/>
            </section>

        </div>
    );
};

export default AdminPage;
