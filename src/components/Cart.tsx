import React from 'react';

const Cart = (props: any) => {
    const { items } = props;
    return (
        <div>
            {
                items.length > 0 ? (
                    <div className='max-h-96 overflow-y-scroll p-4'>
                        <p className='text-center mb-2 font-bold'>Your Cart</p>
                        {
                            items.map((item: any) => (
                                <div key={item.id} className='mb-4 flex items-center'>
                                    <img className='w-1/4 mr-4' src={item.dishImage} alt={item.dishName} />
                                    <div>
                                        <p className='font-bold'>{item.dishname}</p>
                                        <p className='text-gray-600'>₹{item.price}</p>
                                    </div>
                                </div>
                            ))
                        }
                        <button className='w-full bg-green-800 text-white text-2xl'>Checkout</button>
                    </div>
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
