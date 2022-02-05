import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import {
  Backdrop,
  CircularProgress,
  Container,
  Paper,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from './components/protectedRoute';
import NavBar from './components/navBar';
import HomePage from './pages/homePage';
import ProfilePage from './pages/profilePage';
import CalendarPage from './pages/calendarPage';
import ThemePage from './pages/themePage';

function App() {
  const { isLoading } = useAuth0();
  return (
    <Container sx={{ pt: 15 }} maxWidth="xl" className="App">
      <CssBaseline />
      <Paper>
        <Router>
          <NavBar />
          {isLoading
            ? (
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )
            : (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
                <Route path="/calendar" element={<ProtectedRoute element={<CalendarPage />} />} />
                <Route path="/theme" element={<ProtectedRoute element={<ThemePage />} />} />
              </Routes>
            )}
        </Router>
      </Paper>
    </Container>
  );
}

export default App;
