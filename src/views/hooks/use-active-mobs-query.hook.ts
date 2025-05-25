import { fetchActiveMobs } from '../../data/api';
import { useQuery } from '../../data/hooks/use-query.hook';

export function useActiveMobsQuery() {
  return useQuery('mobs', () => fetchActiveMobs());
}
