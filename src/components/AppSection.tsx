import React from 'react'

const AppSection = () => {
    return (
        <div className="w-full h-[642px] px-32 bg-orange-500 bg-opacity-5 justify-start items-start gap-2.5 inline-flex mb-20">
            <div className="h-[642px] justify-start items-start gap-2.5 flex">
                <img className="w-[581px] h-[642px]" src={"images/mobile.png"} />
                <div className="grow shrink basis-0 self-stretch flex-col justify-center items-start gap-6 inline-flex">
                    <div className="self-stretch">
                        <span className="text-stone-900 text-[32px] font-extrabold leading-[42px]">Now Get </span>
                        <span className="text-orange-500 text-[32px] font-extrabold leading-[42px]">Delish Discoveries<br /></span>
                        <span className="text-stone-900 text-[32px] font-extrabold leading-[42px]">On Your Mobile Phone</span>
                    </div>
                    <div className="self-stretch text-stone-900 text-base font-normal leading-snug">
                        To download the app, click the link we will provide you and open it on your phone.
                    </div>
                    <div className="self-stretch h-[180px] flex-col justify-center items-start gap-6 flex">
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
                        <div className="self-stretch h-[54px] px-6 bg-white rounded-[40px] border border-gray-200 justify-center items-center gap-4 inline-flex">
                            <div className="text-stone-900 text-base font-normal leading-snug">Prernabhatra@gmail.com</div>
                        </div>
                        <div className="self-stretch h-[54px] px-8 bg-orange-500 rounded-[40px] justify-center items-center inline-flex">
                            <div className="text-white text-base font-normal leading-snug">Get Download Link</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default AppSection
