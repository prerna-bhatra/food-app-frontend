import React, { useState } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi'; // Importing the chat icon
import Chatbot from '../ChatBot';
import { FaCross } from 'react-icons/fa';

const MainService = () => {
    const [chatVisible, setChatVisible] = useState(false);

    const toggleChat = () => {
        setChatVisible(!chatVisible);
    };

    return (
        <div className="w-[1184px] flex-col justify-start items-center gap-10 inline-flex mt-[72px]">
            
        <div className="text-stone-900 text-[32px] font-extrabold font-['Inter'] leading-[42px]">Explore the Best In Pune</div>

        <div className="self-stretch  justify-start items-center gap-6 inline-flex">
          <div className="grow shrink shadow basis-0 bg-white rounded-[32px] flex-col justify-start items-start inline-flex">
            <img className="w-[379px] h-[380px] rounded-[32px]" src={"/images/order_online.png"} />
            <div className="self-stretch  px-4 pt-6 pb-8 flex-col justify-start items-center gap-3 flex">
              <div className="text-orange-500 text-2xl font-bold font-['Inter'] leading-loose">Order  Online</div>
              <div className="self-stretch text-center text-stone-900 text-base font-normal font-['Inter'] leading-snug">Stay home and have your order delivered to your doorstep.</div>
            </div>
          </div>
          <div className="grow shrink shadow basis-0 self-stretch bg-white rounded-[32px] flex-col justify-start items-start inline-flex">
            <img className="w-[380px] h-[380px] rounded-[32px]" src={"/images/dining.png"} />
            <div className="self-stretch h-[122px] px-4 pt-6 pb-8 flex-col justify-start items-center gap-3 flex">
              <div className="text-orange-500 text-2xl font-bold font-['Inter'] leading-loose">Dining</div>
              <div className="self-stretch text-center text-stone-900 text-base font-normal font-['Inter'] leading-snug">Discover the City's favored location.</div>
            </div>
          </div>
          <div className="grow shrink shadow basis-0 self-stretch bg-white rounded-[32px] flex-col justify-start items-center inline-flex">
            <img className="w-[380px] h-[380px] rounded-[32px]" src={"/images/night_life.png"} />
            <div className="self-stretch h-[122px] px-4 pt-6 pb-8 flex-col justify-start items-center gap-3 flex">
              <div className="text-orange-500 text-2xl font-bold font-['Inter'] leading-loose">Nightlife And Club</div>
              <div className="self-stretch text-center text-stone-900 text-base font-normal font-['Inter'] leading-snug">Discover the Greatest Nightlife in the City</div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default MainService;
