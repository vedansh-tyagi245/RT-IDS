import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register necessary components for chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Graph({ jsonData }) {
    if (!jsonData || jsonData.length === 0) {
        return (
            <div className="text-center text-gray-300 bg-gray-900 p-6 rounded-lg shadow-md">
                No data available to display the graph.
            </div>
        );
    }

    // Prepare data for the chart
    const labels = jsonData.map((entry) => entry.Date); // Dates for x-axis
    const openPrices = jsonData.map((entry) => parseFloat(entry.Open));
    const highPrices = jsonData.map((entry) => parseFloat(entry.High));
    const lowPrices = jsonData.map((entry) => parseFloat(entry.Low));

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Open Prices',
                data: openPrices,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
            },
            {
                label: 'High Prices',
                data: highPrices,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.1,
            },
            {
                label: 'Low Prices',
                data: lowPrices,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.2)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#d1d5db', // Light gray for dark theme
                },
            },
            title: {
                display: true,
                text: 'Stock Price Analysis (Open, High, Low)',
                color: '#f3f4f6', // Light gray for dark theme
                font: {
                    size: 18,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    color: '#e5e7eb', // Light gray for x-axis label
                },
                ticks: {
                    color: '#9ca3af', // Light gray for x-axis ticks
                },
                grid: {
                    color: '#374151', // Subtle gridlines for x-axis
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price',
                    color: '#e5e7eb', // Light gray for y-axis label
                },
                ticks: {
                    color: '#9ca3af', // Light gray for y-axis ticks
                },
                grid: {
                    color: '#374151', // Subtle gridlines for y-axis
                },
            },
        },
    };

    return (
        <div className="p-6 bg-gray-900 rounded-lg shadow-md overflow-x-auto min-w-[1100px]">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-200">Stock Price Graph</h1>
            <div className="flex justify-between h-[58vh]">
                <div className="flex-grow">
                    <Line data={chartData} options={options} />
                </div>
                <div className="w-1/3 ml-6 bg-gray-800 p-4 rounded-lg shadow-md text-gray-300 font-mono text-sm">
                    <h2 className="text-lg font-semibold text-gray-200 mb-4">
                        Insights
                    </h2>
                    <p>
                        As you can see, the <span className="font-bold text-green-400">High</span> is usually 
                        <span className="font-bold text-green-400"> ≥ Open</span>. This means if you can successfully 
                        determine the peak point, you could achieve profits consistently.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Graph;
