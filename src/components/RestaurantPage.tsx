import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { restaurantById } from '../services/restaurentService';
import Cart from './Cart';
import Location from './Location';
import { capitalizeEachWord } from './commonFunction';

const RestaurantPage = () => {
    const location = useLocation();
    const { token } = useSelector((state: any) => state.auth);
    const [restaurant, setRestaurant] = useState<any>(null);
    const [menus, setMenus] = useState<any>(null);

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
            setRestaurant(response?.data?.restaurant);
            setMenus(response?.data?.menus)
        }
    };



    const addToCart = (menu: any) => {        
        const existingItemIndex = selectedItems.findIndex(item => item._id === menu._id);

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

    const { name, completeAddress, Menus, city, cuisines = [] } = restaurant;
    const firstMenuImage = restaurant?.restaurantImages?.length ? restaurant?.restaurantImages[0] : '';

    return (
        <div className="container md:mx-auto  md:px-40">
            {firstMenuImage && (
                <img
                    src={firstMenuImage}
                    alt="Restaurant"
                    className="w-full h-[473px] object-cover mb-6"
                />
            )}
            <div className="bg-white  rounded-lg ">
                <div className='flex justify-between'>
                    <div className='flex'>
                        <h2 className="text-[32px] font-bold text-left mb-1">{capitalizeEachWord(name)}</h2>
                        <img src={"/images/ratings.png"} className='h-6 ml-4 mt-4' />
                    </div>

                    <p><span className='text-[#FF6D03]'>Open Now</span>  7.00 am - 10.00 pm <span></span></p>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <p className="text-gray-700 mb-2 text-left">{capitalizeEachWord(completeAddress)} , {capitalizeEachWord(city)}</p>
                        <p className='text-gray-700  text-left'>{cuisines?.join(" , ")}</p>
                    </div>
                    <div className='flex gap-[12px]'>
                        <img className='h-[54px] w-[154x] cursor-pointer' src={"/images/save.png"} />
                        <img className='h-[54px] w-[154x] cursor-pointer' src={"/images/share.png"} />
                    </div>
                </div>


                <div className="border-b border-[#888888] my-10 "></div>

            </div>

            <div className="mt-8 md:flex rounded-lg">
                <div className=" md:grid md:gap-6 grid-cols-1 w-[680px] ">
                    {menus && menus.length > 0 ? (
                        menus.map((menu: any) => (
                            <div key={menu._id} className="bg-white relative rounded-[32px] shadow  flex justify-start h-[235px]">
                                <img
                                    src={menu.dishImage}
                                    alt={menu.dishname}
                                    className="w-[269px] h-full object-cover mb-4 rounded-tl-lg  rounded-bl-lg rounded"
                                />

                                <div className='py-6 px-8 flex-grow'>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2 text-left">{capitalizeEachWord(menu.dishname)}</h4>
                                        <div className='flex justify-between'>
                                            <p className="text-gray-600 mb-2 text-left" >₹{menu.price} for one</p>
                                            <img src={"/images/ratings.png"} className='h-6 ml-4 mt-4' />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 right-4">
                                        <button
                                            onClick={() => addToCart(menu)}
                                            className="bg-[#FF6D03] text-white p-4 rounded-[38px]"
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

                <div className="w-[480px] h-1/4 ml-8  bg-transparent mt-6  ">
                    <div className='w-full'>
                        <div className='flex space-x-2 justify-between rounde-lg mb-3 shadow py-6 px-8 rounded-lg' >
                            <div className='flex '>
                                <div>
                                    <p className='font-bold text-base'> Address</p>
                                    <img className='w-6' src='/images/loclogo.png' />
                                </div>
                                <div className='mx-2'>
                                    <div className=''>
                                        {
                                            checkoutAddress ? (
                                                <p className='text-left'>
                                                    {checkoutAddress.houseName + ", "}
                                                    {checkoutAddress.area}
                                                    {/* {checkoutAddress.landmark + checkoutAddress.landmark ? ", " : ""} */}
                                                    {/* {checkoutAddress.googleAddress} */}
                                                </p>
                                            ) : (
                                                <p>No Address Selected</p>
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

                    <div className='border mt-2 rounded-lg shadow'>
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
                {/* <h3 className="text-2xl font-semibold mb-4">Reviews</h3> */}
                <p className="text-gray-700"> {/* Add review content here */} </p>
            </div>
        </div>
    );
};

export default RestaurantPage;
