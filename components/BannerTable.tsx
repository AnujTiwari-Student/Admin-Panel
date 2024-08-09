'use client';

import { Download } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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


const BannerTable: React.FC = () => {

  const [banners, setBanners] = useState<any[]>([]);
  const [isLoading , setIsLoading] = useState<boolean>(false)

   

  useEffect(() => {
    
    const fetchBanners = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/banner');
        if (response.ok) {
          const recievedData = await response.json();
          console.log("Fetched data:", typeof(recievedData));
          console.log("Fetched data:", recievedData);
          const mappedData = recievedData.data.map((item: any) => ({
            id: item.Id,
            title: item.Title,
            description: item.Description,
            imageUrl: item.Image,
            createdBy: item.CreatedBy,
            userId: item.UserId,
            companyId: item.CompanyId,
            modifiedBy: item.ModifiedBy,
          }));
  
          console.log(mappedData);         
           setBanners(mappedData);
        } else {
          console.error('Failed to fetch banners');
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      }finally {
        setIsLoading(false)
      }

    };

    fetchBanners();
  }, []);

  const handleExport = (): void => {
    console.log("Export button clicked");
    exportToCSV(banners, 'banners.csv');
  };


  const exportToCSV = (banners: Banner[], filename: string): void => {

    console.log("Exporting data:", banners);

    const csvHeader = ['Title', 'Description', 'Image URL', 'Created By', 'User ID', 'Company ID', 'Modified By'];
    const csvRows = [
      csvHeader.join(','),
      ...banners.map((row) =>
        [
          `"${row.title}"`,
          `"${row.description}"`,
          `"${row.imageUrl}"`, 
          `"${row.createdBy}"`,
          row.userId,
          row.companyId,
          `"${row.modifiedBy}"`
        ].join(',')
      )
    ];
    const csvContent = `data:text/csv;charset=utf-8,${csvRows.join('\n')}`;
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
            <BannerTableContent data={banners} /> 
      </div>
    </div>
  );
};

export default BannerTable;
