import React, { useState, useEffect } from 'react';
import socket from './socket';
import { useSelector } from 'react-redux';

interface Message {
    sender: 'user' | 'bot';
    message: string;
    orders?: any[]; // Adding orders property to the Message interface
}

const Chatbot: React.FC = () => {
    const { token } = useSelector((state: any) => state.auth);

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [selectedOrder, setSelectedOrder] = useState('');

    useEffect(() => {
        socket.on('botReply', (data: { text?: string, custom?: any, orders?: any[] }[]) => {
            console.log({ data });


            let botMessages: Message[] = [];
            
            if (!data.length) {
                const message: Message = {
                    sender: 'bot',
                    message: 'orders not found', // No message for custom data
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
                } else if (msg.custom) {
                    // If bot sends custom data
                    const message: Message = {
                        sender: 'bot',
                        message: '', // No message for custom data
                        orders: msg.custom.orders, // Store orders in the message
                    };

                    botMessages.push(message);
                }
            });
            setMessages((prevMessages) => [...prevMessages, ...botMessages]);
        });

        return () => {
            socket.off('botReply');
        };
    }, []);


    const sendMessage = () => {
        if (!input) return;
        const userMessage: Message = { sender: 'user', message: input };
        setMessages([...messages, userMessage]);
        const botMessages: Message[] = [];
        if (input.includes("cancel")) {
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

        // Handle order click here, e.g., dispatch an action, open a modal, etc.
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

    return (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Chatbot</h2>
            <div className="border border-gray-300 p-4 h-96 overflow-y-auto mb-4">
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

                    </div>
                ))}
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
