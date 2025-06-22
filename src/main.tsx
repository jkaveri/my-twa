import './index.css'

import App from './App.tsx'
import { StrictMode } from 'react'
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { createRoot } from 'react-dom/client'

const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>,
  </StrictMode>,
)
