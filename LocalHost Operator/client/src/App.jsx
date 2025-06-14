import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Overview from './pages/Overview';
import BlockedIPTable from './pages/BlockedIPTable';

const App = () => {
  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket Server");
    };

    ws.onmessage = (event) => {
      console.log("📨 Message from server:", event.data);
    };

    ws.onclose = () => {
      console.warn("❌ WebSocket disconnected");
    };

    ws.onerror = (error) => {
      console.error("⚠️ WebSocket error:", error);
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Overview/>}/>
          <Route path='/table' element={<BlockedIPTable/>}/>
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
