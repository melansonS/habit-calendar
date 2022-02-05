import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { Container, Paper } from '@mui/material';
import ProtectedRoute from './components/protectedRoute';
import NavBar from './components/navBar';
import HomePage from './pages/homePage';
import ProfilePage from './pages/profilePage';
import CalendarPage from './pages/calendarPage';
import ThemePage from './pages/themePage';

function App() {
  return (
    <Container sx={{ pt: 15 }} maxWidth="xl" className="App">
      <CssBaseline />
      <Paper>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />

            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/theme" element={<ThemePage />} />
          </Routes>
        </Router>
      </Paper>
    </Container>
  );
}

export default App;
