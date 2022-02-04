import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { Container, Paper } from '@mui/material';
import NavBar from './components/navBar';
import Homepage from './components/homePage';
import ProfilePage from './components/profilePage';
import CalendarPage from './components/calendarPage';

function App() {
  return (
    <Container style={{ paddingTop: '5em' }} maxWidth="xl" className="App">
      <CssBaseline />
      <Paper>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </Router>
      </Paper>
    </Container>
  );
}

export default App;
