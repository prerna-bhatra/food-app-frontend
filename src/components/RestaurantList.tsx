import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchByDishName } from '../services/restaurentService';

const RestaurantList = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { token } = useSelector((state: any) => state.auth);
    const [restaurants, setRestaurants] = useState<any[]>([]);

    useEffect(() => {
        restaurantList();
    }, []);

    const restaurantList = async () => {
        const response: any = await searchByDishName(token, location.state.dishname);
        if (response.status === 200) {
            setRestaurants(response.data.restaurants);
        }
    };

    return (
        <div className="container mx-auto mt-10 px-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
                {restaurants.map((restaurant) => (
                    <div onClick={() => {
                        navigate("/restaurant", {
                            state: {
                                resId: restaurant.id
                            }
                        })
                    }} key={restaurant.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        {restaurant.Menus.length > 0 && (
                            <img
                                src={restaurant.Menus[0].dishImage}
                                alt={restaurant.Menus[0].dishname}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                            <p className="text-gray-600">{restaurant.completeAddress}</p>
                            <div className="mt-2">
                                <span className="text-gray-800 font-bold">Contact: </span>
                                {restaurant.contactNumber}
                            </div>
                            {restaurant.Menus.length > 0 && (
                                <div className="mt-2 flex justify-between items-center">
                                    <span className="text-gray-600">
                                        {restaurant.Menus[0].dishname}
                                    </span>
                                    <span className="text-gray-600">
                                        ₹{restaurant.Menus[0].price}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RestaurantList;
