import React from 'react';

const MainService = () => {
    return (
        <div className='px-4 md:px-20 lg:px-40'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl mb-6 mt-6 lg:mb-10 lg:mt-10 font-bold'>Explore the Best In Pune</h1>
            <div className='flex flex-wrap lg:flex-nowrap justify-center mt-4 mx-auto gap-5'>
                <div className="w-full sm:w-1/2 lg:w-1/3 rounded overflow-hidden shadow-lg mb-8">
                    <img src={"https://desibaniye.com/wp-content/uploads/2022/02/chole-chawal.jpg"} className="w-full" alt="Order Online" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-lg md:text-xl lg:text-2xl mb-2 text-[#FF6D03]">Order Online</div>
                        <p className="text-gray-700 text-base">Stay home and order to your doorstep</p>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 rounded overflow-hidden shadow-lg mb-8">
                    <img src={"https://assets-global.website-files.com/6408d629de5aef8ce5e31f88/6447c134d057b24092dbb5e9_night-themed-blog.webp"} className="w-full" alt="Dining" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-lg md:text-xl lg:text-2xl mb-2 text-[#FF6D03]">Dining</div>
                        <p className="text-gray-700 text-base">View the city's favourite venues</p>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 rounded overflow-hidden shadow-lg mb-8">
                    <img src={"https://static01.nyt.com/images/2023/01/07/multimedia/07safrica-nightlife-3-1-bfb5/07safrica-nightlife-3-1-bfb5-videoSixteenByNine3000.jpg?year=2023&h=1688&w=3000&s=871cfd5c2617692a407b057889a0becfc59b9c5ced99fff2b9322a1dbd00f856&k=ZQJBKqZ0VN&tw=1"} className="w-full" alt="Nightlife and Clubs" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-lg md:text-xl lg:text-2xl mb-2 text-[#FF6D03]">Nightlife and Clubs</div>
                        <p className="text-gray-700 text-base">Explore the city's top nightlife</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainService;
