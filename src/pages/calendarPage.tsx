import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Skeleton,
} from '@mui/material';

import Calendar from '../components/calendar/calendar';
import { useTheme } from '../context/themeContext';

export default function CalendarPage() {
  const { isLoading } = useAuth0();
  const { isDarkMode } = useTheme();
  if (isLoading) return (<Skeleton animation="pulse" sx={{ p: 2 }} style={{ maxWidth: '100%' }} />);
  return (
    <Calendar isDarkMode={isDarkMode} />
  );
}
