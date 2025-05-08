import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  useTransition,
} from 'react';
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

function useQuery<T>(key: string, fetcher: () => Promise<T>) {
  const client = useClient();

  return useSyncExternalStore(
    (cb) => client.subscribe(key, cb),
    () => client.getSnapshot(key, fetcher),
  );
}

export function usePlayer() {
  return useQuery('player', () => fetchPlayer());
}

export function useAvatars() {
  return useQuery('avatars', () => fetchPlayerAvatars());
}

export function useMutation<T>(
  mutate: (arg: T) => Promise<unknown>,
  {
    invalidate = [],
    optimistic,
  }: {
    invalidate?: string[];
    optimistic?: (arg: T, client: DataClient) => void;
  } = {},
) {
  const client = useClient();
  const [pending, startTransition] = useTransition();

  async function run(arg: T) {
    optimistic?.(arg, client);

    await mutate(arg);

    startTransition(() => invalidate.forEach((k) => client.invalidate(k)));
  }

  return [run, pending] as const;
}
