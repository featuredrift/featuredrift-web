import type { useViewManager } from './views/hooks/use-view-manager.hook';

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
  mobTypes: MobType[] | null;
};

export type MobType = {
  id: number;
  name: string;
  constName: string;
  description: string;
  level: number;
  healthMax: number;
};

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
}

export interface Mob {
  id: number;
  mobTypeId: number;
  nodeId: number;
  healthCurrent: number;
  status: 'alive' | 'dead';
}

export interface ViewManagerViewProps {
  player: PlayerResponse;
  viewManager: ReturnType<typeof useViewManager>;
}
