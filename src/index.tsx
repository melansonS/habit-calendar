import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { ThemeContextProvider } from './context/themeContext';
import { UserContextProvider } from './context/userContext';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-yjll6etc.us.auth0.com"
      clientId="OhtrXOukQ9lk89dTkAuALWAOuRkxM3Rr"
      redirectUri={window.location.origin}
      audience="hcAuth"
      scope="read:current_user"
    >
      <UserContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </UserContextProvider>
    </Auth0Provider>
  </React.StrictMode>,

  document.getElementById('root'),
);
