import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Box, Tooltip, useTheme as useMUITheme,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import ColoredFab from './coloredFab';

export default function LogoutButton() {
  const { palette } = useMUITheme();
  const { logout, isAuthenticated } = useAuth0();

  return (
    <Box sx={{ pr: 1 }}>
      <Tooltip title="logout">
        <ColoredFab
          $customBackgroundColor={palette.secondary.main}
          $customHoverColor={palette.secondary.light}
          $customColor={palette.text.disabled}
          onClick={() => { if (isAuthenticated) { logout(); } }}
          color="secondary"
        >
          <LogoutIcon />
        </ColoredFab>
      </Tooltip>
    </Box>
  );
}
