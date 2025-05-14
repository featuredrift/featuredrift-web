import axios from 'axios';
import type { PlayerAvatar, PlayerResponse } from '../game/types';

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

export interface AvatarPayload {
  name: string;
  bio: string;
}

export async function createPlayerAvatar(
  payload: AvatarPayload,
): Promise<PlayerAvatar | null> {
  const res = await axios.post('/api/v1/game/player/avatars', payload, {
    withCredentials: true,
  });

  return res.data;
}
