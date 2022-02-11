import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone';
import Container from '@mui/material/Container';
import { useAuth0 } from '@auth0/auth0-react';
import DarkModeToggle from './darkModeToggle';
import LogoutButton from './logoutButton';
import NavMenu from './navMenu';

function NavBar() {
  const { isAuthenticated } = useAuth0();

  return (
    <AppBar color="primary" sx={{ p: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>

          <Box sx={{ width: '33%', display: { xs: 'flex' } }}>
            {isAuthenticated && (<NavMenu />)}
          </Box>

          <Box sx={{
            width: '33%',
            display: 'flex',
            justifyContent: 'center',
          }}
          >
            <DateRangeTwoToneIcon fontSize="large" />
          </Box>

          <Box sx={{
            width: '33%',
            display: 'flex',
            justifyContent: 'end',
          }}
          >
            <DarkModeToggle />
            {isAuthenticated && (<LogoutButton />)}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
