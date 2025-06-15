import React from 'react';

function HomePage() {

    const handleDemoRequest = async () => {
        try {
            const response = await fetch('https://rt-ids-1.onrender.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: 'Demo request from homepage' }),
            });
            const data = await response.json();
            console.log('Demo Response:', data);
        } catch (error) {
            console.error('Demo Request Error:', error);
        }
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="grid-overlay absolute inset-0"></div>
                <img
                    src="/1.avif"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content on the Right */}
            <div className="relative z-10 flex justify-end items-center h-[100vh] lg:pr-10 lg:mt-10">
                <div className="bg-black bg-opacity-30 text-white p-8 rounded-3xl h-full max-w-md">
                    <h1 className="text-3xl font-bold mb-10 text-center">
                        Real-Time Intrusion Detection System
                    </h1>
                    <p className="text-lg mb-6 text-center">
                        RT-IDS is a real-time monitoring system that detects and blocks suspicious
                        activities based on network behavior and request patterns. It provides an interactive
                        dashboard with live statistics, IP tracking, geo-location mapping, and an intelligent
                        alert system.
                    </p>

                    {/* Centered Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleDemoRequest}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition duration-200"
                        >
                            Demo Request
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HomePage;
