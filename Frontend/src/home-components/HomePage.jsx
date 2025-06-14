import React, { useState } from 'react';
import Navbar from './Navbar';

function HomePage() {

    const handleGetRequest = async () => {
        try {
            const response = await fetch('https://rt-ids-1.onrender.com', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log('GET Response:', data);
        } catch (error) {
            console.error('GET Error:', error);
        }
    };

    const handlePostRequest = async () => {
        try {
            const response = await fetch('https://rt-ids-1.onrender.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: 'Hello from React' }),
            });
            const data = await response.json();
            console.log('POST Response:', data);
        } catch (error) {
            console.error('POST Error:', error);
        }
    };

    return (
        <div className='bg-grid-white h-[100vh]'>
            {/* Navbar Components */}
            <Navbar />

            <div className='flex flex-col items-center justify-center h-[80vh]'>
                <div className='flex space-x-6'>
                    <button 
                        className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 
                                  transition duration-300 ease-in-out transform hover:scale-105
                                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                        onClick={handleGetRequest}
                    >
                        Get Request
                    </button>
                    <button 
                        className='px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 
                                  transition duration-300 ease-in-out transform hover:scale-105
                                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                        onClick={handlePostRequest}
                    >
                        Post Request
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;