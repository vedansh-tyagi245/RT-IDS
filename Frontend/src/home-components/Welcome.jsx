import React, { useState, useEffect } from 'react';
import UploadFile from '../File-Upload-components/UploadFile';
import HomePage from './HomePage';
import Tut_home_page from '../Tutorials-components/Tut_home_page';
import Profile from '../Profile-components/Profile';

function Welcome() {

    const [link, setLink] = useState("/");
    const [apiMessage, setApiMessage] = useState("");
    const [csvResult, setCsvResult] = useState(null);

    useEffect(() => {

        const sendCsvData = async () => {
            const sampleCsvData = [
                { name: "Alice", age: 25, city: "New York" },
                { name: "Bob", age: 30, city: "San Francisco" },
                { name: "Charlie", age: 35, city: "Chicago" }
            ];

            try {
                const response = await fetch('https://quant-data-analyser-backend.onrender.com/process_csv_rows', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(sampleCsvData),
                });

                if (response.ok) {
                    const data = await response.json();
                    setCsvResult(data.number_of_rows);
                    console.log(data.number_of_rows);
                } else {
                    console.error('Failed to send CSV data:', response.statusText);
                }
            } catch (error) {
                console.error('Error while sending CSV data:', error);
            }
        };

        if (link === '/') {
            sendCsvData();
        }
    }, [link]); // Dependency array includes `link` to refetch on link change

    return (
        <div>
            {link === '/' && <HomePage link={link} setLink={setLink} />}

            {link === '/Tutorials' && <Tut_home_page setLink={setLink} />}

            {link === '/profile' && <Profile setLink={setLink}/>}

        </div>
    );
}

export default Welcome;
