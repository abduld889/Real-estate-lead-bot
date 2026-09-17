import { useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! 👋 I'm your Real Estate AI Assistant. What type of property are you looking for?",
    },
  ])

  const [input, setInput] = useState('')

  const [lead, setLead] = useState({
    full_name: '',
    email: '',
    phone: '',
    property_type: '',
    budget: '',
    location: '',
    message: '',
  })

  const handleSend = async (e) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage = input

    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: userMessage,
      },
    ])

    setInput('')

    // Detect property type from the user's message
    let propertyType = lead.property_type

    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes('apartment') || lowerMessage.includes('flat')) {
      propertyType = 'Apartment'
    } else if (lowerMessage.includes('villa')) {
      propertyType = 'Villa'
    } else if (lowerMessage.includes('house')) {
      propertyType = 'House'
    } else if (lowerMessage.includes('land')) {
      propertyType = 'Land'
    } else if (lowerMessage.includes('office')) {
      propertyType = 'Office'
    } else if (lowerMessage.includes('shop') || lowerMessage.includes('store')) {
      propertyType = 'Shop'
    }

    const updatedLead = {
      ...lead,
      property_type: propertyType,
      message: userMessage,
    }

    setLead(updatedLead)

    try {
      const response = await fetch(
        'http://localhost:5678/webhook-test/real-estate-leads',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedLead),
        }
      )

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text:
            data.follow_up_message ||
            'Thanks! Tell me a little more about what you are looking for.',
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Sorry, I could not connect to the AI assistant.',
        },
      ])
    }
  }

  return (
    <div className="chat-app">
      <div className="chat-container">
        <div className="chat-header">
          <div>
            <h1>Real Estate AI Assistant</h1>
            <p>AI-powered property search & lead qualification</p>
          </div>

          <div className="status">
            <span></span>
            Online
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-row ${message.sender}`}
            >
              <div className="message">
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default App
