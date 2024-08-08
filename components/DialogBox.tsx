import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
  

function DialogBox() {
  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                {/* <Button variant="outline">Create Banner</Button> */}
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                        Title
                        </Label>
                        <Input
                        id="name"
                        defaultValue="Rent"
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                        Description
                        </Label>
                        <Input
                        id="username"
                        defaultValue="For rent a vehicle"
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                        Select Image
                        </Label>
                        <input
                        type='file'
                        id="image"
                        className="col-span-3"
                        accept='image/*'
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                        CreatedBy
                        </Label>
                        <Input
                        id="createdBy"
                        defaultValue="User"
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                        UserId
                        </Label>
                        <Input
                        id="UserId"
                        type='number'
                        defaultValue="#12"
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                        CompanyId
                        </Label>
                        <Input
                        id="CompanyId"
                        type='number'
                        defaultValue="1234"
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                        ModifiedBy
                        </Label>
                        <Input
                        id="ModifiedBy"
                        defaultValue="Anuj"
                        className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default DialogBox