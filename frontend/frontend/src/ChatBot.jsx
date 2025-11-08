import { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! 👋 I'm FOH Buddy. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const responses = [
    {
      keywords: ["donate", "donation"],
      response: "Thank you for your interest in donating! You can donate securely through our 'Donate' page. Would you like the link?"
    },
    {
      keywords: ["volunteer", "volunteering"],
      response: "Volunteering is a wonderful way to give back. You can apply on our 'Volunteers' page. Need help finding it?"
    },
    {
      keywords: ["help", "support", "need assistance"],
      response: "If you or someone you know needs help, please visit our 'Apply for Help' section or tell me what kind of support you're looking for."
    },
    {
      keywords: ["sigaram", "education"],
      response: "SIGARAM is our education support initiative for underprivileged students. Would you like to sponsor a child or refer someone?"
    },
    {
      keywords: ["hello", "hi", "hey"],
      response: "Hi there! 😊 Ask me anything about FOH!"
    }
  ];

  const getResponse = (message) => {
    for (const item of responses) {
      if (item.keywords.some(keyword => message.includes(keyword))) {
        return item.response;
      }
    }
    return "I'm here to help with donations, volunteering, or getting support. How can I assist you?";
  };

  const handleUserMessage = () => {
    const userMsg = input.trim().toLowerCase();
    if (!userMsg) return; // prevent sending empty

    const botResponse = getResponse(userMsg);

    setMessages([...messages, { from: "user", text: input }, { from: "bot", text: botResponse }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white border rounded-lg shadow-lg w-80 max-h-[70vh] flex flex-col">
      <div className="bg-orange-500 text-white text-lg font-bold px-4 py-2 rounded-t-lg">
        FOH Buddy
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`text-${msg.from === "bot" ? "gray-800" : "orange-600"}`}>
            <strong>{msg.from === "bot" ? "FOH Buddy" : "You"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex border-t p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUserMessage()}
          className="flex-1 px-3 py-2 text-sm border rounded-l-md focus:outline-none"
          placeholder="Type your question..."
        />
        <button
          onClick={handleUserMessage}
          className="bg-orange-500 text-white px-4 py-2 rounded-r-md text-sm disabled:opacity-50"
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
