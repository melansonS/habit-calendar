import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Fab, Tooltip } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export default function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  return (
    <Box sx={{ pr: 1 }}>
      <Tooltip title="logout">
        <Fab
          onClick={() => { if (isAuthenticated) { logout(); } }}
          color="secondary"
        >
          <LogoutIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}
