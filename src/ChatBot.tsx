// frontend/src/Chatbot.tsx
import React, { useState, useEffect } from 'react';
import socket from './socket';

interface Message {
    sender: 'user' | 'bot';
    message: string;
}

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('botReply', (data: { text: string }[]) => {
            const botMessages: any = data.map((msg) => ({ sender: 'bot', message: msg.text }));
            console.log({ botMessages });
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
        socket.emit('sendMessage', input);
        setInput('');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Chatbot</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                        <p><strong>{msg.sender}:</strong> {msg.message}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                style={{ width: '80%', marginRight: '10px' }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chatbot;
