import { createContext, useState } from 'react';
import { DataQueryService } from './data-query.service';

export const DataQueryContext = createContext<DataQueryService | null>(null);

export function DataQueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new DataQueryService());

  return (
    <DataQueryContext.Provider value={client}>
      {children}
    </DataQueryContext.Provider>
  );
}
