import React, { useState } from 'react';
import Papa from 'papaparse'; // You need to install papaparse for CSV parsing

function UploadFile({ link, setLink, showAnalyze, setShowAnalyze, csvData, setCsvData, jsonData, setJsonData }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(''); // State to track errors

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Check if the file is a CSV
            if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
                setFile(selectedFile);
                setError(''); // Clear any previous errors
            } else {
                setFile(null);
                setError('Please upload a valid CSV file.'); // Set error message
            }
        }
    };

    // Handle file upload and parse the CSV
    const handleUpload = (e) => {
        e.preventDefault(); // Prevent the default form submission and page reload
        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                    const rawCsvData = result.data; // The raw CSV data
                    setCsvData(rawCsvData);

                    // Convert CSV data to JSON format
                    const jsonFormat = rawCsvData.map((row) => {
                        return row; // Each row is already a JSON object if header: true
                    });

                    setJsonData(jsonFormat);
                    console.log('JSON Data:', jsonFormat); // Log JSON data to console
                    setShowAnalyze(true);
                },
                header: true, // assuming CSV has headers
            });
        }
    };

    return (
        <>
            <div className="">

                {/* Full form container */}
                {!showAnalyze && (
                    <div>
                        <form className="flex items-end space-x-1 justify-center">
                            {/* Choose file button */}
                            <label className="block bg-gray-700 bg-opacity-30 rounded-l-full p-4 h-16 border border-gray-500">
                                <input
                                    type="file"
                                    // accept=".csv"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-300"
                                />
                            </label>

                            {/* Upload Button */}
                            <button
                                onClick={handleUpload}
                                disabled={!file} // Disable the button if no file is selected
                                className={`px-4 h-16 rounded-r-3xl transition text-white ${file
                                    ? 'bg-gray-400 hover:bg-gray-600 bg-opacity-20'
                                    : 'bg-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Upload
                            </button>
                        </form>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-500 text-center text-sm mt-2">
                                {error}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default UploadFile;
