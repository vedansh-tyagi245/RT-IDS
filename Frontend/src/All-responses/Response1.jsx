import React, { useState, useEffect } from 'react'

function Response1({ res1, jsonData, setSuccess1 }) {

    const [response1, setResponse1] = useState(null); // To store the API response
    const [error1, setError1] = useState(null); // To handle errors, if any
    const [currentTime, setCurrentTime] = useState(''); // To store the current time

    // Function to send JSON data to the backend
    const handlePostRequest = async () => {
        try {
            const res = await fetch('https://quant-data-analyser-backend.onrender.com/process_csv', { // Replace with your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData), // Send the JSON data
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            setResponse1(data); // Update the state with the response data
            setSuccess1(true);
        } catch (err) {
            console.error('Error sending data to backend:', err);
            setError1(err.message);
        }
    };

    // Trigger the POST request when res1 is not null or undefined
    useEffect(() => {
        if (res1) {
            handlePostRequest(); // Only call the POST request when res1 is valid
        }
    }, [res1]); // The useEffect hook will run every time res1 changes

    // Function to get current time in desired format
    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString(); // You can adjust the format if needed
    };

    useEffect(() => {
        setCurrentTime(getCurrentTime()); // Set the current time when the component is mounted
    }, []);

    return (
        <div>
            {response1 && (
                <div className="p-1 rounded font-mono">
                    <span className="font-bold text-green-600">{`${currentTime} : `} {`Response from Backend ==>`}</span>
                    {/* Display number of columns and column names */}
                    <p className='inline'>
                        <strong className='inline px-2'>Number of columns:</strong> {response1.number_of_columns},
                    </p>
                    <p className='inline'>
                        <strong className='inline px-2'>Column names:{" {"}</strong>
                    </p>
                    <ul className='inline'>
                        {response1.column_names.map((column, index) => (
                            <li key={index} className='inline pr-2'>{column},</li>
                        ))}
                        <strong>{"}"}</strong>
                    </ul>
                </div>
            )}

            {error1 && (
                <div className="text-red-500 p-1 rounded font-mono">
                    <h3 className="font-bold inline">{`${currentTime} : `} {`Response from Backend ==>`}&nbsp;Error:</h3>
                    <p className='px-2 inline'>{error1}</p>
                </div>
            )}
        </div>
    )
}

export default Response1;
