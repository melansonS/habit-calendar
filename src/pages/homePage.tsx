import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import LoginButton from '../components/loginButton';
import { pingServer } from '../utils/userContextUtils';
import { useAlert } from '../context/alertContext';

export default function HomePage() {
  const { isAuthenticated } = useAuth0();
  const { addAlert } = useAlert();
  if (isAuthenticated) {
    return <Navigate to="/calendar" />;
  }

  useEffect(() => {
    // ping the server before log in to start the wake up cycle if needed
    const asyncPing = async () => {
      const response = await pingServer();
      if (!response.success) addAlert(response?.alert);
    };
    asyncPing();
  }, []);

  return (
    <div>
      <Box p={5}>
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
          <Typography variant="h5">
            Welcome!
          </Typography>
          <Typography variant="h6" textAlign="center" component="span" sx={{ height: 'fit-content' }}>
            Let&apos;s build some habits!
          </Typography>
          <LoginButton />
        </Paper>
      </Box>
    </div>
  );
}
