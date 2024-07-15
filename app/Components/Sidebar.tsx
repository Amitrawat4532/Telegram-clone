'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import amit from '../../public/amit.jpg';

type Props = {
  className?: string;
  onNameClick: (chatId: number, userName: string) => void;
};

const Sidebar: React.FC<Props> = ({ className, onNameClick }) => {
  const [data, setData] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let accumulatedNames: any[] = [];
      let currentPage = 1;

      while (accumulatedNames.length < 12) {
        try {
          const res = await fetch(`https://devapi.beyondchats.com/api/get_all_chats?page=${currentPage}`);
          if (res.ok) {
            const response = await res.json();
            const validNames = response.data.data.filter((item: any) => item.creator.name);
            accumulatedNames = [...accumulatedNames, ...validNames];

            if (response.data.data.length === 0) {
              break;
            }

            currentPage += 1;
          } else {
            console.error('Failed to fetch data');
            break;
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          break;
        }
      }

      setData(accumulatedNames.slice(0, 12));
    };

    fetchData();
  }, []);

  const handleClick = (chatId: number, userName: string) => {
    setActiveChatId(chatId);
    onNameClick(chatId, userName);
  };

  return (
    <div className={`w-full md:w-1/4 bg-[#212121] text-white flex flex-col mr-[1px] ${className || ''}`}>
      <div className="flex items-center justify-between p-4 gap-4">
        <button aria-label="Menu">
          <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#aaaaaa">
            <path fill="#aaaaaa" fillRule="evenodd" d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"/>
          </svg>
        </button>
        <input 
          type="text"
          placeholder="Search"
          className="w-full p-2 bg-[#383838] text-gray-200 rounded-full px-4"
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        {data.map((item, index) => (
          <div
            className={`flex items-center p-4 cursor-pointer ${
              activeChatId === item.id ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
            key={index}
            onClick={() => handleClick(item.id, item.creator.name)}
          >
            <img src={amit.src} alt="user" className="w-10 h-10 rounded-full" />
            <span className="ml-4">{item.creator.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
