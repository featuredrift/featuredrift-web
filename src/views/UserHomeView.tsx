import type { SessionResponse } from '../types';

export function HomeUserView({ session }: { session: SessionResponse }) {
  return (
    <>
      <div className="absolute top-4 right-4">
        <a
          href="/auth/logout"
          target="_self"
          className="px-2 vertical-align-baseline inline-block text-2xl text-purple-600 hover:border-transparent active:border-transparent hover:bg-purple-600 hover:text-cyan-400 active:text-cyan-400 active:bg-purple-700 text-center cursor-pointer"
        >
          X
        </a>
      </div>
      <code className="text-xs">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </code>
    </>
  );
}
