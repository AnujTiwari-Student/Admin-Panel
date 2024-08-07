import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  
import image from '../assets/MainAfter.webp'
import Image from 'next/image'

const img = [
    { id: 1, name: 'Image 1', url: image }
]

function BannerTableContent() {
  return (
    <div>
        <Table>
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
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
                <TableRow>
                  <TableCell className="font-medium">Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>
                    <Image src={img[0].url} alt={img[0].name} className="w-12 h-12" />
                  </TableCell>
                  <TableCell className="text-right">Anuj</TableCell>
                  <TableCell className="text-right">1</TableCell>
                  <TableCell className="text-right">1</TableCell>
                  <TableCell className="text-right">---</TableCell>
                </TableRow>
              </TableBody>
        </Table>
    </div>
  )
}

export default BannerTableContent