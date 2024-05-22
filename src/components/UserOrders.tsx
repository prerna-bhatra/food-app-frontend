import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ordersByUserId } from '../services/orderService';

const UserOrders = () => {
    const { token } = useSelector((state: any) => state.auth);
    const [orderHistoryList, setOrderHistoryList] = useState([]);

    useEffect(() => {
        orderHistory();
    }, []);

    const orderHistory = async () => {
        const response = await ordersByUserId(token);
        if (response.status === 200) {
            setOrderHistoryList(response?.data?.orders);
        }
    };

    return (
        <div className="container mx-auto mt-10 p-6">
            <h1 className="text-3xl font-bold mb-6">Order History</h1>
            {orderHistoryList && orderHistoryList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {orderHistoryList.map((order: any) => (
                        <div key={order.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Order #{order.id}</h2>
                                <p className={`text-lg font-semibold ${order.orderStatus === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                                </p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">Food Items:</h3>
                                {order.foodItems.map((item: any) => (
                                    <div key={item.id} className="flex items-center mb-2">
                                        <img className="w-12 h-12 object-cover rounded mr-4" src={item.dishImage} alt={item.dishname} />
                                        <div>
                                            <p className="font-semibold">{item.dishname}</p>
                                            <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold">Total Price: ₹{order.totalPrice}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">You have no order history.</p>
            )}
        </div>
    );
};

export default UserOrders;
