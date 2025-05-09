import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  useTransition,
} from 'react';
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

export function useQuery<T>(key: string, fetcher: () => Promise<T>) {
  const client = useClient();

  return useSyncExternalStore(
    (cb) => client.subscribe(key, cb),
    () => client.getSnapshot(key, fetcher),
  );
}

export function useMutation<T>(
  mutate: (arg: T) => Promise<unknown>,
  {
    invalidate = [],
    optimistic,
    handleError,
  }: {
    invalidate?: string[];
    optimistic?: (arg: T, client: DataClient) => void;
    handleError?: (err: unknown) => void;
  } = {},
) {
  const client = useClient();
  const [pending, startTransition] = useTransition();

  async function run(arg: T) {
    optimistic?.(arg, client);

    try {
      await mutate(arg);

      startTransition(() => invalidate.forEach((k) => client.invalidate(k)));
    } catch (err) {
      if (!handleError) throw err;
      handleError(err);
    }
  }

  return [run, pending] as const;
}
