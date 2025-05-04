import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRoot } from './components/app-root.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);
