import React, { useState } from 'react';
import axios from 'axios';

interface ChatWithAIProps {
  onFinish: (mood: string) => void;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const systemPrompt = 'You are a helpful mood assistant. Ask the user about their day and feelings. After 2-3 exchanges, guess their mood (happy, sad, neutral, stressed) and say: "Your mood is: <mood>".';

const ChatWithAI: React.FC<ChatWithAIProps> = ({ onFinish }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: systemPrompt }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    try {
      const res = await axios.post('http://localhost:5001/api/chat', { messages: newMessages });
      const aiMsg = res.data;
      setMessages([...newMessages, aiMsg]);
      // Check if AI guessed the mood
      const match = aiMsg.content.match(/Your mood is: (happy|sad|neutral|stressed)/i);
      if (match) {
        setFinished(true);
        setTimeout(() => onFinish(match[1].toLowerCase()), 1200);
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#18181b] rounded-2xl p-4 shadow-lg max-w-md mx-auto mb-8">
      <div className="h-64 overflow-y-auto mb-4 bg-[#23232a] rounded-xl p-3 text-white">
        {messages.filter(m => m.role !== 'system').map((m, i) => (
          <div key={i} className={`mb-2 ${m.role === 'user' ? 'text-cyan-300 text-right' : 'text-gray-100 text-left'}`}>
            <span className="block px-2 py-1 rounded-lg inline-block" style={{ background: m.role === 'user' ? '#334155' : '#27272a' }}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && <div className="text-gray-400">AI is typing...</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-lg px-3 py-2 bg-[#23232a] text-white border border-gray-700 focus:outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
          disabled={loading || finished}
          placeholder="Type your message..."
        />
        <button
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading || finished || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWithAI; 
