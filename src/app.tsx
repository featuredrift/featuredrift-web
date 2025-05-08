import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthGate } from './auth/auth.gate';
import { LoadingView } from './common/loading.view';
import { DataProvider } from './data/data-context';
import { HomeView } from './game/home.view';
import { PlayerGate } from './player/player.gate';

export function App() {
  return (
    <DataProvider>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<LoadingView />}>
          <AuthGate>
            <PlayerGate>
              <HomeView />
            </PlayerGate>
          </AuthGate>
        </Suspense>
      </ErrorBoundary>
    </DataProvider>
  );
}
