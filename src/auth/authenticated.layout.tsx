import classNames from 'classnames';
import { type PropsWithChildren, useMemo } from 'react';
import { CloseButton } from '../common/close-button/close-button';
import { usePlayer } from '../data/data-context';

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  const player = usePlayer();

  const classNameString = useMemo(
    () =>
      classNames(
        'p-8 h-full overflow-auto relative border-2',
        player !== null ? 'border-purple-700' : 'border-transparent',
      ),
    [player],
  );

  return (
    <div className={classNameString}>
      {children}
      {player && <CloseButton />}
    </div>
  );
}
