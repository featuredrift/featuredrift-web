export type PlayerResponse = {
  id: number;
  discordId: string;
  username: string;
  displayName: string;
  activeAvatarId: number | null;
  activeAvatar: PlayerAvatar | null;
};

export type PlayerAvatar = {
  id: number;
  nodeId: number;
  name: string;
  bio: string;
  healthMax: number;
  healthCurrent: number;
  energyMax: number;
  energyCurrent: number;
  isAlive: boolean;
};
