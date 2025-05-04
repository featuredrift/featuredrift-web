import classNames from 'classnames';
import { use } from 'react';
import type { SessionPromise } from '../types';
import { AuthLoginView } from '../views/auth-login-view';
import { HomeUserView } from '../views/user-home-view';

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
      className={classNames(
        'p-8 h-full overflow-auto relative border-2',
        isLoggedIn ? 'border-purple-700' : 'border-transparent',
      )}
    >
      {view}
    </div>
  );
}
