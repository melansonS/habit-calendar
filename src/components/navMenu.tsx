import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import pageList from '../utils/pageList';

export default function NavMenu() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<HTMLButtonElement | null>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElNav(event?.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (location: string) => {
    const destination = `/${location}`;
    if (destination !== window.location.pathname) {
      handleCloseNavMenu();
      navigate(destination);
    }
  };

  return (
    <>
      <IconButton
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
          <MenuItem key={page.name} onClick={() => handleNavigate(page.location)}>
            <Typography variant="body1">
              {page.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
