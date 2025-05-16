import type { PropsWithChildren } from 'react';
import { usePlayer, usePlayerAvatars } from './hooks';
import { CreateAvatarView } from './create-avatar-view';

export function PlayerAvatarGate({ children }: PropsWithChildren) {
  const player = usePlayer();

  if (player?.activeAvatarId) {
    return children;
  }

  return <PlayerAvatarListGate />;
}

function PlayerAvatarListGate() {
  const avatars = usePlayerAvatars();

  if (avatars.length === 0) {
    return <CreateAvatarView />;
  }

  return (
    <div>
      <div>Player has avatars to select</div>
      <div>Avatars:</div>
      <pre>{JSON.stringify(avatars, null, 2)}</pre>
    </div>
  );
}
