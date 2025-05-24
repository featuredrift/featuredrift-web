import { useTransition } from 'react';
import type { DataQueryService } from '../data-query.service';
import { useClient } from './use-client.hook';

export function useMutation<T, R = unknown>(
  mutate: (arg: T) => Promise<R>,
  {
    invalidate = [],
    optimistic,
    handleError,
    handleSuccess,
  }: {
    invalidate?: string[];
    optimistic?: (arg: T, client: DataQueryService) => void;
    handleError?: (err: unknown) => void;
    handleSuccess?: (res: R) => void;
  } = {},
) {
  const client = useClient();
  const [pending, startTransition] = useTransition();

  async function run(arg: T) {
    optimistic?.(arg, client);

    try {
      const result = await mutate(arg);

      startTransition(() => {
        invalidate.forEach((k) => client.invalidate(k));
        handleSuccess?.(result);
      });
    } catch (err) {
      if (!handleError) throw err;
      handleError(err);
    }
  }

  return [run, pending] as const;
}
