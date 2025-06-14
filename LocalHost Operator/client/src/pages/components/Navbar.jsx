import React from 'react';

function Navbar() {
  return (
    <div className="h-20 flex items-center justify-center bg-gray-800 w-96 m-auto text-white rounded-b-lg">
      <ul className="flex gap-10">
        <li className="cursor-pointer hover:text-gray-300 font-bold text-lg"><a href="/">Overview</a></li>
        <li className="cursor-pointer hover:text-gray-300 font-bold text-lg"><a href="/table">Blocked IPs</a></li>
      </ul>
    </div>
  );
}

export default Navbar;
