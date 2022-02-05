import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {
  useTheme as useMUITheme, Box,
} from '@mui/material';
import { useTheme } from '../context/themeContext';

import ColoredFab from './coloredFab';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { palette } = useMUITheme();

  return (
    <Box sx={{ pr: 1 }}>
      <ColoredFab
        onClick={toggleDarkMode}
        color="secondary"
        $customColor={!isDarkMode ? palette.secondary.main : palette.secondary.light}
        $customHoverColor={!isDarkMode ? palette.secondary.light : palette.secondary.main}
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </ColoredFab>
    </Box>
  );
}
