import React, { useState } from 'react';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

function Should_Complete_date({ jsonData, setJsonData, setIsDataComplete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Helper function to parse DD/MM/YYYY into a Date object
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day); // Month is zero-based
  };

  // Helper function to format a Date object as DD/MM/YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Find missing dates and fill them with averages
  const fillMissingDatesWithAverages = () => {
    if (!jsonData || jsonData.length === 0) {
      console.log('No data available.');
      return;
    }

    // Extract and parse all dates from jsonData
    const dates = jsonData.map((item) => parseDate(item.Date));

    // Find minimum and maximum dates
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    // Create a Set of all provided dates in ISO format for quick lookup
    const dateSet = new Set(dates.map((d) => d.toISOString().split('T')[0]));

    // Calculate average values
    const total = {
      Open: 0,
      High: 0,
      Low: 0,
      Close: 0,
      Volume: 0,
    };

    jsonData.forEach((item) => {
      total.Open += parseFloat(item.Open) || 0;
      total.High += parseFloat(item.High) || 0;
      total.Low += parseFloat(item.Low) || 0;
      total.Close += parseFloat(item.Close) || 0;
      total.Volume += parseFloat(item.Volume) || 0;
    });

    const count = jsonData.length;

    const averages = {
      Open: total.Open / count,
      High: total.High / count,
      Low: total.Low / count,
      Close: total.Close / count,
      Volume: total.Volume / count,
    };

    // Find missing dates and fill them with averages in decreasing order
    const filledData = [...jsonData];
    for (let d = new Date(maxDate); d >= minDate; d.setDate(d.getDate() - 1)) {
      const dateString = d.toISOString().split('T')[0];
      if (!dateSet.has(dateString)) {
        filledData.push({
          Date: formatDate(new Date(d)), // Convert back to DD/MM/YYYY
          Open: averages.Open.toFixed(2),
          High: averages.High.toFixed(2),
          Low: averages.Low.toFixed(2),
          Close: averages.Close.toFixed(2),
          Volume: Math.round(averages.Volume), // Assuming Volume is an integer
        });
      }
    }

    // Sort the filled data by date (increasing order: earliest first)
    filledData.sort((a, b) => parseDate(a.Date) - parseDate(b.Date));

    // Update the jsonData with the new filled data
    setJsonData(filledData);
    console.log('Filled Data:', filledData);

    // Set modal message and open modal
    setModalMessage('Missing values have been filled with averages. View your dataset again to see updates.');
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[80vh] text-gray-200">
      <p className="text-lg text-gray-400 mt-4 px-8 text-center">
        Your data may lack some dates. To proceed further, fill missing values.
      </p>
      <div className="w-full max-w-md mt-6">
        <button
          className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-lg py-3 px-6 rounded-lg shadow-lg font-semibold transition-all duration-200 transform hover:scale-105"
          onClick={fillMissingDatesWithAverages}
        >
          Fill Missing Values with Averages
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsDataComplete(true)}
        contentLabel="Missing Values Filled"
        className="bg-gray-800 text-white rounded-lg shadow-xl p-6 w-96 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Process Complete</h2>
        <p className="text-lg mb-6">{modalMessage}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          onClick={() => setIsDataComplete(true)}
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default Should_Complete_date;
