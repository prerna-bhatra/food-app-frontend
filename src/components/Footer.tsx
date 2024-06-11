import React from 'react'

const Footer = () => {
    return (
        <div className="w-full h-[310px]  pt-12 bg-stone-900 justify-center items-center gap-2.5 inline-flex" >
            <div className="w-[1276px] flex-col justify-start items-start gap-4 inline-flex">
                <div className="self-stretch pb-[38px] justify-between items-start inline-flex">
                    <div className="self-stretch flex-col justify-between items-start inline-flex">
                        <div className="flex-col justify-start items-start gap-4 flex">
                            <div className="justify-start items-center gap-4 inline-flex">
                                <div className="w-12 h-12 relative">
                                    <div className="w-12 h-12 left-0 top-0 absolute bg-orange-500 rounded-full"></div>
                                </div>
                                <div className="text-white text-2xl font-bold font-['Inter'] leading-loose">Delish Discoveries</div>
                            </div>
                            <div className="w-[214px] justify-end items-center gap-4 inline-flex">
                                <div className="w-6 h-6 relative"></div>
                                <div className="w-6 h-6 relative"></div>
                                <div className="w-[30.87px] h-6 relative"></div>
                                <div className="w-6 h-6 relative"></div>
                            </div>
                        </div>
                        <div className="pl-16 justify-start items-start gap-6 inline-flex">
                            <div className="px-2 py-1 bg-slate-700 rounded-[7px] justify-start items-end gap-2 flex">
                                <img className="w-7 h-7" src="https://via.placeholder.com/28x28" />
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className="text-white text-[8px]  font-['Inter']">Download on the</div>
                                    <div className="text-white text-base font-medium font-['Inter']">Google Play</div>
                                </div>
                            </div>
                            <div className="h-[37px] px-2 py-1 bg-slate-700 rounded-[7px] justify-center items-center gap-2 flex">
                                <div className="w-7 h-7 relative"></div>
                                <div className="flex-col justify-start items-start inline-flex">
                                    <div className="text-white text-[8px]  font-['Inter']">Download on the</div>
                                    <div className="text-white text-base font-medium font-['Inter']">App Store</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="justify-start items-start gap-[55px] flex">
                        <div className="flex-col justify-start items-start gap-4 inline-flex">
                            <div className="text-zinc-500 text-base font-semibold font-['Inter'] leading-snug">Restaurants</div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">Join us</div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">Services</div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">Blog</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-4 inline-flex">
                            <div className="text-zinc-500 text-base font-semibold font-['Inter'] leading-snug">About</div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">Who we are</div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">Careers</div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">Contact Us</div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">Report</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-4 inline-flex">
                            <div className="text-zinc-500 text-base font-semibold font-['Inter'] leading-snug">Policies</div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">Security</div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">Terms</div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">Sitemap</div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">Privacy</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-4 inline-flex">
                            <div className="text-zinc-500 text-base font-semibold font-['Inter'] leading-snug">Social </div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">LinkedIn</div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">Instagram</div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">Twitter</div>
                            <div className="text-white text-base  font-['Inter'] leading-snug">Youtube</div>
                        </div>
                    </div>
                </div>
                <div className="self-stretch py-2 border-t border-white justify-between items-center inline-flex">
                    <div className="justify-start items-start gap-10 flex">
                        <div className="text-white text-xs  font-['Almarai'] leading-[18px]">Privacy Policy</div>
                        <div className="text-white text-xs  font-['Almarai'] leading-[18px]">Terms of Conditions</div>
                    </div>
                    <div className="text-white text-xs  font-['Almarai'] leading-[18px]">Delish Discoveries, LLC. All rights reserved.</div>
                </div>
            </div>
  </div >
  )
}

export default Footer
