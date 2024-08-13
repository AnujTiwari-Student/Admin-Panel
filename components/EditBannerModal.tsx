'use client'

import React, { ChangeEvent , useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import axios from 'axios';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type EditBannerModalProps = {
  banner: any;
  onClose: () => void;
  onSave: (banner: any) => void;
};

const EditBannerModal: React.FC<EditBannerModalProps> = ({ banner, onClose, onSave }) => {
  const [title, setTitle] = useState(banner.title);
  const [description, setDescription] = useState(banner.description);
  const [imageUrl, setImageUrl] = useState(banner.imageUrl);
  const [modifiedBy, setModifiedBy] = useState(banner.modifiedBy);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setTitle(banner.title);
    setDescription(banner.description);
    setImageUrl(banner.imageUrl);
    setModifiedBy(banner.modifiedBy);
    setFile(null); 
  }, [banner]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };


  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    console.log(file.name);
    
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); 

    

    const response = await axios.post('https://api.cloudinary.com/v1_1/depos9mqy/image/upload', formData);
    console.log("Image uploaded successfully:", response.data.secure_url);
    return response.data.secure_url; 
    
  };

  

  const handleSave = async () => {


    let updatedImageUrl = imageUrl;
    console.log(updatedImageUrl);
    

    if (file) {
      console.log("Uploading image...");
      try {
        updatedImageUrl = await uploadImage(file);
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    onSave({
      ...banner,
      title,
      description,
      imageUrl: updatedImageUrl,
      modifiedBy,
    });
  };

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Banner</SheetTitle>
        </SheetHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <Label htmlFor="imageUrl">Image</Label>
            <Input
              className='hidden'
              id="imageUrl"
              value={imageUrl}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)}
              disabled
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <Label htmlFor="modifiedBy">Modified By</Label>
            <Input
              id="modifiedBy"
              value={modifiedBy}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setModifiedBy(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditBannerModal;
