/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useTable, usePagination, Column, TableInstance } from 'react-table';
import ReactPaginate from 'react-paginate';
import { Pencil, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

interface DataItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string; 
  createdBy: string;
  userId: number;
  companyId: number;
  modifiedBy: string;
}

interface SolitaireData {
  data: DataItem[];
  onDelete?: (id: number) => void;
  onEdit?: (banner: DataItem) => void;
}

const SolitaireTable: React.FC<SolitaireData> = ({data , onDelete , onEdit}) => {
  
  const [error, setError] = useState<string>('');



  const columns: Column<DataItem>[] = React.useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      { Header: 'Description', accessor: 'description' },
      {
        Header: 'Image',
        accessor: 'imageUrl',
        Cell: ({ cell: { value } }) => (
          <img src={value} alt="Banner" className="h-12 w-12 object-cover" />
        ),
      },
      { Header: 'CreatedBy', accessor: 'createdBy' },
      { Header: 'UserId', accessor: 'userId' },
      { Header: 'CompanyId', accessor: 'companyId' },
      { Header: 'ModifiedBy', accessor: 'modifiedBy' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // @ts-ignore
    page,
    // @ts-ignore
    canPreviousPage,
    // @ts-ignore
    canNextPage,
    // @ts-ignore
    pageOptions,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { pageIndex, pageSize },
  }: TableInstance<DataItem> = useTable(
    {
      columns,
      data,
      // @ts-ignore
      initialState: { pageIndex: 0 }, // Set initial page index
    },
    usePagination
  );

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
    <div className="bg-purple-600 p-4 rounded-lg overflow-x-auto">
      {error ? (
        <div className="text-red-500 font-bold">{error}</div>
      ) : (
        <>
          <table
            {...getTableProps()}
            className="min-w-full bg-purple-700 text-white rounded-lg"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="p-3 text-left bg-purple-800"
                      key={column.id}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row: any) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id} className="even:bg-purple-600">
                    {row.cells.map((cell: any) => (
                      <td {...cell.getCellProps()} key={cell.column.id} className="p-3">
                        {cell.render('Cell')}
                      </td>
                    ))}
                    <td className="p-3 text-right">
                      <Trash onClick={() => handleTrashClick(row.original.id)} className='cursor-pointer' />
                    </td>
                    <td className="p-3 text-right">
                      <Pencil onClick={() => handleEditClick(row.original)} className='cursor-pointer' />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageOptions.length}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={({ selected }) => gotoPage(selected)}
              containerClassName={'flex space-x-2'}
              pageClassName={'text-white px-3 py-1 bg-purple-700 rounded-lg cursor-pointer'}
              previousClassName={'text-white px-3 py-1 bg-purple-700 rounded-lg cursor-pointer'}
              nextClassName={'text-white px-3 py-1 bg-purple-700 rounded-lg cursor-pointer'}
              activeClassName={'bg-purple-800 font-bold'}
            />
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="ml-4 p-2 bg-purple-700 text-white rounded-lg"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

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

export default SolitaireTable;
