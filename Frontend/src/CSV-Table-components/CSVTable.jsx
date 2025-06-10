import React from 'react';

function CSVTable({ csvData, setCsvData }) {
    return (
        <div className=" rounded-xl shadow-lg">
            {/* Display CSV Data in Table */}
            {csvData && (
                <div
                    className="overflow-y-auto overflow-x-auto max-w-[90vw] max-h-[40vh] p-2 border border-gray-700 rounded-xl text-center mx-auto bg-gray-800"
                    style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}
                >
                    <table className="table-auto w-full text-gray-200">
                        <thead>
                            <tr className="text-sm uppercase font-semibold border-b border-gray-700 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
                                <th
                                    className="border-r border-gray-600 py-3 px-4 text-center"
                                >
                                    Line No.
                                </th>
                                {Object.keys(csvData[0]).map((header, index) => (
                                    <th
                                        key={index}
                                        className="border-r border-gray-600 py-3 px-4 text-center"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {csvData.map((row, index) => (
                                <tr
                                    key={index}
                                    className={`border-b border-gray-700 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-600`}
                                >
                                    {/* Display line number */}
                                    <td className="py-3 px-4 text-center font-medium">
                                        {index + 1}
                                    </td>
                                    {Object.values(row).map((value, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className="py-3 px-4 text-center text-sm font-light"
                                        >
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CSVTable;
