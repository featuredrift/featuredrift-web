import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRoot } from './components/AppRoot.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);
