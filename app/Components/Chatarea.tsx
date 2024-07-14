/* eslint-disable @next/next/no-img-element */
import React from 'react'
import search from "../../public/search.svg"
import panel from "../../public/panel.svg"
import threedots from "../../public/threedots.svg"
import phone from "../../public/phone.svg"
import attachment from "../../public/attachment.svg"
import telegram from "../../public/telegram.svg"
import smile from "../../public/smile.svg"






const Chatarea = () => {
  return (
    <div className="w-3/4 bg-[#212121] text-white flex flex-col chat-bg">
      <div className='flex justify-between w-full'>

      <div className='flex items-center  w-full p-4 bg-[#212121]'>
            <img src="../amit.jpg" alt="user.png" className="w-10 h-10 rounded-full" />
            <span className="ml-4">Amit Rawat</span>
          </div>
          <div className='flex items-center p-4 w-full justify-end bg-[#212121]'>
          
          <div className='flex items-center  w-full justify-end bg-[#212121]'>
          <img src={search.src} alt="search" className="w-6 h-6 mx-2" />
          <img src={phone.src} alt="phone" className="w-6 h-6 mx-2" />

          <img src={panel.src} alt="panel" className="w-6 h-6 mx-2" />
          <img src={threedots.src} alt="threedots" className="w-6 h-6 mx-2" />
        </div>

          </div>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
       
      </div>
      <div className='bg-[#212121] flex justify-between'>

      <div className="px-2 py-3 flex items-center gap-1 w-[90%]">
      <img src={attachment.src} alt="threedots" className="w-6 h-6 mx-2" />

        <input
          type="text"
          placeholder="Write a message..."
          className="w-full px-1 rounded bg-[#212121] text-gray-200 text-[12px] input-box "
          />
      </div>
      <div className=' flex justify-center items-center px-3 gap-2'>
      <img src={smile.src} alt="threedots" className="w-7 h-7 " />
      <img src={telegram.src} alt="threedots" className="w-8 h-8 " />


      </div>
          </div>
    </div>
  )
}

export default Chatarea
