'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { useToast } from "@/components/ui/use-toast"
  
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BannerTableContent from './BannerTableContent';
import { ToastAction } from './ui/toast';
import axios from 'axios';

type DialogBoxProps = {
  fetchBanners: () => void; 
};


const formFields = [
  { id: "title", label: "Title", type: "text", placeholder: "Rent" , required: true },
  { id: "description", label: "Description", type: "text", placeholder: "For rent a vehicle" , required: true },
  { id: "image", label: "Select Image", type: "file", accept: "image/*" , required: true },
  { id: "createdBy", label: "CreatedBy", type: "text", placeholder: "User" , required: true },
  { id: "userId", label: "UserId", type: "number", placeholder: "12" , required: true },
  { id: "companyId", label: "CompanyId", type: "number", placeholder: "1234" , },
  { id: "modifiedBy", label: "ModifiedBy", type: "text", placeholder: "Anuj" , },
];

const DialogBox: React.FC<DialogBoxProps> = ({ fetchBanners }) => {

  const [formData, setFormData] = useState<Record<string, string | File>>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast()

  

  const handleClick = ()=>{
    setIsOpen(false);
    fetchBanners()
    toast({
      title: " Banner Created ",
      description: new Date().toLocaleString(),
      action: (
        <ToastAction altText="Done creating banner">Done</ToastAction>
      ),
    })
  }
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    formFields.forEach(field => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });


    try {
      const response = await fetch('/api/banner', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Banner created successfully');
      } else {
        console.error('Failed to create banner');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button onClick={() => setIsOpen(true)} className="py-2 px-6 bg-blue-600 rounded-lg text-white">
            Create Banner
          </button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-[425px]">
          <SheetHeader>
            <SheetTitle>Create Banner</SheetTitle>
            <SheetDescription>
              All the fields are required. Click create when you are done.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {formFields.map((field) => (
                <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field.id} className="text-right">
                    {field.label}
                  </Label>
                  {field.type === 'file' ? (
                    <input
                      id={field.id}
                      type={field.type}
                      accept={field.accept}
                      className="col-span-3"
                      onChange={handleChange}
                    />
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="col-span-3"
                      onChange={handleChange}
                    />
                  )}
                  {errors[field.id] && <p className="text-red-500 col-span-4">{errors[field.id]}</p>}
                </div>
              ))}
            </div>
            <div className='w-full flex justify-end'>
                 <Button onClick={handleClick} type="submit">Create</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default DialogBox;
