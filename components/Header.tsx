'use client'

import { CircleHelp, Filter, Home, Menu, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const menu = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Master', icon: Filter, href: '/filter' },
    { name: 'About', icon: CircleHelp, href: '/about' },
]

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = ()=>{
        setIsMenuOpen(!isMenuOpen);
    }

  return (
    <div>

        <div className='hidden lg:block fixed top-0 left-0 border-r w-64 h-screen bg-white'>
            <div className='p-4 flex justify-center border-b'>
                {/* <Image src={} alt='' /> */} {/* For the logo */}
                <h1 className='text-2xl'>Admin Panel</h1>
            </div>

            {menu.map((option)=>(
                <div key={option.name} className='flex flex-col'>
                    <div  className='flex space-x-4 mt-4 px-8 bg-blue-600 py-2 rounded-xl text-white mx-4 cursor-pointer'>
                        <option.icon />
                        <p>{option.name}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Moble View */}

        <div className='lg:hidden flex items-center pr-4 z-50 m-4 md:m-6'>
            <button onClick={toggleMenu}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {isMenuOpen && (

                <div className='lg:hidden block fixed top-0 left-0 border-r w-64 h-screen bg-white'>
                    <div className='p-4 flex justify-around items-center border-b'>
                        {/* <Image src={} alt='' /> */} {/* For the logo */}
                        <h1 className='text-2xl'>Admin Panel</h1>

                        <button onClick={toggleMenu}>
                            {isMenuOpen ? <X size={24} /> : null}
                        </button>

                    </div>
        
                    {menu.map((option)=>(
                        <div key={option.name} className='flex flex-col'>
                            <div  className='flex space-x-4 mt-4 px-8 bg-blue-600 py-2 rounded-xl text-white mx-4 cursor-pointer'>
                                <option.icon />
                                <p>{option.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
        )}

    </div>
  )
}

export default Header