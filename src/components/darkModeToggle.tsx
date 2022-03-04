import React, { useEffect, useRef } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {
  useTheme as useMUITheme, Box, Tooltip,
} from '@mui/material';
import { debounce } from 'lodash';
import { useTheme } from '../context/themeContext';
import useBreakPoints from '../utils/useBreakPoint';
import ColoredFab from './coloredFab';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { palette } = useMUITheme();
  const breakpoint = useBreakPoints();

  const toggleRef = useRef(toggleDarkMode);
  useEffect(() => {
    toggleRef.current = toggleDarkMode;
  }, [isDarkMode, toggleDarkMode]);

  const debouncedToggleDarkMode = useRef(debounce(() => {
    toggleRef.current();
  }, 500)).current;

  const handleToggleDarkMode = () => {
    debouncedToggleDarkMode();
  };

  useEffect(() => () => {
    debouncedToggleDarkMode.cancel();
  });

  return (
    <Box sx={{ pr: 1 }}>
      <Tooltip title="Light / Dark Mode">
        <ColoredFab
          size={breakpoint === 'xs' ? 'small' : 'large'}
          onClick={handleToggleDarkMode}
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
