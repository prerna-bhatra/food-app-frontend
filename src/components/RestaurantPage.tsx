import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { restaurantById } from '../services/restaurentService';
import Cart from './Cart';
// import Checkout from './Checkout'; // Import the Checkout component

const RestaurantPage = () => {
    const location = useLocation();
    const { token } = useSelector((state: any) => state.auth);
    const [restaurant, setRestaurant] = useState<any>(null);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [cartItems , setCartItems] = useState();

    useEffect(() => {
        fetchRestaurant();
    }, []);

    const fetchRestaurant = async () => {
        const response = await restaurantById(token, location?.state?.resId);
        console.log({ response });

        if (response.status === 200) {
            setRestaurant(response.data.restaurant);
        }
    };

    const addToCart = (menu: any) => {
        setSelectedItems([...selectedItems, menu]);
    };

    if (!restaurant) {
        return <div>Loading...</div>;
    }

    const { name, completeAddress, Menus } = restaurant;
    const firstMenuImage = Menus?.length ? Menus[0].dishImage : '';

    return (
        <div className="container mx-auto mt-10 px-40">
            {firstMenuImage && (
                <img
                    src={firstMenuImage}
                    alt="Restaurant"
                    className="w-full h-64 object-cover mb-8 rounded-lg"
                />
            )}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-3xl font-bold mb-4">{name}</h2>
                <p className="text-gray-700 mb-4">{completeAddress}</p>
            </div>
            <div className="mt-8 flex">
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Menus && Menus.length > 0 ? (
                        Menus.map((menu: any) => (
                            <div key={menu.id} className="bg-white p-4 rounded-lg shadow-md">
                                <img
                                    src={menu.dishImage}
                                    alt={menu.dishname}
                                    className="w-full h-32 object-cover mb-4 rounded-lg"
                                />
                                <div className='flex justify-between'>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">{menu.dishname}</h4>
                                        <p className="text-gray-600 mb-2">₹{menu.price}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => addToCart(menu)}
                                            className="bg-blue-500 text-white py-1 px-3 rounded-lg"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No menu items available.</p>
                    )}
                </div>
                <div className="w-1/4 h-1/4 ml-8 border">
                    <Cart items={selectedItems} />
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
                <p className="text-gray-700"> {/* Add review content here */} </p>
            </div>
        </div>
    );
};

export default RestaurantPage;
