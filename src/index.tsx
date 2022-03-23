import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import ScrollToTop from './layouts/ScrollToTop';
import App from './layouts/App';
import Keplr from 'libs/keplr';
import { network } from 'constants/networks';
import AuthProvider from 'providers/AuthProvider';
import { ToastProvider } from 'components/Toasts/context';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';

// enable Keplr
window.Keplr = new Keplr();
const queryClient = new QueryClient();

const startApp = async () => {
  render(
    <StrictMode>
      <ToastProvider>
        <Router>
          <AuthProvider>
            <ScrollToTop />
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </AuthProvider>
        </Router>
        <ToastContainer transition={Bounce} />
      </ToastProvider>
    </StrictMode>,
    document.getElementById('oraiswap')
  );

  const keplr = await window.Keplr.getKeplr();
  // suggest our chain
  if (keplr) {
    // always trigger suggest chain when users enter the webpage
    await window.Keplr.suggestChain(network.chainId);
  }
};

startApp();
