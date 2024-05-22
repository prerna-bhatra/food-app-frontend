import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { restaurantById } from '../services/restaurentService';
import Cart from './Cart';
import Location from './Location';

const RestaurantPage = () => {
    const location = useLocation();
    const { token } = useSelector((state: any) => state.auth);
    const [restaurant, setRestaurant] = useState<any>(null);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    const [isLocationOpen, setLocationOpen] = useState(false);
    const [isCartOpen, setCartOpen] = useState(false);
    const [isPaymentOpen, setPaymentOpen] = useState(false);

    const toggleLocation = () => {
        setLocationOpen(!isLocationOpen);
    };

    const toggleCart = () => {
        setCartOpen(!isCartOpen);
    };

    const togglePayment = () => {
        setPaymentOpen(!isPaymentOpen);
    };

    useEffect(() => {
        fetchRestaurant();
    }, []);

    const fetchRestaurant = async () => {
        const response = await restaurantById(token, location?.state?.resId);
        if (response.status === 200) {
            setRestaurant(response.data.restaurant);
        }
    };

    const addToCart = (menu: any) => {
        const existingItemIndex = selectedItems.findIndex(item => item.id === menu.id);

        if (existingItemIndex !== -1) {
            const updatedItems = [...selectedItems];
            updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity: updatedItems[existingItemIndex].quantity + 1
            };
            setSelectedItems(updatedItems);
        } else {
            setSelectedItems([...selectedItems, { ...menu, quantity: 1 }]);
        }
    };

    const handleSetCartItems = (updatedItems: any) => {
        setSelectedItems(updatedItems);
    };

    const handleDelete = (index: number) => {
        const updatedItems: any = [...selectedItems];
        updatedItems.splice(index, 1);
        setSelectedItems(updatedItems);
    };

    const [checkoutAddress, setCheckoutAddress] = useState<any>();

    if (!restaurant) {
        return <div>Loading...</div>;
    }

    const { name, completeAddress, Menus } = restaurant;
    const firstMenuImage = Menus?.length ? Menus[0].dishImage : '';

    return (
        <div className="container md:mx-auto mt-10 md:px-40">
            {firstMenuImage && (
                <img
                    src={firstMenuImage}
                    alt="Restaurant"
                    className="w-full h-64 object-cover mb-8 rounded-lg"
                />
            )}
            <div className="bg-white  md:p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-3xl font-bold mb-4">{name}</h2>
                <p className="text-gray-700 mb-4">{completeAddress}</p>
            </div>
            <div className="mt-8 md:flex">
                <div className="md:flex-grow md:grid  md:grid-cols-2 md:gap-6 sm:grid-cols-1 ">
                    {Menus && Menus.length > 0 ? (
                        Menus.map((menu: any) => (
                            <div key={menu.id} className="bg-white md:p-4 rounded-lg shadow-md sm:p-4">
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
                                    <div className="flex items-center ">
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

                <div className="md:w-1/4 h-1/4 ml-8  bg-transparent mt-6 ">
                    <div className='w-full'>
                        <div className='flex space-x-2 justify-between'>
                            <div className='flex '>
                                <div>
                                    <img src='/images/loclogo.png' />
                                </div>
                                <div className='mx-2'>
                                    <div className=''>
                                        {
                                            checkoutAddress ? (
                                                <p>
                                                    {checkoutAddress.houseName + ", "}
                                                    {checkoutAddress.area}
                                                    {/* {checkoutAddress.landmark + checkoutAddress.landmark ? ", " : ""} */}
                                                    {/* {checkoutAddress.googleAddress} */}
                                                </p>
                                            ) : (
                                                <p className='font-bold'>Current Address</p>
                                            )
                                        }


                                    </div>
                                </div>
                            </div>

                            <button onClick={toggleLocation} className="mb-2">
                                <img src='/images/dropdown.png' />
                            </button>
                        </div>

                        {isLocationOpen && <Location setCheckoutAddress={setCheckoutAddress} />}
                    </div>

                    <div className='border mt-2'>
                        <Cart
                            items={selectedItems}
                            setCartItems={handleSetCartItems}
                            onDeleteItem={handleDelete}
                            checkoutAddress={checkoutAddress}
                            restaurantId={location?.state?.resId}
                        />
                    </div>
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
