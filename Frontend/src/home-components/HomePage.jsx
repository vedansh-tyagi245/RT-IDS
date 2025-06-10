import React, { useState } from 'react'
import Navbar from './Navbar'
import UploadFile from '../File-Upload-components/UploadFile'
import Analyze from '../Analises-container/Analyze';

function HomePage({ link, setLink }) {

    const [showAnalyze, setShowAnalyze] = useState(false);
    const [csvData, setCsvData] = useState(null);
    const [jsonData, setJsonData] = useState(null);

    return (
        <div><div className='bg-grid-white h-[100vh]'>

            {/* Navbar Components */}
            <Navbar setLink={setLink}/>

            {/* Hero Section */}
            {!showAnalyze &&
                <div className='flex flex-col justify-center items-center h-[70vh] px-4 mt-20 lg:h-[60vh]'>
                    <div className="font-mono text-white font-bold w-full max-w-4xl text-center">
                        <div className='text-4xl sm:text-5xl lg:text-6xl leading-tight'>
                            Stock market analyzer
                        </div>
                        <div className='text-lg sm:text-xl lg:text-2xl mt-4'>
                            Transform the Way You Analyze Data—100% Faster, 100% Smarter.
                        </div>
                        <div className="btn flex flex-wrap justify-center gap-4 mt-6">
                            <button
                                type="button"
                                className='text-violet-800 px-5 py-1 bg-[hsl(0,0%,100%)] font-sans rounded-full text-lg sm:text-xl lg:text-2xl hover:bg-violet-300 transition-all bg-opacity-90'
                                onClick={() => setLink('/Tutorials')}>
                                View Tutorial
                            </button>
                            <UploadFile showAnalyze={showAnalyze} setShowAnalyze={setShowAnalyze} csvData={csvData} setCsvData={setCsvData} jsonData={jsonData} setJsonData={setJsonData} />
                        </div>
                        Choose only csv file
                    </div>
                    <div className="text-white mt-5">
                        <h2 className="text-xl font-semibold mb-0 text-center font-mono">This is the csv format required</h2>

                        {/* Table - Responsive */}
                        <div className="overflow-x-auto shadow-lg rounded-lg">
                            <table className="min-w-full table-auto border-collapse rounded-lg">
                                <thead>
                                    <tr className="bg-gray-700 text-white bg-opacity-60 hover:bg-gray-500">
                                        <th className="px-1 py-1 text-center text-sm sm:text-base">Date</th>
                                        <th className="px-1 py-1 text-center text-sm sm:text-base">Open</th>
                                        <th className="px-1 py-1 text-center text-sm sm:text-base">Close</th>
                                        <th className="px-1 py-1 text-center text-sm sm:text-base">Low</th>
                                        <th className="px-1 py-1 text-center text-sm sm:text-base">High</th>
                                        <th className="px-1 py-1 text-center text-sm sm:text-base">Volume</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-600 hover:bg-gray-500 bg-opacity-50">
                                        <td className="px-1 py-1 text-center text-sm sm:text-base">01/01/2025</td>
                                        <td className="px-1 py-1 text-center text-sm sm:text-base">450</td>
                                        <td className="px-1 py-1 text-center text-sm sm:text-base">460</td>
                                        <td className="px-1 py-1 text-center text-sm sm:text-base">440</td>
                                        <td className="px-1 py-1 text-center text-sm sm:text-base">470</td>
                                        <td className="px-1 py-1 text-center text-sm sm:text-base">99999999</td>
                                    </tr>
                                    <tr className="bg-gray-600 hover:bg-gray-500 bg-opacity-50">
                                        <td className="px-1 py-1 text-center text-sm sm:text-base">02-01-2025</td>
                                        <td className="px-1 py-1 text-center text-sm sm:text-base">460</td>
                                        <td className="px-1 py-1 text-center text-sm sm:text-base">450</td>
                                        <td className="px-1 py-1 text-center text-sm sm:text-base">440</td>
                                        <td className="px-1 py-1 text-center text-sm sm:text-base">470</td>
                                        <td className="px-1 py-1 text-center text-sm sm:text-base">499999940</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Restrictions Section */}
                        <div className="restrictions p-1 bg-gray-800 rounded-lg shadow-lg text-white mt-3 hidden md:block bg-opacity-50">
                            <isindex className="block mb-2 text-blue-500">Please adhere to the following restrictions:</isindex>
                            <ul className="list-disc pl-6 space-y-0">
                                <li className="text-md text-gray-300">Column Names should be exactly the above ones with correct upper and lowercase characters</li>
                                <li className="text-md text-gray-300">Date can be any DD/MM/YYYY, DD-MM-YYYY, MM/DD/YYYY, or MM-DD/YYYY</li>
                            </ul>
                        </div>
                    </div>
                </div>
            }

            {/* Display CSV Data in Table */}
            {showAnalyze && <Analyze csvData={csvData} setCsvData={setCsvData} jsonData={jsonData} setJsonData={setJsonData} />}
        </div>
        </div>
    )
}

export default HomePage;
