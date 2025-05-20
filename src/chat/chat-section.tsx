import { useActionState, useEffect, useRef, useState } from 'react';
import { useChat } from './use-chat.hook';

export function ChatSection() {
  const { messages, sendMessage } = useChat();
  const [, dispatch, isPending] = useActionState(
    async (state: null, fd: FormData) => {
      await sendMessage(fd.get('message') as string);

      return state;
    },
    null,
  );
  const [open, setOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="grow-0 flex flex-col justify-end flex-1 bg-dark-bg border-t-1 border-purple-700">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center px-3 py-2 cursor-pointer text-purple-500"
      >
        <span className="uppercase text-sm sm:text-base">Transmission Log</span>
        <span
          className="text-2xl transform transition-transform"
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
            {Object.values(messages).map((msg, i) => (
              <div key={i}>
                <span className="text-cyan-400">{msg.user}:</span> {msg.text}
              </div>
            ))}
            {Object.values(messages).length === 0 && (
              <div className="text-center text-cyan-400 italic font-light text-sm sm:text-base">
                {'<No transmissions logged>'}
              </div>
            )}
          </div>
          <form
            action={dispatch}
            className="border-t-1 border-purple-600 px-3 py-2"
          >
            <div className="flex">
              <input
                type="text"
                placeholder="Enter message..."
                name="message"
                className="grow text-sm text-purple-400 placeholder-zinc-500 focus:outline-none font-mono"
                autoFocus
                autoComplete="off"
                autoCorrect="on"
                autoCapitalize="on"
                spellCheck="true"
              />
              <button
                type="submit"
                className="ml-2 text-cyan-400 uppercase text-base tracking-wide"
                disabled={isPending}
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
