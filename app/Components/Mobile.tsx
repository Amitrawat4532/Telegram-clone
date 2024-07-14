'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

type props={
  className?: string
}

const Mobile = (className:props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://devapi.beyondchats.com/api/get_all_chats?page=1");
        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData && Array.isArray(jsonData.data)) {
            setData(jsonData.data);  // Access the data array in the response
            console.log(jsonData.data, "hello data");
          } else {
            console.error('Unexpected data format', jsonData);
          }
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once

  return (
    <div className={`w-full bg-[#272727] text-white flex flex-col`}>
      <div className="flex items-center justify-between p-4 gap-4">
        <button className=''>
          <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#aaaaaa">
            <path fill="#aaaaaa" fillRule="evenodd" d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"/>
          </svg>
        </button>
        <input 
          type="text"
          placeholder="Search"
          className="w-full p-2 bg-[#212121] text-gray-200 rounded-full px-4"
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        {Array.isArray(data) && data.map((item, index) => (
          <div className='flex items-center p-4 hover:bg-gray-700' key={index}>
            {/* <img src="/path/to/default/image.png" alt="user.png" className="w-10 h-10 rounded-full" /> 
            <span className="ml-4">{item.sender.name}</span>
            <p className="ml-4">{item.message}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mobile;
