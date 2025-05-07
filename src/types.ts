export type PlayerResponse = {
  id: number;
  discordId: string;
  username: string;
  displayName: string;
  avatar: string | null;
};

export type SessionPromise = Promise<PlayerResponse | null>;
