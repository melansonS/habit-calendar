import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import CircularProgress from '@mui/material/CircularProgress';
import { Fab } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton() {
  const {
    loginWithRedirect, logout, isAuthenticated, isLoading,
  } = useAuth0();
  const handleClick = isAuthenticated ? logout : loginWithRedirect;
  if (isLoading) {
    return (
      <Fab>
        <CircularProgress size="20px" />
      </Fab>
    );
  }

  return (
    <Fab
      onClick={() => handleClick()}
    >
      {isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
    </Fab>
  );
}
