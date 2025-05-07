import classNames from 'classnames';
import { use } from 'react';
import type { SessionPromise as PlayerPromise } from '../types';
import { AuthLoginView } from '../views/auth-login-view';
import { HomeUserView } from '../views/user-home-view';

export default function MainLayout({
  playerPromise,
}: {
  playerPromise: PlayerPromise;
}) {
  const player = use(playerPromise);
  const isLoggedIn = player !== null;

  const view = isLoggedIn ? (
    <HomeUserView player={player} />
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
