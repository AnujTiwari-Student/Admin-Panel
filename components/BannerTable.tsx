'use client';

import { Download } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DialogBox from './DialogBox';
import axios from 'axios'
import EditBannerModal from './EditBannerModal';
import SolitaireTable from './TableComponent';

interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: any;
  createdBy: string;
  userId: number;
  companyId: number;
  modifiedBy: string;
  bannerId: string;
}


const BannerTable: React.FC = () => {

  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading , setIsLoading] = useState<boolean>(false)
  const [bannerToDelete, setBannerToDelete] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [bannerToEdit, setBannerToEdit] = useState<Banner | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);



  const handleEditBanner = async (banner: Banner) => {
    setIsEditing(true);
    try {
      const response = await axios.put('/api/banner', {
        BannerId: banner.id,
        Title: banner.title,
        Description: banner.description,
        Image: banner.imageUrl,
        ModifiedBy: banner.modifiedBy,
        ModifiedOn: new Date().toISOString()
      });

      if (response.data.statusid === 1) {
        fetchBanners();
        setBannerToEdit(null);
      } else {
        console.error(response.data.statusmessage);
      }
    } catch (error) {
      console.error('Error updating banner:', error);
    } finally {
      setIsEditing(false);
    }
  };
   

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/banner');
      if (response.ok) {
        const receivedData = await response.json();
        console.log("Fetched data:", receivedData);
        console.log("Fetched data (type):", typeof(receivedData));
  
        const mappedData = receivedData.data.map((item: any) => ({
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);


  const handleConfirmationDelete = async (bannerId: number): Promise<void> => {
    setIsDeleting(true);
    try {
      console.log(`Attempting to delete banner with ID: ${bannerId}`);
      const response = await axios.delete(`/api/banner?bannerId=${bannerId}`);
      console.log('Delete response:', response.data);
      if (response.data.statusid === 1) {
        await fetchBanners(); 
        setBannerToDelete(null);
      } else {
        console.error('Failed to delete banner:', response.data);
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
    } finally {
      setIsDeleting(false);
    }
  };
  

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
            type="text"
            placeholder="Search Banner"
            className="hidden xl:block py-2 px-6 rounded-lg shadow-xl"
          />
          <DialogBox fetchBanners={fetchBanners} />
        </div>
      </div>
      <div className="my-10 border border-gray-300">
            <SolitaireTable data={banners} onEdit={setBannerToEdit} onDelete={handleConfirmationDelete} />
      </div>
      {bannerToEdit && (
        <EditBannerModal
          banner={bannerToEdit}
          onClose={() => setBannerToEdit(null)}
          onSave={handleEditBanner}
        />
      )}
    </div>
  );
};

export default BannerTable;
