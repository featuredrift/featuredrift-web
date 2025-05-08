import { fetchPlayer, fetchPlayerAvatars } from '../data/api';
import { useQuery } from '../data/data-context';

export function usePlayer() {
  return useQuery('player', () => fetchPlayer());
}

export function usePlayerAvatars() {
  return useQuery('avatars', () => fetchPlayerAvatars());
}
