export type SessionResponse = {
  message: string;
  user: {
    id: string;
  };
};

export type SessionPromise = Promise<SessionResponse | null>;
