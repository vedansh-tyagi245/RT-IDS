import React, { useState } from 'react'

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="navbar bg-black text-white bg-opacity-25">
            <nav className="flex justify-between items-center p-4">
                <div className="text-2xl font-bold">{'<'}{'/>'}</div>

                {/* Hamburger Icon */}
                <div className="sm:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <div className="space-y-2">
                        <span className="block w-8 h-0.5 bg-white"></span>
                        <span className="block w-8 h-0.5 bg-white"></span>
                        <span className="block w-8 h-0.5 bg-white"></span>
                    </div>
                </div>

                {/* Navbar Links for Large Screens */}
                <ul className='hidden sm:flex space-x-8 font-mono font-extrabold md:p-2 md:text-xl'>
                    <li><a href="#1" className='text-white hover:bg-white hover:text-black hover:rounded-full transition-all duration-200 md:p-2 md:px-5' >Github Repo</a></li>
                    <li><a href="#2" className='text-white hover:bg-white hover:text-black hover:rounded-full transition-all duration-200 md:p-2 md:px-5' >Project Details</a></li>
                    <li><a href="/" className='text-white hover:bg-white hover:text-black hover:rounded-full transition-all duration-200 md:p-2 md:px-5' >Getting Started</a></li>
                </ul>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="sm:hidden flex flex-col items-center space-y-4 font-mono font-extrabold bg-black bg-opacity-0 text-white p-4">
                    <li><a href="#1" className='hover:bg-gray-800 hover:rounded-lg transition-all duration-150 p-2' >Project Owner</a></li>
                    <li><a href="#2" className='hover:bg-gray-800 hover:rounded-lg transition-all duration-150 p-2' >Project Details</a></li>
                    <li><a href="/" className='hover:bg-gray-800 hover:rounded-lg transition-all duration-150 p-2' >Getting Started</a></li>
                </ul>
            )}
        </div>
    )
}

export default Navbar