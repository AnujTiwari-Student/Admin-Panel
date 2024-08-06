'use client'

import { CircleHelp, Filter, Home, Menu, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import SignIn from './SignIn'

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
    <div className='flex justify-between lg:justify-end items-center mx-6 my-4 lg:mx-10 lg:my-4'>

        <div className='hidden lg:block fixed top-0 left-0 border-r w-64 h-screen bg-white'>
            <div className='p-4 flex justify-center border-b'>
                {/* <Image src={} alt='' /> */} {/* For the logo */}
                <h1 className='text-2xl font-semibold'>Admin Panel</h1>
            </div>

            {menu.map((option)=>(
                <nav key={option.name} className='flex flex-col'>
                    <div  className='flex space-x-4 mt-4 px-8 bg-blue-600 py-2 rounded-xl text-white mx-4 cursor-pointer'>
                        <option.icon />
                        <p>{option.name}</p>
                    </div>
                </nav>
            ))}
        </div>


        {/* Mobile View */}

        <div className='lg:hidden flex items-center'>
            <button onClick={toggleMenu}>
                {isMenuOpen ? null : <Menu size={24} />}
            </button>
        </div>

        {isMenuOpen && (

                <div className='lg:hidden block fixed top-0 left-0 border-r w-64 h-screen bg-white'>
                    <div className='p-4 flex justify-around items-center border-b'>
                        {/* <Image src={} alt='' /> */} {/* For the logo */}
                        <h1 className='text-2xl font-semibold'>Admin Panel</h1>

                        <button onClick={toggleMenu}>
                            {isMenuOpen ? <X size={24} /> : null}
                        </button>

                    </div>
        
                    {menu.map((option)=>(
                        <nav key={option.name} className='flex flex-col'>
                            <div  className='flex space-x-4 mt-4 px-8 bg-blue-600 py-2 rounded-xl text-white mx-4 cursor-pointer'>
                                <option.icon />
                                <p>{option.name}</p>
                            </div>
                        </nav>
                    ))}
                </div>
        )}

        <SignIn />

    </div>
  )
}

export default Header