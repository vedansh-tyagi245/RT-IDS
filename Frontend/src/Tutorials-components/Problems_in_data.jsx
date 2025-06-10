import React from 'react';

function Problems_in_data() {
    return (
        <div className="bg-gray-800 text-gray-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-red-500 mb-2">Dataset Issues</h1>
            </div>
            <ul className="space-y-4">
                <li className="bg-gray-700 p-4 rounded-lg hover:bg-teal-600 transition-colors">
                    <span className="text-teal-400 mr-2">✔️</span> Some Dates are formatted MM-DD-YYYY while some are MM/DD/YYYY
                </li>
                <li className="bg-gray-700 p-4 rounded-lg hover:bg-teal-600 transition-colors">
                    <span className="text-teal-400 mr-2">✔️</span> Volume section is having characters ',' in between digits
                </li>
                <li className="bg-gray-700 p-4 rounded-lg hover:bg-teal-600 transition-colors">
                    <span className="text-teal-400 mr-2">✔️</span> Line No. 13 has no LOW value
                </li>
                <li className="bg-gray-700 p-4 rounded-lg hover:bg-teal-600 transition-colors">
                    <span className="text-teal-400 mr-2">✔️</span> Line No. 22 has all the columns null
                </li>
            </ul>
        </div>
    );
}

export default Problems_in_data;
