import React, { useState, useEffect } from 'react';
import Should_Complete_date from './Should_Complete_date';
import Stock_analyze from './Analyzer-components/Stock_analyze';

function StockPerformance({ jsonData, setJsonData }) {

    const [isDataComplete, setIsDataComplete] = useState(null);

    // Helper function to parse DD/MM/YYYY into a Date object
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day); // Month is zero-based
    };

    useEffect(() => {
        if (jsonData && jsonData.length > 0) {
            // Extract and parse all dates
            const dates = jsonData.map(item => parseDate(item.Date));

            // Find minimum and maximum dates
            const minDate = new Date(Math.min(...dates));
            const maxDate = new Date(Math.max(...dates));

            // Create a Set of all provided dates in ISO format for quick lookup
            const dateSet = new Set(dates.map(Date => Date.toISOString().split('T')[0]));

            let allDatesPresent = true;

            // Iterate from minDate to maxDate and check if all dates exist
            for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
                const dateString = d.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
                if (!dateSet.has(dateString)) {
                    allDatesPresent = false;
                    break;
                }
            }

            setIsDataComplete(allDatesPresent);
        } else {
            setIsDataComplete(false);
        }
    }, []);

    return (
        <div>

            {isDataComplete == false && <div><Should_Complete_date jsonData={jsonData} setJsonData={setJsonData} setIsDataComplete={setIsDataComplete}/></div>}
            {isDataComplete == true && <div><Stock_analyze jsonData={jsonData}/></div>}
        </div>
    )
}

export default StockPerformance