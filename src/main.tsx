//import React, { StrictMode } from 'react'; // Added { StrictMode }
import { createRoot } from 'react-dom/client'; // Added { createRoot }
import App from './App';
import './index.css';
import { StrictMode } from 'react';

// Now you can use them directly
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);