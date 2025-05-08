import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthGate } from './auth/auth-gate';
import { DataProvider } from './data/data-context';
import { GameView } from './game/game-view';
import { LoadingView } from './loading-view';
import { PlayerAvatarGate } from './player/player-avatar-gate';

export function App() {
  return (
    <DataProvider>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<LoadingView />}>
          <AuthGate>
            <PlayerAvatarGate>
              <GameView />
            </PlayerAvatarGate>
          </AuthGate>
        </Suspense>
      </ErrorBoundary>
    </DataProvider>
  );
}
