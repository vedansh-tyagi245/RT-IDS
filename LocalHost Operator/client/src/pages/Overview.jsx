import React from 'react'
import Navbar from './components/Navbar'
import Chart1 from './components/Chart1'
import Chart2 from './components/Chart2'

function Overview() {
  return (
    <div className='bg-black bg-opacity-90 text-white h-[2100px]'>
        <Navbar/>
        <Chart1/>
        <Chart2/>
    </div>
  )
}

export default Overview