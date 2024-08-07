import { Download } from 'lucide-react'
import React from 'react'
import BannerTableContent from './BannerTableContent'
  

function BannerTable() {
  return (
    <div className='mx-10 lg:w-full  overflow-x-hidden'>
        <div className='flex justify-between'>
            <div className='flex'>
                <button className='flex bg-gray-400 px-6 py-2 rounded-lg'><Download className='mr-2'/> Export</button>
            </div>
            <div className='space-x-4 lg:space-x-2 xl:space-x-4 flex'>
                <input placeholder='Search Banner' className='hidden xl:block py-2 px-12 rounded-lg shadow-xl' />
                <button className='py-2 px-6 bg-blue-600 rounded-lg'>Create Banner</button>
            </div>
        </div>
        <div className='my-10 border border-gray-300'>
            <BannerTableContent />
        </div>
    </div>
  )
}

export default BannerTable