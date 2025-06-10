import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Adjust the import path based on your file structure
import Dataset from './Dataset-components/Dataset';
import StockPerformance from './Stock-Performance-components/StockPerformance';
import DemoTrading from './DemoTrading-components/DemoTrading';

function Dashboard({ jsonData, setJsonData }) {

  const [section, setSection] = useState('Dataset');

  return (
    <div className="flex h-[89vh]">
      {/* Sidebar */}
      <Sidebar section={section} setSection={setSection} />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 bg-opacity-10 text-white">
        {/* Add your dashboard content here */}
        {section === "Dataset" && <Dataset jsonData={jsonData} />}
        {section === "StockPerformance" && <StockPerformance jsonData={jsonData} setJsonData={setJsonData} />}
        {section === "DemoTrading" && <DemoTrading jsonData={jsonData} />}

        {section === "Null" && (
          <div className="flex justify-center items-center h-[80vh] text-gray-300">
            <div className=" w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-lg rounded-3xl flex flex-col justify-center items-center p-6">
              <h1 className="text-2xl sm:text-3xl font-bold font-mono text-gray-100 mb-4">
                🚧 Under Construction 🚧
              </h1>
              <p className="text-lg sm:text-xl text-center text-gray-300 font-light">
                This feature is under construction. It will be available exclusively to our premium members.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;
