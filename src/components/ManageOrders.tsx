import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { orderStatusUpdate, ordersByRestaurantId } from '../services/orderService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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
        const response = await orderStatusUpdate(token, orderId, {status:newStatus});
        console.log({ response });
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
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <label htmlFor="orderStatus" className="mr-2">Filter by Status:</label>
                <select
                    id="orderStatus"
                    className="border border-gray-300 rounded px-2 py-1"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="delivered">Delivered</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {filteredOrders.map((order: any) => (
                    <div key={order.id} className="border border-gray-300 p-4 rounded-md text-left">
                        <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
                        <ul>
                            {order.foodItems.map((item: any) => (
                                <li key={item.id}>
                                    {item.dishname} - ${item.price} (Qty: {item.quantity})
                                </li>
                            ))}
                        </ul>
                        <p>Total Price: ${order.totalPrice}</p>
                        <p>Address: {order.checkoutAddress.googleAddress}</p>
                        <p>Status: {order.orderStatus}</p>
                        <select
                            className="mt-2 border border-gray-300 rounded px-2 py-1"
                            value={order.orderStatus}
                            onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="delivered">Delivered</option>
                            <option value="rejected">Reject</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageOrders;
