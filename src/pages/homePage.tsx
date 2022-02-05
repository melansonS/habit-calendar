import React from 'react';
import {
  Box,
  Paper,
  Typography,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import LoginButton from '../components/loginButton';

export default function HomePage() {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return <Navigate to="/calendar" />;
  }

  return (
    <div>
      <Box p={5}>
        <Typography variant="h3" p={2} align="center">
          This is the homepage
        </Typography>
        <Paper
          elevation={7}
          sx={{
            p: 2,
            height: 400,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <LoginButton />
          <Typography variant="body1" component="span" sx={{ height: 'fit-content' }}>
            {' Welcome! Let\'s build some habits! it\'s all about consistency!'}
          </Typography>
        </Paper>
      </Box>
    </div>
  );
}
