import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthGate } from './auth/auth-gate';
import { DataQueryProvider } from './data/data-query.context';
import { GameLayout } from './layout/game-layout';
import { LoadingView } from './loading-view';
import { PlayerAvatarGate } from './player/player-avatar-gate';

export function App() {
  return (
    <DataQueryProvider>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<LoadingView />}>
          <AuthGate>
            <PlayerAvatarGate>
              <GameLayout />
            </PlayerAvatarGate>
          </AuthGate>
        </Suspense>
      </ErrorBoundary>
    </DataQueryProvider>
  );
}
