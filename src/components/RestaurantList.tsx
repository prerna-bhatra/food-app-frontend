import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchByDishName } from '../services/restaurentService';
import CommonSearch from './CommonSearch';
import { capitalizeEachWord } from './commonFunction';

const RestaurantList = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { token } = useSelector((state: any) => state.auth);
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [menu , setMenu] = useState<any>([])


    useEffect(() => {
        restaurantList();
    }, []);

    const restaurantList = async () => {
        const response: any = await searchByDishName(token, location.state.dishname);
        if (response.status === 200) {
            setRestaurants(response?.data?.restaurants);
            setMenu(response?.data?.menus)
        }
    };

    return (
        <div className="container  mt-10 px-16">

            <div>
                <CommonSearch />
                <div className="w-full h-[54px] justify-start items-center gap-4 inline-flex mt-4 mb-10">
                    <div className="px-4 py-[15px] bg-white shadow rounded-[40px] justify-start items-center gap-4 flex">
                        <img src='/images/filter.png' className="w-6 h-6 relative" />
                        <div className="justify-start items-center gap-4 flex">
                            <div className="text-zinc-500 text-base   font-normal font-['Inter'] leading-snug ">Filters</div>
                        </div>
                        <div className="px-1.5 bg-orange-500 rounded-[26px] justify-start items-center gap-4 flex">
                            <div className="text-white text-base font-bold font-['Inter'] leading-snug">2</div>
                        </div>
                    </div>
                    <div className="px-4 py-[15px] bg-white shadow rounded-[40px] justify-start items-center gap-4 flex">
                        <div className="justify-start items-center gap-4 flex">
                            <div className="text-zinc-500 text-base font-normal font-['Inter'] leading-snug">Non-Veg</div>
                        </div>
                    </div>
                    <div className="px-4 py-[15px] bg-orange-500 rounded-[40px] justify-start items-center gap-4 flex">
                        <div className="justify-start items-center gap-4 flex">
                            <div className="text-white text-base font-normal font-['Inter'] leading-snug">Pure Veg</div>
                        </div>
                    </div>
                    <div className="px-4 py-[15px] bg-orange-500 rounded-[40px] justify-start items-center gap-4 flex">
                        <div className="justify-start items-center gap-4 flex">
                            <div className="text-white text-base font-normal font-['Inter'] leading-snug">Ratings 3+</div>
                        </div>
                    </div>
                    <div className="px-4 py-[15px] bg-white rounded-[40px] justify-start shadow items-center gap-4 flex">
                        <div className="justify-start items-center gap-4 flex">
                            <div className="text-zinc-500 text-base font-normal font-['Inter']  leading-snug">Beverage</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer ">
                {restaurants.map((restaurant) => (
                    <div
                        onClick={() => { navigate("/restaurant", { state: { resId: restaurant._id } }) }}
                        key={restaurant._id}
                        className="bg-white shadow-md rounded-[32px] overflow-hidden">
                        {restaurant?.restaurantImages?.length > 0 && (
                            <img
                                src={restaurant.restaurantImages[0]}
                                // alt={restaurant.Menus[0].dishname}
                                className="w-full h-[333px] object-cover"
                            />
                        )}
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-left">{capitalizeEachWord(restaurant.name)}</h3>
                            {menu.length > 0 && (
                                <div className="mt-2 flex justify-between items-center ">
                                    <span className="text-[#888888] text-base">
                                        {capitalizeEachWord(menu[0].dishname)}
                                    </span>
                                    <span className="text-[#888888] text-base">
                                        ₹{menu[0].price} for one
                                    </span>
                                </div>
                            )}
                            <div className='flex justify-between items-center'>
                                <p className="text-[#888888] text-base text-left">{capitalizeEachWord(restaurant.completeAddress)}</p>
                                <img src={"/images/ratings.png"} alt="Ratings" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default RestaurantList;
