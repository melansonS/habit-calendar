import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Card, Paper, Typography, Skeleton,
} from '@mui/material';

export default function CalendarPage() {
  const { isLoading, user } = useAuth0();
  if (user?.given_name) {
    user.given_name = '';
  }
  return (
    <Card sx={{ p: 2 }}>
      <h2>
        This is the CalendarPage
      </h2>
      {isLoading ? (
        <Skeleton animation="pulse" sx={{ p: 2 }} style={{ maxWidth: '100%' }} />
      )
        : (
          <Paper elevation={3} sx={{ m: 1, p: 1 }}>
            <Typography>
              {`Welcome ${user?.given_name || user?.nickname}`}
            </Typography>
          </Paper>
        )}
    </Card>
  );
}
