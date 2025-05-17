import { useContext } from 'react';
import { DataQueryContext } from '../data-query.context';

export function useClient() {
  const ctx = useContext(DataQueryContext);

  if (!ctx) throw new Error('DataProvider missing');

  return ctx;
}
