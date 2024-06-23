import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Chat = ({ isDarkMode }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [recentPrompts, setRecentPrompts] = useState([]);
  const [showPromptList, setShowPromptList] = useState(false);
  const messagesContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!localStorage.getItem('token')) {
        navigate('/');
      } else {
        const token = localStorage.getItem('token');
        try {
          const res = await axios.get('http://127.0.0.1:5000/api/chat/history', {
            headers: {
              'x-auth-token': token,
            },
          });
          const messages = res.data.messages || [];
          setMessages(messages);

          const userPrompts = messages
            .filter((msg) => msg.sender === 'user')
            .map((msg) => msg.message);
          const uniquePrompts = [...new Set(userPrompts)];
          setRecentPrompts(uniquePrompts.slice(0, 10));
        } catch (err) {
          if (err.response && err.response.status === 404) {
            setMessages([]);
          } else {
            console.error('Failed to fetch chat history:', err);
            handleLogout();
            navigate('/');
          }
          
        }
      }
    };

    fetchChatHistory();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'http://127.0.0.1:5000/api/chat/addMessage',
        { message: input },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      setMessages(res.data.messages);
      setRecentPrompts((prevPrompts) => {
        const updatedPrompts = [input, ...prevPrompts.filter((prompt) => prompt !== input)];
        return updatedPrompts.slice(0, 10);
      });
      setInput('');
      scrollToBottom();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDeleteAllChats = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://127.0.0.1:5000/api/chat/deleteAll', {
        headers: {
          'x-auth-token': token,
        },
      });
      setMessages([]);
      setRecentPrompts([]);
    } catch (err) {
      console.error('Failed to delete all chats:', err);
    }
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt);
    setShowPromptList(false);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  };
  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`chat-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="chat-buttons">
        <button onClick={handleLogout} className="logout-button">Logout</button>
        <button onClick={handleDeleteAllChats} className="delete-all-button">Delete All Chats</button>
      </div>
      <div className="messages" ref={messagesContainerRef}>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={msg.sender === 'user' ? 'user-message' : 'ai-message'}
            >
              <div>
                <strong>{msg.sender === 'user' ? 'You: ' : 'AI: '}</strong>
                {msg.message}
              </div>
            </div>
          ))
        ) : (
          <p>No messages to display.</p>
        )}
        <div /> {/* Reference to scroll to */}
      </div>

      {showPromptList && (
        <div className="prompt-list">
          {recentPrompts.map((prompt, index) => (
            <div key={index} onClick={() => handlePromptClick(prompt)} className="prompt-item">
              {prompt}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-field"
          rows="1"
        />
        <button type="submit" className="send-button">Send</button>
        <button type="button" onClick={() => setShowPromptList(!showPromptList)} className="recent-prompts-button">
          Recent Prompts
        </button>
      </form>
    </div>
  );
};

export default Chat;
