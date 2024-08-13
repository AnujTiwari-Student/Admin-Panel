/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useTable, usePagination, Column, TableInstance } from 'react-table';
import ReactPaginate from 'react-paginate';
import { SquareArrowOutUpRight, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Switch } from "@/components/ui/switch"
import { ToastAction } from './ui/toast';
import { useToast } from './ui/use-toast';


interface DataItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string; 
  createdBy: string;
  userId: number;
  companyId: number;
  modifiedBy: string;
  isActive: boolean;
}

interface SolitaireData {
  data: DataItem[];
  onDelete?: (id: number) => void;
  onEdit?: (banner: DataItem) => void;
  onToggleActive?: (id: number, isActive: boolean) => void;
}

const SolitaireTable: React.FC<SolitaireData> = ({data , onDelete , onEdit , onToggleActive }) => {
  
  const [error, setError] = useState<string>('');
  const { toast } = useToast()

  console.log("Data in SolitaireTable:", data);


  const columns: Column<DataItem>[] = React.useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      { Header: 'Description', accessor: 'description' },
      {
        Header: 'IsActive',
        //@ts-ignore
        accessor: 'IsActive',
        //@ts-ignore
        Cell: ({ row }) => (
          <Switch
            onClick={() => handleToggleActive(row.original.id, !row.original.IsActive)}
          >
            {row.original.IsActive ? 'Active' : 'Inactive'}
            
          </Switch>
        ),
      },
      {
        Header: 'Image',
        accessor: 'imageUrl',
        Cell: ({ cell: { value } }) => (
          <img src={value} alt="Banner" className="h-12 w-12 object-cover" />
        ),
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex space-x-4">
            <SquareArrowOutUpRight
              onClick={() => handleEditClick(row.original)}
              className="cursor-pointer text-blue-400 hover:text-blue-300 transition-transform transform hover:scale-110"
            />
            <Trash
              onClick={() => handleTrashClick(row.original.id)}
              className="cursor-pointer text-red-500 hover:text-red-400 transition-transform transform hover:scale-110"
            />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleToggleActive = (id: number, IsActive: boolean) => {
    console.log('Toggling active status:', id, IsActive);
    if (onToggleActive) {
      onToggleActive(id, IsActive);
        toast({
          title: "IsActive",
          description: "Banner active status updated successfully",
          action: (
            <ToastAction altText="Retry">Done</ToastAction>
          ),
        });
    }else{
      toast({
        title: "IsActive",
        description: "Banner active status updated successfully",
        action: (
          <ToastAction altText="Retry">Done</ToastAction>
          ),
          });
    }
  };

  console.log("Data in BannerTableContent:", data);

  return (
    <div className="bg-[#efeff8] rounded-xl overflow-x-auto">
      {error ? (
        <div className="text-red-500 font-bold">{error}</div>
      ) : (
        <>
          <table
            {...getTableProps()}
            className="min-w-full bg-white text-black rounded-xl"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column , index) => (
                    <th
                    {...column.getHeaderProps()}
                    className={`p-6 text-left bg-[#8589ff] text-sm font-semibold uppercase tracking-wide text-gray-200 ${
                      index === 0 ? 'rounded-tl-lg' : ''
                    } ${index === headerGroup.headers.length - 1 ? 'rounded-tr-lg' : ''}`}
                    key={column.id}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row : any) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id} className="bg-white transition-all border-b border-gray-200">
                    {row.cells.map((cell : any) => (
                      <td {...cell.getCellProps()} key={cell.column.id} className="p-4 text-sm">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex justify-between items-center p-4 bg-[#8589ff] text-white rounded-b-xl">
                    <ReactPaginate
                      previousLabel={'Previous'}
                      nextLabel={'Next'}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={pageOptions.length}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={({ selected }) => gotoPage(selected)}
                      containerClassName={'flex space-x-2'}
                      pageClassName={'text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-black transition-all'}
                      previousClassName={'text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-black transition-all'}
                      nextClassName={'text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-black transition-all'}
                      activeClassName={'font-bold'}
                    />
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                      className="ml-4 p-2 bg-gray-200 text-black rounded-lg"
                    >
                      {[10, 20, 30, 40, 50].map((size) => (
                        <option key={size} value={size}>
                          Show {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-black">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-500">
              Are you sure you want to delete this banner?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="bg-gray-700 text-white hover:bg-gray-600">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} className="bg-red-600 text-white hover:bg-red-500">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SolitaireTable;
