import React from 'react'

const Footer = () => {
    return (
        <div className="w-full h-[310px]  pt-12 bg-stone-900 justify-center items-center gap-2.5 inline-flex mt-6 " >
            <div className="w-[1276px] flex-col justify-start items-start gap-4 inline-flex">
                <div className="self-stretch pb-[38px] justify-between items-start inline-flex">
                    <div className="self-stretch flex-col justify-between items-start inline-flex">
                        <div className="flex-col justify-start items-start gap-4 flex">
                            <div className="justify-start items-center gap-4 inline-flex">
                                <img src={"/images/logo.png"} />
                            </div>
                            <div className="w-[214px] justify-end items-center gap-4 inline-flex">
                                <img className="w-6 h-6 relative" src={"/images/linkedin.png"} />
                                <img className="w-6 h-6 relative" src={"/images/twitter.png"} />
                                <img className="w-6 h-6 relative" src={"/images/discord.png"} />
                                <img className="w-6 h-6 relative" src={"/images/insta.png"} />
                            </div>
                        </div>
                        <div className="pl-16 justify-start items-start gap-6 inline-flex">
                            <div className="px-2 py-1 bg-slate-700 rounded-[7px] justify-start items-end gap-2 flex">
                                <img className='w-[143px]' src={"/images/playstore.png"} />

                            </div>

                            <div className="px-2 py-1 bg-slate-700 rounded-[7px] justify-start items-end gap-2 flex">
                                <img className='w-[143px]' src={"/images/apple.png"} />

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
