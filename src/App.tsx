import React, { useEffect } from 'react';
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
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently({
          audience: 'hcAuth',
          scope: 'read:current_user',
        });
        console.log({ accessToken });
        // const res = await fetch('http://localhost:8080/private', {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // });
        // const json = await res.json();
        // console.log(json);
      }
    };
    getToken();
  }, [isAuthenticated]);
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
