import axios from 'axios';
import type { Mob, PlayerAvatar, PlayerResponse } from '../types';

export async function fetchPlayer(): Promise<PlayerResponse | null> {
  try {
    const res = await axios.get('/api/v1/game/player', {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response?.status !== 401) {
      console.error('Error fetching session:', error);
    }

    return null;
  }
}

export async function fetchPlayerAvatars(): Promise<PlayerAvatar[]> {
  const res = await axios.get('/api/v1/game/player/avatars', {
    withCredentials: true,
  });

  if (!Array.isArray(res.data)) {
    console.error('Invalid response format:', res.data);

    return [];
  }

  return res.data;
}

export interface CreatePlayerAvatarDto {
  name: string;
  bio: string;
}

export async function createPlayerAvatar(
  payload: CreatePlayerAvatarDto,
): Promise<PlayerAvatar | null> {
  const res = await axios.post('/api/v1/game/player/avatars', payload, {
    withCredentials: true,
  });

  return res.data;
}

export async function startCombat(mobType: string): Promise<Mob> {
  const res = await axios.post('/api/v1/game/combat/start', null, {
    params: { mobType },
    withCredentials: true,
  });

  return res.data as Mob;
}

export async function fetchActiveMobs(): Promise<Mob[]> {
  const res = await axios.get('/api/v1/game/combat/active', {
    withCredentials: true,
  });

  return res.data;
}
