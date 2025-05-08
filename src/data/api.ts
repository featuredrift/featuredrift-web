import axios from 'axios';
import type { PlayerAvatar, PlayerResponse } from '../player/types';

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

export async function createPlayerAvatar(
  avatarName: string,
  bio: string,
): Promise<PlayerAvatar | null> {
  try {
    const res = await axios.post(
      '/api/v1/game/player/avatars',
      { name: avatarName, bio },
      { withCredentials: true },
    );

    return res.data;
  } catch (error) {
    console.error('Error creating avatar:', error);

    return null;
  }
}
