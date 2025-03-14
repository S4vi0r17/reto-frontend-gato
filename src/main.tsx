import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TMBDRouter from './router/TMBDRouter.tsx';

import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TMBDRouter />
  </StrictMode>
);
