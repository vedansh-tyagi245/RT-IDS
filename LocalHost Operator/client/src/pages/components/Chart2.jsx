import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

function Chart2() {
  const [last1HourData, setLast1HourData] = useState([]);
  const [last1DayData, setLast1DayData] = useState([]);
  const [last10DaysData, setLast10DaysData] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/requestlogs');
        processLogs(data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    const processLogs = (logs) => {
      const now = new Date();
      const hourCounts = {};
      const dayCounts = {};
      const tenDayCounts = {};

      logs.forEach(log => {
        const ip = log.client_ip || 'unknown';
        const timestamp = new Date(log.timestamp);
        const hoursDiff = (now - timestamp) / (1000 * 60 * 60);

        if (hoursDiff <= 1) {
          hourCounts[ip] = (hourCounts[ip] || 0) + 1;
        }
        if (hoursDiff <= 24) {
          dayCounts[ip] = (dayCounts[ip] || 0) + 1;
        }
        if (hoursDiff <= 240) {
          tenDayCounts[ip] = (tenDayCounts[ip] || 0) + 1;
        }
      });

      const sortAndSlice = (counts) =>
        Object.entries(counts)
          .map(([ip, count]) => ({ ip, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

      setLast1HourData(sortAndSlice(hourCounts));
      setLast1DayData(sortAndSlice(dayCounts));
      setLast10DaysData(sortAndSlice(tenDayCounts));
    };

    fetchLogs();
  }, []);

  const renderChart = (data, title, color) => (
  <div className="p-4 w-full h-[400px]">
    <h2 className="text-lg font-semibold mb-2 text-center">{title}</h2>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        barCategoryGap={30} // optional: spacing between bars
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="ip" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill={color} barSize={30} /> {/* 👈 fixed bar size */}
      </BarChart>
    </ResponsiveContainer>
  </div>
);


  return (
    <div className="space-y-6">
      {renderChart(last1HourData, 'Top 5 IPs - Last 1 Hour', '#34d399')}
      {renderChart(last1DayData, 'Top 5 IPs - Last 1 Day', '#60a5fa')}
      {renderChart(last10DaysData, 'Top 5 IPs - Last 10 Days', '#a78bfa')}
    </div>
  );
}

export default Chart2;
