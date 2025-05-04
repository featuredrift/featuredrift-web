import { CloseButton } from '../components/close-button/close-button';
import type { SessionResponse } from '../types';

export function HomeUserView({ session }: { session: SessionResponse }) {
  return (
    <>
      <CloseButton />
      <code className="text-xs">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </code>
    </>
  );
}
