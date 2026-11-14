import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import { PeneirasProvider } from './context/PeneirasContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <PeneirasProvider>
          <App />
        </PeneirasProvider>
      </BrowserRouter>
  </StrictMode>
)
