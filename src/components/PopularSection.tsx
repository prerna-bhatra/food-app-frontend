import React from 'react';

const PopularSection = () => {
  return (
    <div className="w-[1184px] h-[470px] flex-col justify-start items-start gap-10 inline-flex mt-20 mb-20">
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="text-stone-900 text-[32px] font-extrabold font-['Inter'] leading-[42px]">Popular Places Nearby Your Location</div>
        <div className="justify-start items-center gap-2 flex">
          <div className="text-center text-stone-900 text-base font-normal font-['Inter'] leading-snug">Discover More</div>
          <div className="w-6 h-6 relative"></div>
        </div>
      </div>
      <div className="justify-start items-start gap-6 inline-flex">
        <div className="bg-white rounded-[32px] shadow flex-col justify-start items-start inline-flex">
          <div className="w-[278px] h-[278px] relative bg-zinc-300 rounded-t-[32px]">
            <div className="left top-[268px] absolute">
              <span className="text-white text-base font-medium font-['Inter'] bg-orange-500 p-2">Known for :
              </span><span className="text-white text-base font-bold font-['Inter'] bg-orange-500 p-2">Dal Makhni</span></div>
          </div>
          <div className="h-[110px] p-6 flex-col justify-start items-start gap-2 flex mb-6">
            <div className="text-stone-900 text-2xl font-bold font-['Inter'] leading-loose text-left">Punjabi Dhaba</div>
            <div className="self-stretch text-stone-900 text-base font-normal font-['Inter'] leading-snug text-left">Gandhi Nagar</div>
          </div>
        </div>
        <div className="bg-white rounded-[32px] shadow flex-col justify-start items-start inline-flex">
          <div className="w-[278px] h-[278px] relative bg-zinc-300 rounded-t-[32px]">
            <div className="left top-[268px] absolute"><span className="text-white text-base font-medium font-['Inter'] bg-orange-500 p-2">
              Known for : </span><span className="text-white text-base font-bold font-['Inter'] bg-orange-500 p-2">Dal Makhni</span></div>
          </div>
          <div className="h-[110px] p-6 flex-col justify-start items-start gap-2 flex mb-6">
            <div className="text-stone-900 text-2xl font-bold font-['Inter'] leading-loose">Punjabi Dhaba</div>
            <div className="self-stretch text-stone-900 text-base font-normal font-['Inter'] leading-snug">Gandhi Nagar</div>
          </div>
        </div>
        <div className="bg-white rounded-[32px] shadow flex-col justify-start items-start inline-flex">
          <div className="w-[278px] h-[278px] relative bg-zinc-300 rounded-t-[32px]">
            <div className="left top-[268px] absolute"><span className="text-white text-base font-medium font-['Inter'] bg-orange-500 p-2">Known for : </span><span className="text-white text-base font-bold font-['Inter'] bg-orange-500 p-2">Dal Makhni</span></div>
          </div>
          <div className="h-[110px] p-6 flex-col justify-start items-start gap-2 flex mb-6">
            <div className="text-stone-900 text-2xl font-bold font-['Inter'] leading-loose">Punjabi Dhaba</div>
            <div className="self-stretch text-stone-900 text-base font-normal font-['Inter'] leading-snug">Gandhi Nagar</div>
          </div>
        </div>
        <div className="bg-white rounded-[32px] shadow flex-col justify-start items-start inline-flex">
          <div className="w-[278px] h-[278px] relative bg-zinc-300 rounded-t-[32px]">
            <div className="left top-[268px] absolute"><span className="text-white text-base font-medium font-['Inter'] bg-orange-500 p-2">Known for : </span><span className="text-white text-base font-bold font-['Inter'] bg-orange-500 p-2">Dal Makhni</span></div>
          </div>
          <div className="h-[110px] p-6 flex-col justify-start items-start gap-2 flex mb-6">
            <div className="text-stone-900 text-2xl font-bold font-['Inter'] leading-loose">Punjabi Dhaba</div>
            <div className="self-stretch text-stone-900 text-base font-normal font-['Inter'] leading-snug">Gandhi Nagar</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularSection;
