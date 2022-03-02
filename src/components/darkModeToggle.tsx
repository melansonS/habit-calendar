import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {
  useTheme as useMUITheme, Box, Tooltip,
} from '@mui/material';
import { useTheme } from '../context/themeContext';
import useBreakPoints from '../utils/useBreakPoint';
import ColoredFab from './coloredFab';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { palette } = useMUITheme();
  const breakpoint = useBreakPoints();

  return (
    <Box sx={{ pr: 1 }}>
      <Tooltip title="Light / Dark Mode">
        <ColoredFab
          size={breakpoint === 'xs' ? 'small' : 'large'}
          onClick={toggleDarkMode}
          color="secondary"
          $customBackgroundColor={palette.secondary.main}
          $customHoverColor={palette.secondary.light}
          $customColor={palette.text.disabled}
        >
          {isDarkMode ? <LightModeIcon sx={{ fontSize: { xs: 'small', sm: 'large' } }} />
            : <DarkModeIcon sx={{ fontSize: { xs: 'small', sm: 'large' } }} />}
        </ColoredFab>
      </Tooltip>
    </Box>
  );
}
