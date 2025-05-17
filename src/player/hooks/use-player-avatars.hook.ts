import { fetchPlayerAvatars } from '../../data/api';
import { useQuery } from '../../data/hooks/use-query.hook';

export function usePlayerAvatars() {
  return useQuery('avatars', () => fetchPlayerAvatars());
}
