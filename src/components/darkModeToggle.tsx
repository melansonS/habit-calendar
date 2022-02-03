import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { Button, Paper } from '@mui/material';
import { useTheme } from '../context/themeContext';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <Paper>
      <Button onClick={toggleDarkMode}>
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </Button>
    </Paper>
  );
}
