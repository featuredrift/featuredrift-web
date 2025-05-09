import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import { LinkButton } from '../common/link-button';
import { usePlayer } from '../player/hooks';

export function LogoutButton() {
  return (
    <LinkButton
      href="/auth/logout"
      className="text-2xl fixed top-4 right-4 h-10 w-10 leading-[35px] !bg-[#02070b]"
    >
      X
    </LinkButton>
  );
}

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  const player = usePlayer();

  return (
    <div
      className={classNames(
        'h-full overflow-auto relative border-2',
        player !== null ? 'border-purple-700' : 'border-transparent',
      )}
    >
      {children}
      {player && <LogoutButton />}
    </div>
  );
}
