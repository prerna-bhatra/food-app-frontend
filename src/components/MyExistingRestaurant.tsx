import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { myRestaurants } from '../services/restaurentService';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { capitalizeEachWord } from './commonFunction';

const MyExistingRestaurant = () => {
    const naviugate = useNavigate();
    const { token } = useSelector((state: any) => state.auth);
    const [myRestaurantList, setMyRestaurantList] = useState<Array<any>>([])

    useEffect(() => {
        existingRestaurants()
    }, [])

    const existingRestaurants = async () => {
        const response: any = await myRestaurants(token);
        if (response.error) {
            toast.error(response.error.message)
        }

        if (response.status === 200) {
            setMyRestaurantList(response.data.restaurants)
        }
    }

    console.log({ myRestaurantList });


    const goToUpdateRestaurant = (resId: number) => {
        naviugate("/partner-with-us", {
            state: { resId }
        })
    }

    return (
        <div className="container  flex  flex-col xl:px-16 px-6"> {/* Added flex-col class */}
            <ToastContainer />
            <div className='mt-16'>

                <h1 className="text-2xl font-bold  text-left flex-grow">Manage Outlets</h1>

                <div className='flex justify-between border-b-2 my-7'>
                </div>

                <div className='md:flex md:justify-between mb-7'>
                    <div className='w-[1184px]'>
                        <h1 className="text-2xl font-bold mb-6 text-left">All Outlets</h1>

                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300  md:w-[469px] xs:w-full
                        px-[32px] py-4 rounded-[40px] 
                        focus:outline-none mt-5
                        md:mt-0  
                        h-[54px]::placeholder text-[16px] text-black"
                    />
                </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {myRestaurantList.length > 0 ? (
                    <>
                        {myRestaurantList.map((restaurant , index) => (
                            <div

                                key={index}
                                className="bg-white shadow-md rounded-[32px] hover:shadow-lg transition duration-300"
                            >
                                {
                                    restaurant?.restaurantImages && restaurant?.restaurantImages?.length > 0 ? (
                                        <img className='h-[333px] w-full rounded-t-[32px]' src={restaurant?.restaurantImages[0]} />
                                    ) : (
                                        <img className='h-[333px] w-full' src={"/images/noimage.jpg"} />
                                    )
                                }
                                <div className=' p-6'>
                                    <h2 className="text-2xl font-bold mb-3 text-left">
                                        {capitalizeEachWord(restaurant.name)}</h2>
                                    <div className='flex mb-3 '>
                                        <img src='/images/phone.png' className='h-4 w-4 mr-2 mt-1' />
                                        <p className='text-base'>{restaurant?.contactNumber}</p>
                                    </div>

                                    <div className='flex mb-6'>
                                        <img src='/images/loclogo.png' className='h-4 w-4 mr-2 mt-1' />
                                        <p className='text-base'>{capitalizeEachWord(restaurant?.completeAddress)}</p>
                                    </div>

                                    <div className="flex w-full space-x-2 ">
                                        <button
                                            onClick={() => {
                                                goToUpdateRestaurant(restaurant._id);
                                            }}
                                            className="flex-1 text-orange-500 border border-orange-500 px-4 py-3 rounded-full focus:outline-none"
                                        >
                                            <p className="text-base"> Edit Info</p>
                                        </button>
                                        <button
                                            onClick={() => {
                                                naviugate("/set-menu", {
                                                    state: { resId: restaurant._id, restaurantImages: restaurant?.restaurantImages }
                                                });
                                            }}
                                            className="flex-1 text-orange-500 border border-orange-500 px-4 py-3 rounded-full focus:outline-none"
                                        >
                                            <p className="">Menu</p>
                                        </button>
                                        <button
                                            onClick={() => {
                                                naviugate("/manage-orders", {
                                                    state: { resId: restaurant._id }
                                                });
                                            }}
                                            className="flex-1 text-white px-4 py-3 rounded-full bg-orange-500 focus:outline-none"
                                        >
                                            <p className="">Orders</p>
                                        </button>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default MyExistingRestaurant
