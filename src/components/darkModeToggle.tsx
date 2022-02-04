import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { Fab } from '@mui/material';
import { useTheme } from '../context/themeContext';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <Fab
      onClick={toggleDarkMode}
      color="secondary"
    >
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </Fab>
  );
}
