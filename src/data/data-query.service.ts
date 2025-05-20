enum Status {
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}

type Entry<T> =
  | { status: Status.pending; promise: Promise<T> }
  | { status: Status.fulfilled; data: T }
  | { status: Status.rejected; error: unknown };

export class DataQueryService {
  private cache = new Map<string, Entry<unknown>>();
  private listeners = new Map<string, Set<() => void>>();

  read<T>(key: string, fetcher: () => Promise<T>): T {
    const entry = this.cache.get(key);

    if (!entry) return this.#create(key, fetcher);
    if (entry.status === Status.fulfilled) return entry.data as T;
    if (entry.status === Status.rejected) throw entry.error;

    throw entry.promise;
  }

  invalidate(key: string) {
    this.cache.delete(key);
    this.#notify(key);
  }

  set<T>(key: string, data: T) {
    this.cache.set(key, { status: Status.fulfilled, data });
    this.#notify(key);
  }

  subscribe(key: string, cb: () => void) {
    const s = this.listeners.get(key) ?? new Set();

    s.add(cb);
    this.listeners.set(key, s);

    return () => {
      s.delete(cb);
    };
  }

  getSnapshot<T>(key: string, fetcher: () => Promise<T>) {
    return this.read(key, fetcher);
  }

  #create<T>(key: string, fetcher: () => Promise<T>): T {
    const promise = fetcher()
      .then((data) => {
        this.set(key, data);

        return data;
      })
      .catch((err) => {
        this.cache.set(key, { status: Status.rejected, error: err });
        this.#notify(key);

        throw err;
      });

    this.cache.set(key, { status: Status.pending, promise });

    throw promise;
  }

  #notify(key: string) {
    this.listeners.get(key)?.forEach((fn) => fn());
  }
}
