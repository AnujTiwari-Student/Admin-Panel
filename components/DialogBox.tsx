'use client'

import React, { useState } from 'react';
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormField {
  id: string;
  label: string;
  type: string;
  defaultValue?: string;
  accept?: string;
}

const formFields: FormField[] = [
  { id: "title", label: "Title", type: "text", defaultValue: "Rent" },
  { id: "description", label: "Description", type: "text", defaultValue: "For rent a vehicle" },
  { id: "image", label: "Select Image", type: "file", accept: "image/*" },
  { id: "createdBy", label: "CreatedBy", type: "text", defaultValue: "User" },
  { id: "userId", label: "UserId", type: "number", defaultValue: "12" },
  { id: "companyId", label: "CompanyId", type: "number", defaultValue: "1234" },
  { id: "modifiedBy", label: "ModifiedBy", type: "text", defaultValue: "Anuj" },
];

function DialogBox() {

    const [formData , setFormData] = useState<Record<string , string | File>>({});

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
        const { id , value , files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: files ? files[0] : value,
        }))

    }

    const handleSubmit = async ( e: React.FormEvent ) => {

        e.preventDefault();

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key , value]) => {
            formDataToSend.append(key , value);
        })

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

    }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="py-2 px-6 bg-blue-600 rounded-lg text-white">
            Create Banner
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Banner</DialogTitle>
            <DialogDescription>
              All the fields are required. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
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
                  />
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    defaultValue={field.defaultValue}
                    className="col-span-3"
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogBox;
