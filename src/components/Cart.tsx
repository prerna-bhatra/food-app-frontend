import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { createOrder } from '../services/orderService';
import { useSelector } from 'react-redux';

const Cart = (props: any) => {
    const { token } = useSelector((state: any) => state.auth);
    const navigate = useNavigate()
    const { items } = props;
    const handleIncrement = (index: number) => {
        const updatedItems = [...items];
        updatedItems[index].quantity++;
        props.setCartItems(updatedItems);
    };

    const handleDecrement = (index: number) => {
        const updatedItems = [...items];
        if (updatedItems[index].quantity > 1) {
            updatedItems[index].quantity--;
            props.setCartItems(updatedItems);
        }
    };

    const handleDelete = (index: number) => {
        props.onDeleteItem(index);
    };

    const totalPrice = items.reduce((total: number, item: any) => {
        return total + item.price * item.quantity;
    }, 0);

    const placeOrder = async () => {
        if (!token) {
            toast.error("please login to checkout");
            return
        }

        if (!props.checkoutAddress) {
            toast.error("please select an address to checkout");
            return
        }
        console.log({ checkoutAddress: props.checkoutAddress });
        const response: any = await createOrder({
            totalPrice,
            checkoutAddress: props.checkoutAddress,
            foodItems: items,
            restaurantId: props.restaurantId,
            paymentMethod: 'COD'
        }, token)
        console.log({ response });
        if (response.status === 200) {
            toast.success("order created succefully");
            navigate("/my-orders")
        }
        else {

        }

    }

    return (
        <div>
            {
                items.length > 0 ? (
                    <>
                        <ToastContainer />
                        <div className='md:max-h-96 overflow-y-scroll p-4'>
                            <p className='text-center mb-2 font-bold'>Your Cart</p>
                            {
                                items.map((item: any, index: number) => (
                                    <div key={item.id} className='mb-4 flex '>
                                        <img className='w-1/4 mr-4' src={item.dishImage} alt={item.dishName} />
                                        <div>
                                            <p className='font-bold'>{item.dishname}</p>
                                            <p className='text-gray-600'>₹{item.price}</p>
                                            <div className="flex items-center">
                                                <button onClick={() => handleDecrement(index)} className="text-gray-500 px-2"><FaMinus /></button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button onClick={() => handleIncrement(index)} className="text-gray-500 px-2"><FaPlus /></button>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => handleDelete(index)} className="text-red-500 px-2 right"><FaTrash /></button>

                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-xl font-semibold'>Total Price:</p>
                            <p className='text-xl font-semibold'>₹{totalPrice}</p>
                        </div>
                        <button
                            onClick={() => {
                                // navigate("/checkout")
                                placeOrder()
                            }}
                            className='w-full bg-green-800 text-white text-2xl p-3 rounded-[10px]'>Place Order</button>
                    </>
                ) : (
                    <div className='p-10'>
                        <img src='https://cdn.pixabay.com/photo/2014/04/02/10/53/shopping-cart-304843_640.png' alt='Empty Cart' />
                        <p className='mt-4'>Your cart is empty</p>
                    </div>
                )
            }
        </div>
    );
}

export default Cart;
