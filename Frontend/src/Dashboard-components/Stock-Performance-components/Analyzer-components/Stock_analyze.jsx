import React, { useState, useEffect } from 'react';
import _ from 'lodash'; // For calculations
import Graph from './Graph';

function Stock_analyze({ jsonData }) {
    const [summaryStats, setSummaryStats] = useState({});
    const [content, setContent] = useState('Statistics');

    useEffect(() => {
        if (jsonData && jsonData.length > 0) {
            performAnalysis(jsonData);
        }
    }, [jsonData]);

    const calculateStats = (values) => {
        const n = values.length;
        const sorted = [...values].sort((a, b) => a - b);
        const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
        const mean = _.mean(values);
        const min = _.min(values);
        const max = _.max(values);
        const stdDev = Math.sqrt(_.mean(values.map((v) => (v - mean) ** 2)));
        return { mean, median, min, max, stdDev };
    };

    const performAnalysis = (data) => {
        // Parse and prepare data
        const parsedData = data.map((d) => ({
            ...d,
            Date: new Date(d.Date.split('/').reverse().join('-')),
            Open: parseFloat(d.Open),
            High: parseFloat(d.High),
            Low: parseFloat(d.Low),
            Close: parseFloat(d.Close),
            Volume: parseInt(d.Volume, 10),
        }));

        // Sort by date (latest first)
        const sortedData = _.orderBy(parsedData, ['Date'], ['desc']);

        // Descriptive Statistics
        const stats = {
            Open: calculateStats(sortedData.map((d) => d.Open)),
            High: calculateStats(sortedData.map((d) => d.High)),
            Low: calculateStats(sortedData.map((d) => d.Low)),
            Close: calculateStats(sortedData.map((d) => d.Close)),
            Volume: calculateStats(sortedData.map((d) => d.Volume)),
        };
        setSummaryStats(stats);
    };

    return (
        <div className="p-6 bg-gray-900 bg-opacity-0">
            {/* Buttons */}
            <div className="flex justify-center space-x-4 mb-5">
                <button
                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105"
                    onClick={() => setContent('Statistics')}
                >
                    Statistics
                </button>
                <button
                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105"
                    onClick={() => setContent('Graph')}
                >
                    Graph
                </button>
            </div>

            {content == 'Statistics' && <div className="statistics">

                <h1 className="text-2xl font-bold mb-4">Stock Analysis</h1>

                {/* Summary Statistics */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-200 text-center">Summary Statistics</h2>
                    <table className="table-auto border-collapse w-full text-left bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                        <thead className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 text-gray-300">
                            <tr>
                                <th className="px-6 py-4 font-bold text-sm tracking-wider uppercase border-b border-gray-700">Metric</th>
                                <th className="px-6 py-4 font-bold text-sm tracking-wider uppercase border-b border-gray-700">Mean</th>
                                <th className="px-6 py-4 font-bold text-sm tracking-wider uppercase border-b border-gray-700">Median</th>
                                <th className="px-6 py-4 font-bold text-sm tracking-wider uppercase border-b border-gray-700">Min</th>
                                <th className="px-6 py-4 font-bold text-sm tracking-wider uppercase border-b border-gray-700">Max</th>
                                <th className="px-6 py-4 font-bold text-sm tracking-wider uppercase border-b border-gray-700">Std Dev</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(summaryStats).map(([key, stats], index) => (
                                <tr
                                    key={key}
                                    className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                                        } hover:bg-gray-600 transition-colors duration-200`}
                                >
                                    <td className="px-6 py-4 text-gray-300 border-b border-gray-700 font-mono">{key}</td>
                                    <td className="px-6 py-4 text-gray-300 border-b border-gray-700 font-mono">
                                        {stats.mean.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-gray-300 border-b border-gray-700 font-mono">
                                        {stats.median.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-gray-300 border-b border-gray-700 font-mono">
                                        {stats.min.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-gray-300 border-b border-gray-700 font-mono">
                                        {stats.max.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-gray-300 border-b border-gray-700 font-mono">
                                        {stats.stdDev.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>}

            {content == 'Graph' && <div className="graph">
                <Graph jsonData={jsonData} />
            </div>
            }


        </div>
    );
}

export default Stock_analyze;
