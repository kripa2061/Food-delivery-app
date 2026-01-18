import React, { useState } from 'react'
import Chatbot from './Chatbot'
import './chatbot.css'

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen && <Chatbot />}
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✖' : '💬'}
      </button>
    </>
  )
}

export default FloatingChatbot
