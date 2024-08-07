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
                  <TableCell>Image</TableCell>
                  <TableCell className="text-right">Anuj</TableCell>
                  <TableCell className="text-right">1</TableCell>
                  <TableCell className="text-right">1</TableCell>
                  <TableCell className="text-right">Anuj</TableCell>
                </TableRow>
              </TableBody>
        </Table>
    </div>
  )
}

export default BannerTableContent