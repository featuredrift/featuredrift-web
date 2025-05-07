import axios from 'axios';
import { Suspense } from 'react';
import MainLayout from '../layouts/main-layout';
import type { SessionPromise } from '../types';
import { LoadingView } from '../views/loading-view';

async function getSessionPlayer(): SessionPromise {
  try {
    let res = await axios.get('/auth/verify', { withCredentials: true });

    if (res.status !== 200) return null;

    res = await axios.get('/player', { withCredentials: true });

    if (res.status !== 200) return null;

    return res.data;
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
}

export function AppRoot() {
  const playerPromise = getSessionPlayer().catch(() => null);

  return (
    <Suspense fallback={<LoadingView />}>
      <MainLayout playerPromise={playerPromise} />
    </Suspense>
  );
}
