import React, { useState } from 'react'
import Location from './Location'; // Import the Location component
import { searchMenuOrRestaurant } from '../services/restaurentService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CommonSearch = () => {
    const { token, user } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
    const [restaurants, setRestaurants] = useState<any>();
    const [menus, setMenus] = useState<any>();
    const [addressPart, setAddressPart] = useState<string>(''); // State to store the address part
    const handleAddressUpdate = (address: string) => {
        setAddressPart(address);
    };

    const handleSearch = async (searchWord: string) => {
        setIsOpen(false)
        if (searchWord.length > 0) {
            const response: any = await searchMenuOrRestaurant(token, searchWord);
            if (response.status === 200) {
                setRestaurants(response?.data?.restaurants);
                const uniqueMenus = response?.data?.menus.filter((menu: any, index: number, self: any[]) => (
                    index === self.findIndex((m: any) => m.dishname === menu.dishname)
                ));
                setMenus(uniqueMenus)
            }
        }
        else {
            setRestaurants([])
            setMenus([])
        }
    }


    return (
        <>
            <div className="">
                <div className="md:flex md:items-center">
                    <input
                        onChange={(e) => handleSearch(e.target.value)}
                        type="text"
                        placeholder="Search your favorite food"
                        className="border border-gray-300 
                                px-[32px] py-4 rounded-[40px] 
                                focus:outline-none mt-5
                                md:mt-0   md:w-auto  flex-grow
                                text-gray-400 text-[16px] text-[#1F1F1F]"
                    />

                    {token && (
                        <div className="relative mt-5 md:mt-0 md:ml-2 w-full md:w-auto">
                            <button
                                className="border border-gray-300 bg-white px-4 py-2 rounded-[40px] focus:outline-none w-full md:w-[201px] h-[54px] flex items-center justify-between"
                                onClick={() => {
                                    setRestaurants([]);
                                    setMenus([]);
                                    setIsOpen(!isOpen);
                                }}
                            >
                                <img src="/images/loclogo.png" alt="Location" />
                                {addressPart}
                                <img src="/images/dropdown.png" alt="Dropdown" />
                            </button>
                            {isOpen && (
                                <div className="absolute top-full mt-2 right-0 bg-white shadow-lg border rounded-[32px] z-10">
                                    <Location onAddressUpdate={handleAddressUpdate} />
                                </div>
                            )}
                        </div>
                    )}
                </div>

               
                
            </div>

            <div className='md:pl-20 md:pr-[200px] z-50 relative '>
                {menus && menus.length > 0 && (
                    <div className=" z-10  w-full mt-2 bg-white  shadow-md  p-1">
                        <ul className="divide-y divide-gray-800">
                            {menus.map((menu: any) => (
                                <li key={menu.id} className="p-2 ">
                                    <div onClick={() => {
                                        setRestaurants([])
                                        setMenus([])
                                        navigate("/restaurant-list", {
                                            state: { dishname: menu.dishname }
                                        })
                                    }} className="block hover:bg-gray-50 cursor-pointer">
                                        <h4 className="text-xl font-semibold">{menu.dishname}</h4>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {restaurants && restaurants.length > 0 && (
                    <div className=" z-10  bg-white  shadow-md ">
                        <ul className="divide-y divide-gray-800">
                            {restaurants.map((restaurant: any) => (
                                <li key={restaurant.id} className="p-2">
                                    <div onClick={() => {
                                        setRestaurants([])
                                        setMenus([])
                                        navigate("/restaurant", {
                                            state: {
                                                resId: restaurant.id
                                            }
                                        })
                                    }} className="block hover:bg-gray-50 cursor-pointer">
                                        <h4 className="text-xl font-semibold">{restaurant.name}</h4>
                                        <p>{restaurant.completeAddress}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default CommonSearch
