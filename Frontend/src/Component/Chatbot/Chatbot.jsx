import React, { useState, useRef, useEffect } from 'react'
import './chatbot.css'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '👋 Welcome to ZestyBites! What would you like to order today?',
      time: new Date().toLocaleTimeString()
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const handleSend = () => {
    if (!input.trim()) return
    const userMessage = {
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString()
    }
    const botMessage = {
      sender: 'bot',
      text: getBotReply(input),
      time: new Date().toLocaleTimeString()
    }
    setMessages(prev => [...prev, userMessage, botMessage])
    setInput('')
  }

  const getBotReply = (message) => {
    const text = message.toLowerCase()
    if (text.includes('veg pizza')) return 'Great choice! Your order has been confirmed'
    if (text.includes('1 pizza')) return '✅ Your order has been confirmed'
    if (text.includes('pizza')) return 'Great choice! Veg Pizza: Rs. 250 | Non-Veg Pizza: Rs. 300.'
    if (text.includes('burger')) return 'Yummy! Cheese Burger: Rs. 150 | Chicken Burger: Rs. 180.'
    if (text.includes('momos')) return 'Hot Momos! Veg: Rs. 120 | Chicken: Rs. 150.'
    if (text.includes('pasta')) return 'Pasta in White Sauce: Rs. 200 | Red Sauce: Rs. 210.'
    if (text.includes('menu')) return '🍕 Pizza - Rs. 250\n🍔 Burger - Rs. 150\n🥟 Momos - Rs. 120\n🍝 Pasta - Rs. 200'
    if (text.includes('order')) return '✅ Please type the item and quantity you’d like to order.'
    if (text.includes('bye')) return '👋 Thanks for visiting FoodExpress! Have a tasty day!'
    return "I'm here to help! Type 'menu' to get started."
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="chat-container popup">
      <div className="chat-header">🍽️ ZestyBite ChatBot</div>
      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            {msg.sender === 'bot' && (
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                alt="bot"
                className="avatar"
              />
            )}
            <div className={`message-bubble ${msg.sender}`}>
              {msg.text.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
              <div className="message-time">{msg.time}</div>
            </div>
            {msg.sender === 'user' && (
              <img
                src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                alt="you"
                className="avatar"
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-footer">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          type="text"
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={handleSend} className="send-button">Send</button>
      </div>
    </div>
  )
}

export default Chatbot
