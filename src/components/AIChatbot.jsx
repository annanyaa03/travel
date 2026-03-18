import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaCommentAlt } from 'react-icons/fa';
import './AIChatbot.css';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your Compass AI assistant. How can I help you plan your dream trip today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI response for now (to be replaced with Gemini API if needed)
    setTimeout(() => {
      const aiResponse = { 
        role: 'ai', 
        text: `That sounds like a great idea! Based on your interest in "${input}", I recommend checking out our current deals for Bali or Santorini. Would you like me to find some flight options for you?` 
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestions = [
    "Best beach destinations 🏖️",
    "Budget travel tips 💰",
    "Visa requirements 🛂",
    "Best time to visit 📅"
  ];

  return (
    <>
      {/* Floating Button */}
      <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
        <FaCommentAlt />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window glass-panel animate-slide-up">
          <div className="chatbot-header">
            <div className="ai-status">
              <FaRobot className="ai-icon" />
              <div>
                <h4>Compass AI</h4>
                <div className="online-indicator"><span></span> Online</div>
              </div>
            </div>
            <button className="close-chat" onClick={() => setIsOpen(false)}><FaTimes /></button>
          </div>

          <div className="chatbot-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`msg-bubble ${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="msg-bubble ai typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="chatbot-footer">
            {messages.length === 1 && (
              <div className="suggestions">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => setInput(s)} className="suggestion-btn">{s}</button>
                ))}
              </div>
            )}
            <form onSubmit={handleSend} className="chat-input-wrap">
              <input 
                type="text" 
                placeholder="Type your message..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="send-btn"><FaPaperPlane /></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
