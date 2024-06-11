import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { orderStatusUpdate, ordersByRestaurantId } from '../services/orderService';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

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
        <div className="container mx-auto px-40 mt-4">
            <ToastContainer />

            <div className='flex justify-between mb-4' style={{ borderBottom: "1px solid #ccc" }}>
                <div>
                    <h1 className='font-bold'>
                        Manage Orders
                    </h1>
                </div>
                {/* <div>
                    <input className='border ' placeholder='Search'/>
                </div> */}
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
                        <option value="delivered">Delivered</option>
                        <option value="rejected">Declined</option>
                    </select>
                </div>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {filteredOrders.map((order: any) => (
                    <div key={order.id} className="border border-gray-300 p-4 rounded-md text-left">

                        <div className='flex justify-between mb-2'>
                            <h2 className="text-lg font-semibold text-[#ff6d03]">Order # {order.id}</h2>
                            <p className='text-[#D0AF00]'>{order.orderStatus}</p>
                        </div>

                        <div className='flex mb-2'>
                            <div className='mr-2'>
                                <img src="/images/loclogo.png" alt="Location" />
                            </div>
                            <p>{order.checkoutAddress.googleAddress}</p>

                        </div>

                        <ul className='border p-4 mb-4'>
                            {order.foodItems.map((item: any) => (
                                <li key={item.id} className='flex justify-between'>

                                    <p>
                                        {item.dishname}
                                    </p>
                                    <p>
                                        ₹{item.price}  × {item.quantity}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <div className='flex justify-between'>
                            <p>Total Amount</p>
                            <p>₹{order.totalPrice}</p>

                        </div>

                        {
                            order?.orderStatus === "pending" ? (
                                <div className='flex justify-end'>
                                    <button
                                        className="mr-4 bg-white text-orange-500 border border-orange-500 px-6 py-2 rounded-full hover:bg-orange-500 hover:text-white focus:outline-none focus:bg-orange-500 focus:text-white"
                                        onClick={() => {
                                            handleChangeStatus(order.id, 'rejected')
                                        }}
                                    >Decline</button>
                                    <button onClick={() => {
                                        handleChangeStatus(order.id, 'confirmed')
                                    }} className="mr-4 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 focus:outline-none focus:bg-orange-600 ">Accept</button>
                                </div>
                            ) : null
                        }



                        {
                            order?.orderStatus === "confirmed" ? (
                                <button onClick={() => {
                                    handleChangeStatus(order.id, 'delivered')
                                }} className=" mr-4 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 focus:outline-none focus:bg-orange-600 ">Delivered</button>
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
