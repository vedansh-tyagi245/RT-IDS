// src/components/Charts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

function Chart1() {
    const [hourlyData, setHourlyData] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/requestlogs');
                processData(data);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        const processData = (logs) => {
            const now = new Date();
            const buckets = Array(24).fill(0);

            logs.forEach(log => {
                const logTime = new Date(log.timestamp);
                const diffHours = Math.floor((now - logTime) / (1000 * 60 * 60));
                const hourIndex = 23 - diffHours;

                if (hourIndex >= 0 && hourIndex < 24) {
                    buckets[hourIndex]++;
                }
            });

            const chartData = buckets.map((count, i) => ({
                hour: `${24 - i} hr${24 - i === 1 ? '' : 's'} before`,
                requests: count,
            }));

            setHourlyData(chartData);
        };

        fetchLogs();
    }, []);

    return (
        <div className='h-screen'>

            {/* Chart 1 */}
            <div className="p-10 w-full h-[500px]">
                <h2 className="text-xl font-semibold mb-4 text-center">Requests in Last 24 Hours</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="hour" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar
                            dataKey="requests"
                            fill="#3b82f6"
                            isAnimationActive={true}
                            animationDuration={800}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Chart1;
