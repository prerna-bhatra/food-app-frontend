import React from 'react'

const CategoriesSection = () => {
  return (
    <div className="w-full max-w-[1188px] mx-auto h-auto flex flex-col justify-start items-start gap-10 mb-40 px-4">
      <div className="w-full flex justify-between items-center">
        <div className="text-stone-900 text-[32px] font-extrabold font-['Inter'] leading-[42px]">
          Top Categories Visited By People Near You
        </div>
        <div className="flex justify-start items-center gap-2">
          <div className="text-center text-stone-900 text-base font-normal font-['Inter'] leading-snug cursor-pointer">
            Discover More
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-start items-start gap-6">
        <div className="bg-white rounded-[32px] shadow flex flex-col justify-start items-start w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-18px)]">
          <div className="w-full h-[278px] relative bg-zinc-300 rounded-t-[32px]"></div>
          <div className="px-6 py-6 flex flex-col justify-start items-start gap-2 w-full">
            <div className="text-stone-900 text-2xl font-bold font-['Inter'] leading-loose text-left">
              100 Bars & Restaurant
            </div>
            <div className="text-stone-900 text-base font-normal font-['Inter'] leading-snug text-left">
              Gandhi Nagar
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[32px] shadow flex flex-col justify-start items-start w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-18px)]">
          <div className="w-full h-[278px] relative bg-zinc-300 rounded-t-[32px]"></div>
          <div className="px-6 py-6 flex flex-col justify-start items-start gap-2 w-full">
            <div className="text-stone-900 text-2xl font-bold font-['Inter'] leading-loose text-left">
              16 Dining’s
            </div>
            <div className="text-stone-900 text-base font-normal font-['Inter'] leading-snug text-left">
              Gandhi Nagar
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[32px] shadow flex flex-col justify-start items-start w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-18px)]">
          <div className="w-full h-[278px] relative bg-zinc-300 rounded-t-[32px]"></div>
          <div className="px-6 py-6 flex flex-col justify-start items-start gap-2 w-full">
            <div className="text-stone-900 text-2xl font-bold font-['Inter'] leading-loose text-left">
              45 Desserts
            </div>
            <div className="text-stone-900 text-base font-normal font-['Inter'] leading-snug text-left">
              Gandhi Nagar
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesSection
