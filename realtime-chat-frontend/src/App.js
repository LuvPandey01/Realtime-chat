import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to the server (backend)
const socket = io('http://localhost:3000');  // Replace with your backend URL

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // Listen for incoming messages from the server (backend)
    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    // Function to send a message
    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('chatMessage', message);  // Emit message to server
            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            <h1>Realtime Chat App</h1>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p>{msg}</p>
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="chat-input"
                />
                <button onClick={sendMessage} className="send-button">
                    Send
                </button>
            </div>
        </div>
    );
}

export default App;
