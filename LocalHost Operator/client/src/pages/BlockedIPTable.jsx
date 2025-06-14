import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

function BlockedIPTable() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/logs');
        setLogs(data);
      } catch (error) {
        console.error('Error fetching blocked IP logs:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="bg-black bg-opacity-90 text-white h-[2100px]">
      <Navbar/>
      <h2 className="text-xl font-semibold mb-4 text-center">Blocked IPs</h2>
      <div className="overflow-x-auto max-h-[500px] border rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 border-b">IP Address</th>
              <th className="py-2 px-4 border-b">Reason</th>
              <th className="py-2 px-4 border-b">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td className="py-4 px-4 text-center" colSpan={3}>No blocked IPs found.</td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{log.ip}</td>
                  <td className="py-2 px-4 border-b">{log.reason}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BlockedIPTable;
