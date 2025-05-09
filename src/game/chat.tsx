import { type FormEvent, useEffect, useRef, useState } from 'react';

interface Message {
  user: string;
  text: string;
}

export function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // auto-scroll on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { user: 'root', text: input }]);
    setInput('');
  };

  return (
    <div className="flex flex-col justify-end flex-1 min-h-50">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center border-2 border-purple-600 rounded-t-lg px-3 py-2 cursor-pointer"
      >
        <span className="text-cyan-400 uppercase text-sm sm:text-base">
          Local Chat
        </span>
        <span
          className="text-cyan-400 text-2xl transform transition-transform"
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(90deg)' }}
        >
          ▾
        </span>
      </div>
      {open && (
        <div className="border-x-2 border-b-2 border-purple-600 rounded-b-lg flex flex-col flex-1 min-h-0 overflow-hidden">
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-2 space-y-1 font-mono text-xs sm:text-sm text-purple-400"
          >
            {messages.map((msg, i) => (
              <div key={i}>
                <span className="text-cyan-400">{msg.user}:</span> {msg.text}
              </div>
            ))}
            {messages.length === 0 && (
              <div className="text-center text-cyan-400 italic font-light text-sm sm:text-base">
                {'<No transmissions logged>'}
              </div>
            )}
          </div>
          <form
            onSubmit={handleSend}
            className="border-t-2 border-purple-600 px-3 py-2"
          >
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter message..."
                className="flex-1 bg-transparent text-sm text-purple-400 placeholder-zinc-500 focus:outline-none font-mono"
              />
              <button
                type="submit"
                className="ml-2 text-cyan-400 uppercase text-base tracking-wide"
              >
                ➤
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
