import { fetchPlayer } from '../../data/api';
import { useQuery } from '../../data/hooks/use-query.hook';

export function usePlayer() {
  return useQuery('player', () => fetchPlayer());
}
