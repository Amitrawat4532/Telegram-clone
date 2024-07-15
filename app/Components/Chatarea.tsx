'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import search from '../../public/search.svg';
import panel from '../../public/panel.svg';
import threedots from '../../public/threedots.svg';
import phone from '../../public/phone.svg';
import attachment from '../../public/attachment.svg';
import telegram from '../../public/telegram.svg';
import smile from '../../public/smile.svg';
import back from '../../public/back-svg.svg'; 

type Props = {
  chatId: number;
  userName: string;
  onBack: () => void;
};

type Message = {
  id: number;
  sender_id: number;
  message: string;
  created_at: string;
};

const Chatarea: React.FC<Props> = ({ chatId, userName, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      console.log('Fetching messages for chatId:', chatId);
      try {
        const response = await fetch(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched messages:', data);
          if (data.status === 'success' && Array.isArray(data.data)) {
            setMessages(data.data);
          } else {
            console.error('Unexpected data format', data);
            setError('Unexpected data format');
          }
        } else {
          console.error('Failed to fetch messages');
          setError('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Error fetching messages');
      }
    };

    fetchMessages();
  }, [chatId]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full md:w-3/4 bg-[#212121] text-white flex flex-col chat-bg">
      <div className="flex justify-between items-center w-full p-4 bg-[#212121]">
        <div className="flex items-center">
          <button onClick={onBack} className="md:hidden mr-2">
        <img src={back.src} alt="back" className="w-6 h-6 mx-2" />
          
          </button>
          <img src="../amit.jpg" alt="user" className="w-10 h-10 rounded-full" />
          <span className="ml-4">{userName}</span>
        </div>
        <div className="flex items-center">
          <img src={search.src} alt="search" className="w-6 h-6 mx-2" />
          <img src={phone.src} alt="phone" className="w-6 h-6 mx-2" />
          <img src={panel.src} alt="panel" className="w-6 h-6 mx-2" />
          <img src={threedots.src} alt="menu" className="w-6 h-6 mx-2" />
        </div>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          messages.map((message) => (
            <div
              className={`flex flex-col py-2 ${
                message.sender_id === 1 ? 'items-end' : 'items-start'
              }`}
              key={message.id}
            >
              <div
                className={`p-2 rounded-xl text-white max-w-[500px] ${
                  message.sender_id === 1 ? 'bg-[#766ac8]' : 'bg-gray-500'
                }`}
              >
                <span>{message.message}</span>
              </div>
              <span className="text-gray-400 text-xs">
                {formatDate(message.created_at)}
              </span>
            </div>
          ))
        )}
      </div>
      <div className="flex items-center bg-[#212121] p-4 sticky bottom-0">
        <img src={attachment.src} alt="attachment" className="w-6 h-6 mr-2" />
        <input
          type="text"
          placeholder="Write a message..."
          className="flex-grow p-2 bg-[#212121] text-gray-200 rounded-full"
        />
        <img src={smile.src} alt="smile" className="w-7 h-7 ml-2" />
        <img src={telegram.src} alt="send" className="w-8 h-8 ml-2" />
      </div>
    </div>
  );
};

export default Chatarea;
