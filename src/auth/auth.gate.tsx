import { usePlayer } from '../player/hooks';
import { AuthLoginView } from './auth-login.view';
import AuthenticatedLayout from './authenticated.layout';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const player = usePlayer();

  if (!player) {
    return <AuthLoginView />;
  }

  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
