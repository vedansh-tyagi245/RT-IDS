import React, { useEffect, useState } from 'react';
import Navbar from '../home-components/Navbar';

function Profile({setLink}) {
    const [profileImage, setProfileImage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Fetch a random user image from the API
    useEffect(() => {
        const fetchRandomImage = async () => {
            try {
                const response = await fetch('https://randomuser.me/api/');
                const data = await response.json();
                const imageUrl = data.results[0].picture.large; // Extracting the image URL
                setProfileImage(imageUrl);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching random image:', error);
                setIsLoading(false);
            }
        };

        fetchRandomImage();
    }, []);

    return (
        <div className='bg-grid-white'>
            <Navbar setLink={setLink} />
            <div className=' text-white flex flex-col items-center justify-center p-4 my-[10vh]'>
                <div className='bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm text-center'>
                    {isLoading ? (
                        <div className='animate-pulse'>
                            <div className='h-40 bg-gray-500 rounded-full'></div>
                            <div className='h-6 mt-4 bg-gray-500 rounded w-24 mx-auto'></div>
                            <div className='h-4 mt-2 bg-gray-500 rounded w-48 mx-auto'></div>
                        </div>
                    ) : (
                        <div>
                            {/* Profile Image */}
                            <img src={'Profile_Image.jpg'} alt="Profile" className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-gray-600" />

                            {/* Name and Details */}
                            <h2 className='text-2xl font-semibold mb-2'>Vedansh Tyagi</h2>
                            <p className='text-xl mb-1'>College: NSUT</p>
                            <p className='text-xl'>Branch: CSAI-2</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
