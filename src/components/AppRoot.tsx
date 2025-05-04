import axios from 'axios';
import { Suspense } from 'react';
import MainLayout from '../layouts/MainLayout';
import type { SessionPromise } from '../types';
import { LoadingView } from '../views/LoadingView';

async function getSession(): SessionPromise {
  const res = await axios.get('/auth/verify', { withCredentials: true });

  if (res.status !== 200) return null;

  return res.data;
}

export function AppRoot() {
  const sessionPromise = getSession().catch(() => null);

  return (
    <Suspense fallback={<LoadingView />}>
      <MainLayout sessionPromise={sessionPromise} />
    </Suspense>
  );
}
