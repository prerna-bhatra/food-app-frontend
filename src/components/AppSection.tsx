import React from 'react'

const AppSection = () => {
    return (
        <div className="w-full h-[642px] px-32 bg-orange-500 bg-opacity-5 justify-start items-start gap-2.5 inline-flex mb-20 item-center">
            <div className="h-[642px] justify-start items-start gap-2.5 flex">
                <div className='self-stretch w-[581px]'>
                <img className="h-[642px]" src={"images/mobile.png"} alt="Mobile"/>
                </div>

                <div className="grow self-stretch basis-0 flex-col justify-center items-start gap-0 inline-flex ">

                    <div className="self-stretch text-left">
                        <span className="text-stone-900 text-[32px] font-extrabold leading-[42px]">Now Get </span>
                        <span className="text-orange-500 text-[32px] font-extrabold leading-[42px]">Delish Discoveries<br /></span>
                        <span className="text-stone-900 text-[32px] font-extrabold leading-[42px]">On Your Mobile Phone</span>
                    </div>

                    
                    <div className="self-stretch text-stone-900 text-base font-normal leading-snug text-left w-[512px] my-6">
                        To download the app, click the link we will provide you and open it on your phone.
                    </div>

                    <div className="h-[180px] flex-col justify-center items-start gap-6 flex w-full">
                        <div className="justify-start items-center gap-6 inline-flex">
                            <div className="justify-start items-center gap-2 flex">
                                <input type='radio' className='bg-orange'/>
                                <div className="text-stone-900 text-base font-normal leading-snug">Email Address</div>
                            </div>
                            <div className="justify-start items-center gap-2 flex">
                            <input type='radio' className='bg-orange'/>
                            <div className="text-stone-900 text-base font-normal leading-snug">Phone Number</div>
                            </div>
                        </div>

                        <input className='w-full p-4 rounded-[40px] border border-gray-200 text-center focus:outline-none' placeholder='prerna@gmail.com'/>
                    

                        <div className="w-full h-[54px] bg-orange-500 rounded-[40px] justify-center items-center inline-flex">
                            <button className="text-white text-base font-normal leading-snug w-full h-full px-6 py-4">Get Download Link</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AppSection
