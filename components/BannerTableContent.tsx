'use client'

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Image from 'next/image';
import { Pencil, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import axios from 'axios';
import { Input } from './ui/input';

type BannerTableContentProps = {
  data: {
    id: number;
    title: string;
    description: string;
    imageUrl: string; 
    createdBy: string;
    userId: number;
    companyId: number;
    modifiedBy: string;
  }[];
  onDelete?: (id: number) => void;
  onEdit?: (banner: any) => void;
};

const BannerTableContent: React.FC<BannerTableContentProps> = ({ data , onDelete , onEdit }) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState<number | null>(null);
  

  const handleEditClick = (banner: any) => {
    if (onEdit) {
      onEdit(banner);
    }
  };

  const handleTrashClick = (id: number) => {
    setSelectedBannerId(id);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBannerId !== null && onDelete) {
      onDelete(selectedBannerId);
    }
    setIsDialogOpen(false);
  };

  console.log("Data in BannerTableContent:", data);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-right">CreatedBy</TableHead>
            <TableHead className="text-right">UserId</TableHead>
            <TableHead className="text-right">CompanyId</TableHead>
            <TableHead className="text-right">ModifiedBy</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </TableCell>
              <TableCell className="text-right">{item.createdBy}</TableCell>
              <TableCell className="text-right">{item.userId}</TableCell>
              <TableCell className="text-right">{item.companyId}</TableCell>
              <TableCell className="text-right">{item.modifiedBy}</TableCell>
              {data? <TableCell className="text-right"><Trash onClick={() => handleTrashClick(item.id)} className='cursor-pointer'/></TableCell> : null}
              {data? <TableCell className="text-right"><Pencil onClick={()=> handleEditClick(item)}  className='cursor-pointer'/></TableCell> : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>Are you sure you want to delete this banner?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default BannerTableContent;
