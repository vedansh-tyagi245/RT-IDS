import React, { useState, useEffect } from 'react'

function Response4({ res1, jsonData, setJsonData, setSuccess4 }) {

    const [response4, setResponse4] = useState(null); // To store the API response
    const [error4, setError4] = useState(null); // To handle errors, if any
    const [currentTime, setCurrentTime] = useState(''); // To store the current time


    // Function to send JSON data to the backend
    const handlePostRequest = async () => {
        try {
            const res = await fetch('https://quant-data-analyser-backend.onrender.com/process_csv_remove_null_values', { // Replace with your backend endpoint
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
            setResponse4(data); // Update the state with the response data
            setJsonData(data.cleaned_data);
            // console.log(data.cleaned_data);
            console.log(jsonData);
            setSuccess4(true);
        } catch (err) {
            console.error('Error sending data to backend:', err);
            setError4(err.message);
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
            {response4 && (
                <div className="p-1 rounded font-mono">
                    <span className="font-bold text-green-600">{`${currentTime} : `} {`Response from Backend ==>`}</span>
                    {/* Display number of columns and column names */}
                    <p className='inline'>
                        <strong className='inline px-2'>Cleaned Data by removing rows having NULL values</strong>
                    </p>
                </div>
            )}

            {error4 && (
                <div className="text-red-500 p-1 rounded font-mono">
                    <h3 className="font-bold inline">{`${currentTime} : `} {`Response from Backend ==>`}&nbsp;Error:</h3>
                    <p className='px-2 inline'>{error4}</p>
                </div>
            )}
        </div>
    )
}

export default Response4;
