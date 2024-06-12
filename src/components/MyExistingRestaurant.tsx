import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { myRestaurants } from '../services/restaurentService';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

    const goToUpdateRestaurant = (resId: number) => {
        naviugate("/partner-with-us", {
            state: { resId }
        })
    }

    return (
        <div className="container mx-auto flex  flex-col px-40"> {/* Added flex-col class */}
            <ToastContainer />
            <div className='mt-4'>
                <div className='flex justify-between border-b-2 mb-4'>
                    <h1 className="text-2xl font-bold mb-6 text-left flex-grow">Manage Outlets</h1>

                </div>
                <div className='flex justify-between'>
                    <div className='w-[1184px]'>
                    <h1 className="text-2xl font-bold mb-6 text-left">All Outlets</h1>

                    </div>
                    <input
                        //   onChange={(e) => handleSearch(e.target.value)}
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300  w-[469px]
                        px-[32px] py-4 rounded-[40px] 
                        focus:outline-none mt-5
                        md:mt-0  
                        h-[54px]::placeholder text-[16px] text-black"
                    />                </div>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {myRestaurantList.length > 0 ? (
                    <>
                        {myRestaurantList.map((restaurant) => (
                            <div

                                key={restaurant.id}
                                className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition duration-300"
                            >
                                <div className='flex flex-justify-content'>
                                    <p className="text-gray-600 mr-2">ID: {restaurant.id} | </p>
                                    <h2 className="text-xl font-semibold mb-2">
                                        {restaurant.name}</h2>
                                </div>
                                <div className='flex flex justify-content'>
                                    <button
                                        onClick={() => {
                                            goToUpdateRestaurant(restaurant.id)
                                        }}
                                        className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                    >Restaurant</button>
                                    <button
                                        onClick={() => {
                                            naviugate("/set-menu", {
                                                state: { resId: restaurant.id }
                                            })
                                        }}
                                        className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                    >Menu </button>
                                    <button
                                        onClick={() => {
                                            naviugate("/manage-orders", {
                                                state: { resId: restaurant.id }
                                            })
                                        }}
                                        className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                    >Orders </button>
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
