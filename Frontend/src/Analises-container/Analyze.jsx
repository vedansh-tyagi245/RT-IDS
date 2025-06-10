import React, { useState } from 'react'
import CSVTable from '../CSV-Table-components/CSVTable'
import BuildLogs from './BuildLogs'
import Dashboard from '../Dashboard-components/Dashboard';

function Analyze({ csvData, setCsvData, jsonData, setJsonData }) {

  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className='overflow-y-auto max-h-[100vh]'>

      {/* Table container */}
      {/* <div className='h-[55vh] w-[60vw] flex justify-center items-center mx-auto bg-gray-900 bg-opacity-70'> */}
      {!showDashboard &&
        <div>
          <CSVTable csvData={csvData} setCsvData={setCsvData} />
        </div>
      }

      {/* Logs section */}
      {!showDashboard &&
        <div div className="mt-10 h-[35vh] w-[90vw] border bg-gray-800 mx-auto rounded-2xl">
          <BuildLogs csvData={csvData} setCsvData={setCsvData} jsonData={jsonData} setJsonData={setJsonData} setShowDashboard={setShowDashboard} />
        </div>
      }

      {/* Show Dashboard */}
      {
        showDashboard && (
          <div>
            <Dashboard jsonData={jsonData} setJsonData={setJsonData}/>
          </div>
        )
      }

    </div >
  )
}

export default Analyze