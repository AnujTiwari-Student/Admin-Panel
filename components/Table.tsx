import { Download } from 'lucide-react'
import React from 'react'

function Table() {
  return (
    <div className='mx-10'>
        <div className='flex justify-between'>
            <div className='flex'>
                <button className='flex bg-gray-400 px-6 py-2 rounded-lg'><Download className='mr-2'/> Export</button>
            </div>
            <div className='space-x-4'>
                <input placeholder='Search Banner' className='py-2 px-12 rounded-lg shadow-xl' />
                <button className='py-2 px-6 bg-blue-600 rounded-lg'>Create Banner</button>
            </div>
        </div>
        <div className='border my-10 border-gray-600 flex justify-between'>
            <div className='border border-black'>ID</div>
            <div className='border border-black'>Title</div>
            <div className='border border-black'>Description</div>
            <div className='border border-black'>Image</div>
            <div className='border border-black'>CreatedBy</div>
            <div className='border border-black'>CompanyId</div>
            <div className='border border-black'>UserId</div>
            <div className='border border-black'>IsActive</div>
            <div className='border border-black'>ModifiedBy</div>
        </div>
    </div>
  )
}

export default Table