export type SessionResponse = {
  message: string;
  user: {
    id: number;
    discordId: string;
    username: string;
    displayName: string;
    avatar: string | null;
  };
};

export type SessionPromise = Promise<SessionResponse | null>;
