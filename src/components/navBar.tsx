import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import pageList from '../utils/pageList';
import DarkModeToggle from './darkModeToggle';
import ThemeSelect from './ThemeSelector';
import LoginButton from './loginButton';

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState<HTMLButtonElement | null>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElNav(event?.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block' } }}
            >
              {pageList.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Button
                    component={RouterLink}
                    to={`/${page.location}`}
                    key={page.name}
                    onClick={handleCloseNavMenu}
                  >
                    {page.name}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="secondary"
            sx={{ flexGrow: 1, display: { xs: 'flex' } }}
          >
            <DateRangeTwoToneIcon fontSize="large" />
          </Typography>
          <Box p={2}>
            <ThemeSelect />
          </Box>
          <Box pr={3}>
            <DarkModeToggle />
          </Box>
          <Box pr={3}>
            <LoginButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
