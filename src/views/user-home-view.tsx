import { CloseButton } from '../components/close-button/close-button';
import type { SessionResponse } from '../types';

export function HomeUserView({ session }: { session: SessionResponse }) {
  return (
    <>
      <CloseButton />
      <div className="text-center text-purple-600">
        <div className="inline-flex flex-col text-left text-xl">
          <div className="font-bold text-cyan-500">
            {session.user.discordUsername},
          </div>
          <div className="italic">
            You have been <span className="text-cyan-500">activated</span>.
          </div>
          <div className="italic">
            Expect to be <span className="text-cyan-500">contacted</span>{' '}
            soon...
          </div>
          <div className="text-right text-base italic">
            — F<span className="text-cyan-500">3</span>tch
          </div>
        </div>
      </div>
    </>
  );
}
