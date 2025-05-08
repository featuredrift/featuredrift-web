import { createContext, useContext, useState, useTransition } from 'react';
import { fetchPlayer, fetchPlayerAvatars } from './api';
import { DataClient } from './data-client';

const DataCtx = createContext<DataClient | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new DataClient());

  return <DataCtx.Provider value={client}>{children}</DataCtx.Provider>;
}

export function useClient() {
  const ctx = useContext(DataCtx);

  if (!ctx) throw new Error('DataProvider missing');

  return ctx;
}

export function usePlayer() {
  const client = useClient();

  return client.read('player', () => fetchPlayer());
}

export function useAvatars() {
  const client = useClient();

  return client.read('avatars', () => fetchPlayerAvatars());
}

export function useMutation<TArgs>(
  mutateFn: (args?: TArgs) => Promise<unknown>,
  invalidateKeys: string[],
) {
  const client = useClient();
  const [pending, startTransition] = useTransition();

  async function mutate(args?: TArgs) {
    await mutateFn(args);

    startTransition(() => {
      invalidateKeys.forEach((k) => client.invalidate(k));
    });
  }

  return [mutate, pending] as const;
}
