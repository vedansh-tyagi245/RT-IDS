import React from 'react';

function DemoTrading({ jsonData }) {
  // Initial investment amount
  const initialInvestment = 1000; // Modify this value as needed

  // Calculate the total money by reinvesting each day (using Open and High)
  const calculateTotalHigh = () => {
    let currentInvestment = initialInvestment;

    jsonData.forEach((data) => {
      if (data.Open && data.High) {
        // Calculate the amount after reinvesting for the day
        currentInvestment = (currentInvestment * data.High) / data.Open;
      }
    });

    return currentInvestment.toFixed(2); // Return total with two decimal places
  };

  // Calculate the total money by reinvesting each day (using Open and Low)
  const calculateTotalLow = () => {
    let currentInvestment = initialInvestment;

    jsonData.forEach((data) => {
      if (data.Open && data.Low) {
        // Calculate the amount after reinvesting for the day
        currentInvestment = (currentInvestment * data.Low) / data.Open;
      }
    });

    return currentInvestment.toFixed(2); // Return total with two decimal places
  };

  return (
    <div className="p-8 bg-gray-900 text-gray-300 flex flex-col items-center bg-opacity-25 h-[89vh]">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-10 text-white tracking-wide">
        Demo Trading Simulator
      </h1>

      {/* Subtitle */}
      <p className="text-xl font-light text-center max-w-2xl mb-8 text-gray-400">
        Starting with an initial investment of 
        <span className="font-semibold text-gray-200"> ${initialInvestment}</span>, 
        see how your money grows by reinvesting daily.
      </p>

      {/* Investment Summary */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-center w-full max-w-4xl">
        {/* High Withdrawal */}
        <div className="p-6 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-lg rounded-xl w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            Daily Withdrawal at High
          </h2>
          <p className="text-xl text-gray-300">
            Total Money becomes: 
            <span className="text-green-400 font-bold ml-2">${calculateTotalHigh()}</span>
          </p>
        </div>

        {/* Low Withdrawal */}
        <div className="p-6 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-lg rounded-xl w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            Daily Withdrawal at Low
          </h2>
          <p className="text-xl text-gray-300">
            Total Money becomes: 
            <span className="text-red-400 font-bold ml-2">${calculateTotalLow()}</span>
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-sm text-center text-gray-500 mt-10 max-w-3xl">
        <strong>Disclaimer:</strong> While the highest profit might seem exciting, keep in mind
        that stock market trading involves risks. Always invest wisely and consider potential
        losses alongside gains.
      </p>
    </div>
  );
}

export default DemoTrading;
