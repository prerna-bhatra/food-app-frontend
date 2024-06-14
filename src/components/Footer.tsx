import React from 'react';

const Footer = () => {
    return (
        <div className="w-full h-auto pt-12 bg-stone-900 justify-center items-center gap-2.5 flex flex-col mt-6">
            <div className="w-full max-w-[1276px] flex flex-col justify-start items-start gap-4 px-4">
                <div className="w-full pb-6 flex flex-col md:flex-row justify-between items-start">
                    <div className="w-full md:w-auto flex flex-col justify-between items-start gap-4">
                        <div className="flex flex-col justify-start items-start gap-4">
                            <div className="flex justify-start items-center gap-4">
                                <img src="/images/logo.png" alt="Logo" />
                            </div>
                            <div className="flex justify-start items-center gap-4">
                                <img className="w-6 h-6" src="/images/linkedin.png" alt="LinkedIn" />
                                <img className="w-6 h-6" src="/images/twitter.png" alt="Twitter" />
                                <img className="w-6 h-6" src="/images/discord.png" alt="Discord" />
                                <img className="w-6 h-6" src="/images/insta.png" alt="Instagram" />
                            </div>
                        </div>

                        <div className="flex justify-start items-start gap-6">
                            <div className="px-2 py-1 bg-slate-700 rounded-[7px] flex justify-start items-end gap-2">
                                <img className='w-[143px]' src="/images/playstore.png" alt="Play Store" />
                            </div>
                            <div className="px-2 py-1 bg-slate-700 rounded-[7px] flex justify-start items-end gap-2">
                                <img className='w-[143px]' src="/images/apple.png" alt="Apple Store" />
                            </div>
                        </div>

                    </div>

                    <div className="grid grid-cols-3 gap-6 mt-6 md:mt-0 md:grid-cols-4 sm:gap-4">
                        <div className="flex flex-col justify-start items-start gap-4">
                            <div className="text-zinc-500 text-base font-semibold font-['Inter'] leading-snug">Restaurants</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">Join us</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">Services</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">Blog</div>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-4">
                            <div className="text-zinc-500 text-base font-semibold font-['Inter'] leading-snug">About</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">Who we are</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">Careers</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">Contact Us</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">Report</div>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-4">
                            <div className="text-zinc-500 text-base font-semibold font-['Inter'] leading-snug">Policies</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">Security</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">Terms</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">Sitemap</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">Privacy</div>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-4">
                            <div className="text-zinc-500 text-base font-semibold font-['Inter'] leading-snug">Social</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">LinkedIn</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">Instagram</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">Twitter</div>
                            <div className="text-white text-base font-['Inter'] leading-snug">YouTube</div>
                        </div>
                    </div>

                </div>
                
                <div className="w-full py-2 border-t border-white flex flex-col md:flex-row justify-between items-center">
                    <div className="flex justify-start items-start gap-10">
                        <div className="text-white text-xs font-['Almarai'] leading-[18px]">Privacy Policy</div>
                        <div className="text-white text-xs font-['Almarai'] leading-[18px]">Terms of Conditions</div>
                    </div>
                    <div className="text-white text-xs font-['Almarai'] leading-[18px] mt-4 md:mt-0">Delish Discoveries, LLC. All rights reserved.</div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
