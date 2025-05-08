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

  read<T>(key: string, fetcher: () => Promise<T>): T {
    const cached = this.cache.get(key) as Entry<T> | undefined;

    if (!cached) return this.#create(key, fetcher);
    if (cached.status === Status.fulfilled) return cached.data;
    if (cached.status === Status.rejected) throw cached.error;

    throw cached.promise;
  }

  invalidate(key: string) {
    this.cache.delete(key);
  }

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

    throw promise;
  }
}
