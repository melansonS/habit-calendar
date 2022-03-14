import React, { useEffect } from 'react';
import {
  Box,
  // Paper,
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
        <Box
          sx={{
            p: 2,
            height: 300,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            Welcome!
          </Typography>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography variant="h6" textAlign="center" component="span" sx={{ height: 'fit-content', pb: 2 }}>
              Let&apos;s build some habits!
            </Typography>
            <LoginButton />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
