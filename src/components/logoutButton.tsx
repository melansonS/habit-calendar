import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Box, Tooltip, useTheme as useMUITheme,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import ColoredFab from './coloredFab';
import useBreakPoints from '../utils/useBreakPoint';

export default function LogoutButton() {
  const { palette } = useMUITheme();
  const { logout, isAuthenticated } = useAuth0();
  const breakpoint = useBreakPoints();

  return (
    <Box>
      <Tooltip title="logout">
        <ColoredFab
          size={breakpoint === 'xs' ? 'small' : 'large'}
          $customBackgroundColor={palette.secondary.main}
          $customHoverColor={palette.secondary.light}
          $customColor={palette.text.disabled}
          onClick={() => { if (isAuthenticated) { logout(); } }}
          color="secondary"
        >
          <LogoutIcon sx={{ fontSize: { xs: 'medium', sm: 'large' } }} />
        </ColoredFab>
      </Tooltip>
    </Box>
  );
}
