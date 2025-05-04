import axios from 'axios';
import { Suspense } from 'react';
import MainLayout from '../layouts/MainLayout';
import type { SessionPromise } from '../types';

async function getSession(): SessionPromise {
  const res = await axios.get('/auth/verify', { withCredentials: true });

  if (res.status !== 200) return null;

  return res.data;
}

function SessionLoading() {
  return <div className="text-2xl">Loading...</div>;
}

export function AppRoot() {
  const sessionPromise = getSession().catch(() => null);

  return (
    <Suspense fallback={<SessionLoading />}>
      <MainLayout sessionPromise={sessionPromise} />
    </Suspense>
  );
}
