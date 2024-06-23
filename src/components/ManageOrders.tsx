import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { orderStatusUpdate, ordersByRestaurantId } from '../services/orderService';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { capitalizeEachWord } from './commonFunction';

const ManageOrders = () => {
    const { token } = useSelector((state: any) => state.auth);
    const location = useLocation();
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('pending');
    

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await ordersByRestaurantId(token, location?.state?.resId);
            setOrders(response.data.orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleChangeStatus = async (orderId: number, newStatus: string) => {
        const response = await orderStatusUpdate(token, orderId, { status: newStatus });
        if (response?.status === 200) {
            fetchOrders();
            toast.success("order status changed");
        }
        else {
            toast.error("Somethin went wrong")
        }

    };

    const filteredOrders = orders.filter((order: any) => order.orderStatus === selectedStatus);

    return (
        <div className="container mx-auto px-16 mt-[56px] ">
            <ToastContainer />

            <div className='flex justify-between mb-10' style={{ borderBottom: "1px solid #ccc" }}>
                <h1 className='font-bold text-[32px] '>
                    Manage Orders
                </h1>
                <div className='my-10'>

                </div>


                <div className="mb-4">
                    <label htmlFor="orderStatus" className="mr-2">Filter by Status:</label>
                    <select
                        id="orderStatus"
                        className="border border-gray-300 rounded px-2 py-1"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Accepted</option>
                        <option value="delivered">Dispatch</option>
                        <option value="dispatch">Dispatch</option>
                        <option value="rejected">Declined</option>
                    </select>
                </div>

            </div>

            <h1 className='font-bold text-lg text-left mb-4'>
                {capitalizeEachWord(selectedStatus || '')} Orders
            </h1>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
                {filteredOrders.map((order: any, index: number) => (
                    <div key={order._id} className="border border-gray-300 p-6  text-left rounded-[24px]  " style={{ "height": "max-content" }}>

                        <div className='flex justify-between mb-2'>
                            <h2 className="text-base font-bold text-[#ff6d03]">Order # {index + 1}</h2>
                            <p className='text-[#D0AF00]'>{order.orderStatus}</p>
                        </div>

                        <div className='flex mb-2 my-4'>
                            <p className='text-lg font-bold'>{capitalizeEachWord(order?.userId?.username || '')}</p>
                        </div>

                        <div className='flex mb-2 my-4'>
                            <div className='mr-2'>
                                <img className='w-4' src="/images/phone.png" alt="Location" />
                            </div>
                            <p className='text-base'>{order?.userId?.phone}</p>

                        </div>

                        <div className='flex mb-2 my-4'>
                            <div className='mr-2'>
                                <img className='w-6' src="/images/loclogo.png" alt="Location" />
                            </div>
                            <p className='text-base'>{order?.checkoutAddress?.googleAddress.slice(0, 25)}...</p>

                        </div>

                        <hr className='my-4' />

                        <ul className=''>
                            {order.foodItems.map((item: any) => (
                                <li key={item._id} className='flex justify-between my-4'>
                                    <div className='flex space-x-4'>
                                        <img src={item?.dishImage} className='w-[48px] h-10 rounded-lg' />
                                        <p className='my-2 text-base'>
                                            {capitalizeEachWord(item.dishname || '')}
                                        </p>
                                    </div>

                                    <p className='my-2 text-base'>
                                        ₹{item.price}  × {item.quantity}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <hr className='my-4' />


                        <div className='flex justify-between mb-6'>
                            <p className='font-bold text-lg'>Total Amount</p>
                            <p className='font-bold text-lg'>₹{order.totalPrice}</p>

                        </div>



                        {
                            order?.orderStatus === "pending" ? (
                                <div className='flex justify-end gap-2'>
                                    <button
                                        className="flex-1 bg-white text-orange-500 border border-orange-500 px-6 py-2 rounded-full hover:bg-orange-500 hover:text-white focus:outline-none focus:bg-orange-500 focus:text-white"
                                        onClick={() => {
                                            handleChangeStatus(order.id, 'rejected')
                                        }}
                                    >Decline</button>
                                    <button onClick={() => {
                                        handleChangeStatus(order.id, 'confirmed')
                                    }} className="flex-1 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 focus:outline-none focus:bg-orange-600 ">Accept</button>
                                </div>
                            ) : null
                        }



                        {
                            order?.orderStatus === "confirmed" ? (
                                <button onClick={() => {
                                    handleChangeStatus(order.id, 'delivered')
                                }} className=" mr-4 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 focus:outline-none focus:bg-orange-600 ">Dispatch</button>
                            ) : null}

                        {/* <select
                            className="mt-2 border border-gray-300 rounded px-2 py-1"
                            value={order.orderStatus}
                            onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="delivered">Delivered</option>
                            <option value="rejected">Reject</option>
                        </select> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageOrders;
