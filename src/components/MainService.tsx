import React from 'react'

const MainService = () => {
    return (
        <div className='flex justify-between mt-4 mx-auto'>
            <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mb-8 ">
                <img src={"https://desibaniye.com/wp-content/uploads/2022/02/chole-chawal.jpg"} className="w-half" alt="Widget" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Order Online</div>
                    <p className="text-gray-700 text-base">Stay home and order to your doorstep</p>
                </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mb-8">
                <img src={"https://assets-global.website-files.com/6408d629de5aef8ce5e31f88/6447c134d057b24092dbb5e9_night-themed-blog.webp"} className="w-half" alt="Widget" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Dining</div>
                    <p className="text-gray-700 text-base">View the city's favourite venueus</p>
                </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mb-8">
                <img src={"https://static01.nyt.com/images/2023/01/07/multimedia/07safrica-nightlife-3-1-bfb5/07safrica-nightlife-3-1-bfb5-videoSixteenByNine3000.jpg?year=2023&h=1688&w=3000&s=871cfd5c2617692a407b057889a0becfc59b9c5ced99fff2b9322a1dbd00f856&k=ZQJBKqZ0VN&tw=1"} className="w-half" alt="Widget" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Nighlife and Clubs</div>
                    <p className="text-gray-700 text-base">Explore the city's top nighlife</p>
                </div>
            </div>
        </div>

    )
}

export default MainService
