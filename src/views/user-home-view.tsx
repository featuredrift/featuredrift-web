import { CloseButton } from '../components/close-button/close-button';
import type { SessionResponse } from '../types';

export function HomeUserView({ session }: { session: SessionResponse }) {
  return (
    <>
      <div className="h-full flex items-center justify-center">
        <div className="inline-flex flex-col text-left text-3xl gap-1 text-purple-600 animate-pulse">
          <div className="font-bold text-2xl">
            <span className="text-cyan-500">{session.user.displayName}</span>,
          </div>
          <div className="italic">
            <>You have been activated</>
            <span className="text-cyan-500">;</span>
            <> expect to be </>
            <span className="text-cyan-500">contacted</span>
            <> soon...</>
          </div>
          <div className="text-right text-xl italic">
            — F<span className="text-cyan-500">3</span>tch
          </div>
        </div>
      </div>
      <CloseButton />
    </>
  );
}
