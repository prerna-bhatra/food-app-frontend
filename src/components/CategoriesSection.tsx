import React from 'react'

const CategoriesSection = () => {
    return (
        <div className="w-[1188px] h-[454px] flex-col justify-start items-start gap-10 inline-flex mb-40">
            <div className="self-stretch justify-between items-center inline-flex">
                <div className="text-stone-900 text-[32px] font-extrabold font-['Inter'] leading-[42px]">Top Categories Visited By People Near You</div>
                <div className="justify-start items-center gap-2 flex">
                <div className="text-center text-stone-900 text-base font-normal font-['Inter'] leading-snug cursor-pointer">Discover More</div>
                </div>
            </div>
            <div className="justify-start items-start gap-6 inline-flex">
                <div className="bg-white rounded-[32px] shadow flex-col justify-start items-start inline-flex">
                    <div className="w-[380px] h-[278px] relative bg-zinc-300 rounded-t-[32px]"></div>
                    <div className=" px-6 py-6 flex-col justify-start items-start gap-2 flex self-stretch">
                        <div className="text-stone-900 text-2xl font-bold font-['Inter'] leading-loose text-left">100 Bars & Resturant</div>
                        <div className="self-stretch text-stone-900 text-base font-normal font-['Inter'] leading-snug text-left">Gandhi Nagar</div>
                    </div>
                </div>
                <div className="bg-white rounded-[32px] shadow flex-col justify-start items-start inline-flex">
                    <div className="w-[380px] h-[278px] relative bg-zinc-300 rounded-t-[32px]"></div>
                    <div className=" px-6 py-6 flex-col justify-start items-start gap-2 flex self-stretch">
                        <div className="text-stone-900 text-2xl font-bold font-['Inter'] leading-loose text-left">16 Dining’s</div>
                        <div className="self-stretch text-stone-900 text-base font-normal font-['Inter'] leading-snug text-left">Gandhi Nagar</div>
                    </div>
                </div>
                <div className="bg-white rounded-[32px] shadow flex-col justify-start items-start inline-flex">
                    <div className="w-[380px] h-[278px] relative bg-zinc-300 rounded-t-[32px]"></div>
                    <div className=" px-6 py-6 flex-col justify-start items-start gap-2 flex self-stretch">
                        <div className="text-stone-900 text-2xl font-bold font-['Inter'] leading-loose text-left">45 Desserts</div>
                        <div className="self-stretch text-stone-900 text-base font-normal font-['Inter'] leading-snug text-left">Gandhi Nagar</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CategoriesSection
