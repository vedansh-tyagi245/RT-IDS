import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Use this if you have routing set up

function Sidebar({ section, setSection }) {
  const [isOpen, setIsOpen] = useState(false); // State to track sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-[89vh] flex">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-0 left-0 h-full bg-gray-800 text-white flex flex-col transform lg:translate-x-0 sm:mt-[63px] md:mt-[75px] lg:mt-[0px] ${isOpen ? 'translate-x-0' : '-translate-x-full bg-opacity-20'
          } transition-transform duration-300 ease-in-out z-40 w-[290px]`}
        style={{ top: '0px' }} // Adjust to match your navbar height
      >
        {/* Logo Section */}
        <div className="p-4 text-center text-lg font-bold bg-gray-900">
          Dashboard
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <div className={`hover:text-blue-400 cursor-pointer rounded-lg ${section === 'Dataset' ? 'font-bold bg-gray-600' : ''}`} onClick={() => { setSection('Dataset'); }}>📊 Dataset</div>

            </li>
            <li>
              <div className={`hover:text-blue-400 cursor-pointer rounded-lg ${section === 'StockPerformance' ? 'font-bold bg-gray-600' : ''}`} onClick={() => { setSection('StockPerformance') }}>
                📈 Stock Performance
              </div>
            </li>
            <li>
              <div className={`hover:text-blue-400 cursor-pointer rounded-lg ${section === 'DemoTrading' ? 'font-bold bg-gray-600' : ''}`} onClick={() => { setSection('DemoTrading') }}>
                💼 Demo Trading
              </div>
            </li>
            <li>
              <div className={`hover:text-blue-400 cursor-pointer rounded-lg ${section === 'Null' ? 'font-bold bg-gray-600' : ''}`} onClick={() => { setSection('Null') }}>
                🔒premium feature{"("}Upcoming{")"}
              </div>
            </li>
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="p-4 text-sm text-center border-t border-gray-700">
          © 2025 Stock Dashboard
        </div>
      </div>

      {/* Hamburger Icon (Visible on small screens) */}
      <div className="absolute top-1 md:top-20 left-1 text-white z-50 lg:hidden">
        <button
          onClick={toggleSidebar}
          className="text-3xl focus:outline-none bg-gray-700 p-2 pl-3 ml-1 mt-1 rounded"
        >
          {isOpen ? '✖' : '☰'}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
