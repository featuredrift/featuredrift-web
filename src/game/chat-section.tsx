import { type FormEvent, useEffect, useRef, useState } from 'react';

interface Message {
  user: string;
  text: string;
}

export function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
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
    <div className="grow-0 flex flex-col justify-end flex-1 bg-dark-bg">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center border-t-1 border-purple-600 px-3 py-2 cursor-pointer"
      >
        <span className="text-cyan-400 uppercase text-sm sm:text-base">
          Local Transmissions
        </span>
        <span
          className="text-cyan-400 text-2xl transform transition-transform"
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)' }}
        >
          ▾
        </span>
      </div>
      {open && (
        <div className="border-t-1 border-purple-600 rounded-b-lg flex flex-col flex-1 min-h-0 overflow-hidden">
          <div
            ref={scrollRef}
            className="grow overflow-y-auto px-3 py-2 space-y-1 font-mono text-xs sm:text-sm text-purple-400 min-h-30 max-h-50"
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
            className="border-t-1 border-purple-600 px-3 py-2"
          >
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter message..."
                className="grow text-sm text-purple-400 placeholder-zinc-500 focus:outline-none font-mono"
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
