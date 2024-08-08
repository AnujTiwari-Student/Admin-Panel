'use client';

import { Download } from 'lucide-react';
import React, { useState } from 'react';
import BannerTableContent from './BannerTableContent';
import DialogBox from './DialogBox';

interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: any;
  createdBy: string;
  userId: number;
  companyId: number;
  modifiedBy: string;
}

const data: Banner[] = [
  {
    id: 1,
    title: 'Title',
    description: 'Description',
    imageUrl: 'https://res.cloudinary.com/depos9mqy/image/upload/v1723097244/MainAfter_azxi79.webp' ,
    createdBy: 'Anuj',
    userId: 1,
    companyId: 1,
    modifiedBy: '---',
  },
  {
    id: 1,
    title: 'Title',
    description: 'Description',
    imageUrl: 'https://res.cloudinary.com/depos9mqy/image/upload/v1723097244/MainAfter_azxi79.webp' ,
    createdBy: 'Anuj',
    userId: 1,
    companyId: 1,
    modifiedBy: '---',
  },
  // Add more rows as needed
];

const BannerTable: React.FC = () => {

  const handleExport = (): void => {
    console.log("Export button clicked");
    exportToCSV(data, 'banners.csv');
  };


  const exportToCSV = (data: Banner[], filename: string): void => {
    const csvData = data.map((row) =>
      [row.title, row.description, row.imageUrl, row.createdBy, row.userId, row.companyId, row.modifiedBy].join(',')
    );
    const csvContent = `data:text/csv;charset=utf-8,${csvData.join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-10 lg:w-full overflow-x-hidden">
      <div className="flex justify-between">
        <div className="flex">
          <button className="flex bg-gray-300 px-6 py-2 rounded-lg" onClick={handleExport}>
            <Download className="mr-2" /> Export
          </button>
        </div>
        <div className="space-x-4 lg:space-x-2 xl:space-x-4 flex">
          <input
            placeholder="Search Banner"
            className="hidden xl:block py-2 px-12 rounded-lg shadow-xl"
          />
          <DialogBox />
        </div>
      </div>
      <div className="my-10 border border-gray-300">
        <BannerTableContent data={data} />
      </div>
    </div>
  );
};

export default BannerTable;
