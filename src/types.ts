export type SessionResponse = {
  message: string;
  user: {
    id: number;
    discordId: string;
    discordUsername: string;
    avatar: string | null;
  };
};

export type SessionPromise = Promise<SessionResponse | null>;
