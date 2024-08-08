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

  
import Image from 'next/image'

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
  };

  const BannerTableContent: React.FC<BannerTableContentProps> = ({ data }) => {
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
                {/* <TableRow>
                  <TableCell className="font-medium">Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>
                    <Image src={img[0].url} alt={img[0].name} className="w-12 h-12" />
                  </TableCell>
                  <TableCell className="text-right">Anuj</TableCell>
                  <TableCell className="text-right">1</TableCell>
                  <TableCell className="text-right">1</TableCell>
                  <TableCell className="text-right">---</TableCell>
                </TableRow> */}
                {data.map((item) => (
                    <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                        <Image src={item.imageUrl} alt={item.title} className='w-12 h-12' />
                    </TableCell>
                    <TableCell className="text-right">{item.createdBy}</TableCell>
                    <TableCell className="text-right">{item.userId}</TableCell>
                    <TableCell className="text-right">{item.companyId}</TableCell>
                    <TableCell className="text-right">{item.modifiedBy}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
        </Table>
    </div>
  )
}

export default BannerTableContent