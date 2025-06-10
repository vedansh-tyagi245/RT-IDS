import React from 'react'

function Demo_data() {

    const tableData = [
        { Date: '01-03-2025', Open: '381.48', High: '411.88', Low: '379.45', Close: '410.44', Volume: '99,999,999' },
        { Date: '01-02-2025', Open: '390.1', High: '392.73', Low: '373.04', Close: '379.28', Volume: '99,999,999' },
        { Date: '12/31/2024', Open: '423.79', High: '427.93', Low: '402.54', Close: '403.84', Volume: '99,999,999' },
        { Date: '12/30/2024', Open: '419.4', High: '427', Low: '415.75', Close: '417.41', Volume: '99,999,999' },
        { Date: '12/27/2024', Open: '449.52', High: '450', Low: '426.5', Close: '431.66', Volume: '99,999,999' },
        { Date: '12/26/2024', Open: '465.16', High: '465.33', Low: '451.02', Close: '454.13', Volume: '99,999,999' },
        { Date: '12/24/2024', Open: '435.9', High: '462.78', Low: '435.14', Close: '462.28', Volume: '99,999,999' },
        { Date: '12/23/2024', Open: '431', High: '434.51', Low: '415.41', Close: '430.6', Volume: '99,999,999' },
        { Date: '12/20/2024', Open: '425.51', High: '447.08', Low: '417.64', Close: '421.06', Volume: '99,999,999' },
        { Date: '12/19/2024', Open: '451.88', High: '456.36', Low: '420.02', Close: '436.17', Volume: '99,999,999' },
        { Date: '12/18/2024', Open: '466.5', High: '488.54', Low: '427.01', Close: '440.13', Volume: '99,999,999' },
        { Date: '12/17/2024', Open: '475.9', High: '483.99', Low: '457.51', Close: '479.86', Volume: '99,999,999' },
        { Date: '12/16/2024', Open: '441.09', High: '463.19', Low: '', Close: '463.02', Volume: '99,999,999' },
        { Date: '12/13/2024', Open: '420', High: '436.3', Low: '415.71', Close: '436.23', Volume: '99,999,999' },
        { Date: '12-12-2024', Open: '424.84', High: '429.3', Low: '415', Close: '418.1', Volume: '99,999,999' },
        { Date: '12-11-2024', Open: '409.7', High: '424.88', Low: '402.38', Close: '424.77', Volume: '99,999,999' },
        { Date: '12-10-2024', Open: '392.68', High: '409.73', Low: '390.85', Close: '400.99', Volume: '99,999,999' },
        { Date: '12-09-2024', Open: '397.61', High: '404.8', Low: '378.01', Close: '389.79', Volume: '99,999,999' },
        { Date: '12-06-2024', Open: '377.42', High: '389.49', Low: '370.8', Close: '389.22', Volume: '99,999,999' },
        { Date: '12-05-2024', Open: '359.87', High: '375.43', Low: '359.5', Close: '369.49', Volume: '99,999,999' },
        { Date: '12-04-2024', Open: '353', High: '358.1', Low: '348.6', Close: '357.93', Volume: '99,999,999' },
        { Date: '', Open: '', High: '', Low: '', Close: '', Volume: '99,999,999' },
    ];

    return (
        <div>
            <div className="text-white text-center my-6">
                <h1 className="text-2xl font-bold">Demo CSV Data</h1>
                <p className="text-gray-400 text-sm">
                    The required format of the CSV file is shown below.
                </p>
            </div>

            <div className="container mx-auto p-4">
                <div className="overflow-x-auto max-w-[900px] overflow-y-auto max-h-[200px] mx-auto">
                    <table className="table-auto w-full border-collapse border border-gray-700 text-gray-200 bg-gray-800 rounded-lg">
                        <thead>
                            <tr className="bg-gray-900">
                                <th className="border border-gray-700 px-4 py-2">Line No.</th>
                                <th className="border border-gray-700 px-4 py-2">Date</th>
                                <th className="border border-gray-700 px-4 py-2">Open</th>
                                <th className="border border-gray-700 px-4 py-2">High</th>
                                <th className="border border-gray-700 px-4 py-2">Low</th>
                                <th className="border border-gray-700 px-4 py-2">Close</th>
                                <th className="border border-gray-700 px-4 py-2">Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                                        } hover:bg-gray-600`}
                                >
                                    <td className="border border-gray-700 px-4 py-2 text-center">{index + 1 || '-'}</td>
                                    <td className="border border-gray-700 px-4 py-2 text-center">{row.Date || '-'}</td>
                                    <td className="border border-gray-700 px-4 py-2 text-center">{row.Open || '-'}</td>
                                    <td className="border border-gray-700 px-4 py-2 text-center">{row.High || '-'}</td>
                                    <td className="border border-gray-700 px-4 py-2 text-center">{row.Low || '-'}</td>
                                    <td className="border border-gray-700 px-4 py-2 text-center">{row.Close || '-'}</td>
                                    <td className="border border-gray-700 px-4 py-2 text-center">{row.Volume || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Demo_data