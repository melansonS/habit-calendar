import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { Button, Paper, useTheme as useMUITheme } from '@mui/material';
import { useTheme } from '../context/themeContext';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { palette: { primary } } = useMUITheme();
  return (
    <Paper>
      <Button
        onClick={toggleDarkMode}
        color="secondary"
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon style={{ color: primary.main }} />}
      </Button>
    </Paper>
  );
}
