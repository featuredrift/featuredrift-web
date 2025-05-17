import { useTransition } from 'react';
import type { DataQueryService } from '../data-query.service';
import { useClient } from './use-client.hook';

export function useMutation<T>(
  mutate: (arg: T) => Promise<unknown>,
  {
    invalidate = [],
    optimistic,
    handleError,
  }: {
    invalidate?: string[];
    optimistic?: (arg: T, client: DataQueryService) => void;
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
