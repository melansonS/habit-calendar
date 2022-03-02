import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { Button, Tooltip } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Tooltip title="login">
      <Button
        onClick={() => loginWithRedirect({
          redirectUri: `${window.location.origin}/calendar`,
        })}
        color="secondary"
        variant="contained"
      >
        Jump in!
        {' '}
        <LoginIcon />
      </Button>
    </Tooltip>
  );
}
