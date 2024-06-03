import React, { useState, useEffect } from 'react';
import socket from './socket';
import { useSelector } from 'react-redux';
import { orderAddressUpdate } from './services/orderService';

interface Message {
    sender: 'user' | 'bot';
    message: string;
    orders?: any[]; // Adding orders property to the Message interface
    userSavedAddress?: any[];
}



const Chatbot: React.FC = () => {
    const { token } = useSelector((state: any) => state.auth);
    const savedAddress = useSelector((state: any) => state.address);
    console.log({ savedAddress });


    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    useEffect(() => {
        socket.on('botReply', (data: { text?: string, custom?: any, orders?: any[] }[]) => {
            let botMessages: Message[] = [];


            console.log({ data });

            if (!data.length) {
                const message: Message = {
                    sender: 'bot',
                    message: 'orders not found or something went wrong', // No message for custom data
                };
                botMessages.push(message)

            }
            data.forEach((msg) => {
                if (msg.text) {
                    // If bot sends a text message
                    const message: Message = {
                        sender: 'bot',
                        message: msg.text,
                    };
                    botMessages.push(message);
                    if (msg.text === "Please select address from below") {
                        const message: Message = {
                            sender: 'bot',
                            message: '',
                            userSavedAddress: savedAddress?.addresses,
                        };
                        botMessages.push(message);
                    }
                } else if (msg.custom) {
                    // If bot sends custom data
                    const message: Message = {
                        sender: 'bot',
                        message: msg?.custom?.message, // No message for custom data
                        orders: msg?.custom?.orders, // Store orders in the message
                    };

                    botMessages.push(message);
                }
            });
            setMessages((prevMessages) => [...prevMessages, ...botMessages]);
            setIsTyping(false); // Bot has finished typing

        });


        return () => {
            socket.off('botReply');
        };
    }, []);

    const [isTyping, setIsTyping] = useState(false);

    socket.on('botTyping', () => {
        setIsTyping(true);
    });

    socket.on('botStopTyping', () => {
        setIsTyping(false);
    });

    const sendMessage = () => {
        if (!input) return;
        setIsTyping(true)
        const userMessage: Message = { sender: 'user', message: input };
        setMessages([...messages, userMessage]);
        const botMessages: Message[] = [];
        if (input.includes("cancel") || input.includes("change")) {
            if (!selectedOrder) {
                const message: Message = {
                    sender: 'bot',
                    message: 'Please select an order ',
                };
                botMessages.push(message);
                setMessages((prevMessages) => [...prevMessages, ...botMessages]);
                return
            }
            if (!token) {
                const message: Message = {
                    sender: 'bot',
                    message: 'Please login first ',
                };
                botMessages.push(message);
                setMessages((prevMessages) => [...prevMessages, ...botMessages]);
                return
            }

            

            socket.emit('sendMessage', { message: input, order_id: selectedOrder, token });

        }
        else {
            if (input.includes("order")) {
                if (!token) {
                    const message: Message = {
                        sender: 'bot',
                        message: 'Please login first ',
                    };
                    botMessages.push(message);
                    setMessages((prevMessages) => [...prevMessages, ...botMessages]);
                    return
                }
            }

            socket.emit('sendMessage', { message: input, token });

        }
        setInput('');
    };

    const handleOrderClick = (order: any) => {
        const userMessage: Message = { sender: 'user', message: order.id };
        setSelectedOrder(order.id);
        setMessages([...messages, userMessage]);
        const message: Message = {
            sender: 'bot',
            message: 'your order is ' + order.orderStatus,
        };
        const botMessages: Message[] = [];
        botMessages.push(message);
        setMessages((prevMessages) => [...prevMessages, ...botMessages]);
        // socket.emit('sendMessage', { message: order.id });
    };

    const [selectedAddress, setSelectedAddress] = useState<any>();


    const handleAddressClick = async (newAddress: any) => {
        setIsTyping(true); // Bot has started typing
        console.log({ newAddress });
        const userMessage: Message = { sender: 'user', message: newAddress.area };
        setMessages([...messages, userMessage]);
        setSelectedAddress(newAddress);
        //  call api here 
        const response = await orderAddressUpdate(token, selectedOrder, { newAddress })
        console.log({ response, msg: response?.data?.message });
        const message: Message = {
            sender: 'bot',
            message: response?.data?.message,
        };
        const botMessages: Message[] = [];
        botMessages.push(message);
        setMessages((prevMessages) => [...prevMessages, ...botMessages]);
        setIsTyping(false); // Bot has finished typing

    }

    return (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg" style={{"width":"400px"}} >
            <h2 className="text-2xl mb-4">Chatbot</h2>
            <div className="border border-gray-300 p-4 h-96 overflow-y-auto mb-4">
                <div className="text-left">
                    <p><strong>Bot:</strong> Type something</p>
                </div>
                {messages.map((msg, index) => (
                    <div key={index} className={`text-${msg.sender === 'user' ? 'right' : 'left'}`}>
                        {msg.orders ? (
                            <div>
                                <ul className="list-disc pl-6">
                                    {msg.orders.map((order, orderIndex) => (
                                        <li key={orderIndex} className="cursor-pointer text-blue-500" onClick={() => handleOrderClick(order)}>
                                            <div className="flex items-center">
                                                <img src={order.foodItems[0].dishImage} alt={order.foodItems[0].dishname} className="w-10 h-10 mr-2" />
                                                <div>
                                                    <p className="font-semibold">{order.foodItems[0].dishname}</p>
                                                    <p>Date: {order.createdAt.slice(0, 10)}</p>
                                                    <p>Time: {order.createdAt.slice(11, 19)}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p><strong>{msg.sender}:</strong> {msg.message}</p>
                        )}

                        {
                            msg?.userSavedAddress ? (
                                <div>
                                    <ul>
                                        {
                                            msg.userSavedAddress.map((addressItem, index) => (
                                                <li key={index} className="cursor-pointer text-blue-500" onClick={() => handleAddressClick(addressItem)}>
                                                    <div>
                                                        <p>{addressItem.area}</p>
                                                    </div>
                                                </li>

                                            ))
                                        }
                                    </ul>
                                </div>
                            ) : null
                        }

                    </div>
                ))}
                {isTyping && (
                    <div className="text-left">
                        <p>
                            <strong>Bot:</strong> <span className="text-[#90EE90]">typing...</span>
                        </p>
                    </div>
                )}
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="w-4/5 mr-4 py-2 px-4 border border-gray-300 rounded-lg"
                />
                <button onClick={sendMessage} className="py-2 px-4 bg-blue-500 text-white rounded-lg">Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
