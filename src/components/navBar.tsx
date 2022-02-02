import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

function NavBar() {
  return (
    <header className="App-header">
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/calendar">Calendar</Link>
      <Typography variant="h3" gutterBottom>MUI Typescript Playground</Typography>
      <Typography variant="h5" gutterBottom>Subtitle ✨</Typography>
    </header>
  );
}

export default NavBar;
