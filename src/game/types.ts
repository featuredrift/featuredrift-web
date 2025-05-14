export type PlayerResponse = {
  id: number;
  discordId: string;
  username: string;
  displayName: string;
  activeAvatarId: number | null;
  activeAvatar: PlayerAvatar | null;
  currentNode: NodeDetails | null;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
};

export type NodeDetails = {
  id: number;
  name: string;
  description: string;
  type: string;
  safetyRating: number;
  createdAt: string;
  updatedAt: string;
};
