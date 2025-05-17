import { usePlayer } from '../player/hooks/use-player.hook';
import { AuthLoginView } from './auth-login-view';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const player = usePlayer();

  if (!player) {
    return <AuthLoginView />;
  }

  return children;
}
