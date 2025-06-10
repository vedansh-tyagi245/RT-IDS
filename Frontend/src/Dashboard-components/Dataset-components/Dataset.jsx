import React from 'react'

function Dataset({ jsonData }) {
    return (
        <div className="p-4 bg-gray-900 overflow-y-auto max-h-[89vh] bg-opacity-5">
            <h1 className="text-3xl font-bold text-white text-center mb-6">Stock Data</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left text-sm">
                    <thead>
                        <tr className="bg-gray-800 text-white uppercase text-sm leading-normal bg-opacity-50">
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Open</th>
                            <th className="px-4 py-2">High</th>
                            <th className="px-4 py-2">Low</th>
                            <th className="px-4 py-2">Close</th>
                            <th className="px-4 py-2">Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData.map((item, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                                    } text-gray-200 hover:bg-gray-600 bg-opacity-50`}
                            >
                                <td className="px-4 py-2">{item.Date}</td>
                                <td className="px-4 py-2">{item.Open}</td>
                                <td className="px-4 py-2">{item.High} &nbsp;<span className={((100 * (item.High - item.Open)) / item.Open) >= 0 ? "text-green-600" : "text-red-600"}>({((100 * (item.High - item.Open)) / item.Open).toFixed(2)}%)</span></td>
                                <td className="px-4 py-2">{item.Low} &nbsp;<span className={((100 * (item.Low - item.Open)) / item.Open) >= 0 ? "text-green-600" : "text-red-600"}>({((100 * (item.Low - item.Open)) / item.Open).toFixed(2)}%)</span></td>
                                <td className="px-4 py-2">{item.Close} &nbsp;<span className={((100 * (item.Close - item.Open)) / item.Open) >= 0 ? "text-green-600" : "text-red-600"}>({((100 * (item.Close - item.Open)) / item.Open).toFixed(2)}%)</span></td>
                                <td className="px-4 py-2">{item.Volume.toLocaleString()}</td>

                                {/* It will showcase the volume without commas */}
                                {/* <td className="px-4 py-2">{item.Volume}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dataset