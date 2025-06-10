import React from 'react';
import Navbar from '../home-components/Navbar';
import Demo_data from './Demo_data';
import Problems_in_data from './Problems_in_data';
import Responses from './Responses';

function Tut_home_page({setLink}) {
  return (
    <div className="bg-grid-white overflow-y-auto max-h-[100vh]">
      <Navbar setLink={setLink} />
      <Demo_data />
      <Problems_in_data/>
      <Responses/>
    </div>
  );
}

export default Tut_home_page;
