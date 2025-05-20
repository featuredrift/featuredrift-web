import { useSyncExternalStore } from 'react';
import { useClient } from './use-client.hook';

export function useQuery<T>(key: string, fetcher: () => Promise<T>) {
  const client = useClient();

  return useSyncExternalStore(
    (cb) => client.subscribe(key, cb),
    () => client.getSnapshot(key, fetcher),
  );
}
