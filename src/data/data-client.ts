// data-client.ts
enum Status {
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}

type Entry<T> =
  | { status: Status.pending; promise: Promise<T> }
  | { status: Status.fulfilled; data: T }
  | { status: Status.rejected; error: unknown };

export class DataClient {
  private cache = new Map<string, Entry<unknown>>();

  /** read suspends or returns the cached data */
  read<T>(key: string, fetcher: () => Promise<T>): T {
    const cached = this.cache.get(key) as Entry<T> | undefined;

    if (!cached) return this.#create(key, fetcher);
    if (cached.status === Status.fulfilled) return cached.data;
    if (cached.status === Status.rejected) throw cached.error;

    // pending → throw promise so Suspense shows fallback
    throw cached.promise;
  }

  /** force a new request; useful for hard refetch */
  invalidate(key: string) {
    this.cache.delete(key);
  }

  /** write fresh data optimistically or after mutation */
  set<T>(key: string, data: T) {
    this.cache.set(key, { status: Status.fulfilled, data });
  }

  #create<T>(key: string, fetcher: () => Promise<T>): T {
    const promise = fetcher()
      .then((data) => {
        this.cache.set(key, { status: Status.fulfilled, data });
        return data;
      })
      .catch((err) => {
        this.cache.set(key, { status: Status.rejected, error: err });
        throw err;
      });

    this.cache.set(key, { status: Status.pending, promise });

    throw promise; // ⬅ Suspense will catch this :contentReference[oaicite:0]{index=0}
  }
}
