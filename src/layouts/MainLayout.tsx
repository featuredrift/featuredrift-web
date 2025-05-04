import classNames from 'classnames';
import { use } from 'react';
import type { SessionPromise } from '../types';
import { AuthLoginView } from '../views/AuthLoginView';
import { HomeUserView } from '../views/UserHomeView';

export default function MainLayout({
  sessionPromise,
}: {
  sessionPromise: SessionPromise;
}) {
  const session = use(sessionPromise);
  const isLoggedIn = session?.user !== undefined;

  const view = isLoggedIn ? (
    <HomeUserView session={session} />
  ) : (
    <AuthLoginView />
  );

  return (
    <div
      className={classNames('p-8 h-full overflow-auto relative', {
        'border-4 border-purple-700': isLoggedIn,
      })}
    >
      {view}
    </div>
  );
}
