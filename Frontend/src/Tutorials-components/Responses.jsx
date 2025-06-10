import React from 'react';

function Responses() {
    return (
        <div className="bg-gray-900 p-8 my-8 overflow-x-auto min-w-[1100px] m-10 border rounded-3xl shadow-2xl">
            <div className="space-y-4 text-red-600 font-bold text-3xl">
                Backend logs
                <br />
                <div className="text-lg font-semibold text-teal-400">
                    <span className="text-teal-200">5:30:10 PM</span> : <span className="font-bold">Response from Backend</span> ==>
                    <span className="text-yellow-300">Number of columns:</span> 6,
                    <span className="text-yellow-300">Column names:</span>
                    <span className="text-teal-300">{`{Date, Open, High, Low, Close, Volume}`}</span>
                </div>

                <div className="text-lg font-semibold text-teal-400">
                    <span className="text-teal-200">5:30:11 PM</span> : <span className="font-bold">Response from Backend</span> ==>
                    <span className="text-yellow-300">Number of Rows:</span> 22,
                </div>

                <div className="text-lg font-semibold text-teal-400">
                    <span className="text-teal-200">5:30:11 PM</span> : <span className="font-bold">Response from Backend</span> ==>
                    <span className="text-red-500">Null Values found:</span> <span className="text-yellow-300">Null value(s) found in the data.</span>
                </div>

                <div className="text-lg font-semibold text-teal-400">
                    <span className="text-teal-200">5:30:12 PM</span> : <span className="font-bold">Response from Backend</span> ==>
                    <span className="text-green-400">Cleaned Data</span> by removing rows having <span className="text-red-500">NULL values</span>
                </div>

                <div className="text-lg font-semibold text-teal-400">
                    <span className="text-teal-200">5:30:12 PM</span> : <span className="font-bold">Response from Backend</span> ==>
                    <span className="text-yellow-300">Number of Rows:</span> 20,
                </div>

                <div className="text-lg font-semibold text-teal-400">
                    <span className="text-teal-200">5:30:13 PM</span> : <span className="font-bold">Response from Backend</span> ==>
                    <span className="text-blue-400">Removing any characters from</span>
                    <span className="text-teal-300">High, Low, Close, Volume</span> <span className="text-blue-400">if present:</span>
                </div>

                <div className="text-lg font-semibold text-teal-400">
                    <span className="text-teal-200">5:30:13 PM</span> : <span className="font-bold">Response from Backend</span> ==>
                    <span className="text-blue-400">Changing '/' to '-' in</span>
                    <span className="text-teal-300">Date column:</span>
                </div>

                <div className="text-lg font-semibold text-teal-400">
                    <span className="text-teal-200">5:30:14 PM</span> : <span className="font-bold">Response from Backend</span> ==>
                    <span className="text-blue-400">Changing Format of the date</span> to <span className="text-yellow-300">DD-MM-YY</span>
                </div>
            </div>
        </div>
    );
}

export default Responses;
