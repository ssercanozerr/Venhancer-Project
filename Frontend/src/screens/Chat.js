// src/Chat/Chat.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css'; // CSS dosyanızın yolu

const socket = io.connect('http://localhost:5000');

const Chat = () => {
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState('');

  useEffect(() => {
    // Socket.IO'dan gelen 'chat' olayını dinle
    socket.on('chat', (data) => {
      setTyping('');
      setMessages([...messages, { sender: data.sender, message: data.message }]);
    });

    // Socket.IO'dan gelen 'typing' olayını dinle
    socket.on('typing', (data) => {
      setTyping(`${data} typing...`);
    });

    // Temizlik işlemleri
    return () => {
      socket.off('chat');
      socket.off('typing');
    };
  }, [messages]);

  const sendMessage = () => {
    // 'chat' olayını sunucuya gönder
    socket.emit('chat', { message, sender });
    setMessage('');
  };

  const handleTyping = () => {
    // 'typing' olayını sunucuya gönder
    socket.emit('typing', sender);
  };

  return (
    <div id="chat-wrap">
      <h2>Chat</h2>
      <div id="chat-window">
        <div id="output">
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.sender}:</strong> {msg.message}
            </p>
          ))}
        </div>
        <div id="feedback">
          <p>{typing}</p>
        </div>
      </div>
      <input
        type="text"
        id="sender"
        placeholder="Name"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />
      <input
        type="text"
        id="message"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleTyping}
      />
      <button id="submitBtn" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default Chat;
