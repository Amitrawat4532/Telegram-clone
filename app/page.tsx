'use client'
import React, { useState } from 'react';
import Chatarea from './Components/Chatarea';
import Sidebar from './Components/Sidebar';

const Home = () => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const handleNameClick = (chatId: number, userName: string) => {
    setSelectedChatId(chatId);
    setSelectedUserName(userName);
    setIsSidebarOpen(false); // Close sidebar on mobile view when a chat is selected
  };

  const handleBack = () => {
    setIsSidebarOpen(true);
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex h-screen">
        <Sidebar onNameClick={handleNameClick} />
        {selectedChatId !== null ? (
          <Chatarea chatId={selectedChatId} userName={selectedUserName!} onBack={handleBack} />
        ) : (
          <div className="flex-1 flex items-center justify-center chat-bg">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden h-screen">
        {isSidebarOpen ? (
          <Sidebar onNameClick={handleNameClick} />
        ) : (
          selectedChatId !== null && (
            <Chatarea chatId={selectedChatId} userName={selectedUserName!} onBack={handleBack} />
          )
        )}
        {/* <button
          className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
        </button> */}
      </div>
    </>
  );
};

export default Home;
