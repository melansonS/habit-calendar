import React from 'react';
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
import { useTheme } from './context/themeContext';
import { useUser } from './context/userContext';
import { useAlert } from './context/alertContext';
import AlertContainer from './components/AlertContainer';
import CatchAllRedirect from './pages/catchAllRedirect';

function App() {
  const { isLoading } = useAuth0();
  const { isThemeLoading } = useTheme();
  const { isUserLoading } = useUser();
  const { alerts } = useAlert();

  return (
    <Container
      sx={{ pt: { xs: 13, sm: 15 }, pb: 2 }}
      maxWidth="md"
      className="App"
    >
      <CssBaseline />
      <Paper>
        <Router>
          <NavBar />
          {isLoading || isThemeLoading || isUserLoading
            ? (
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading || isThemeLoading || isUserLoading}
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
                <Route path="*" element={<CatchAllRedirect />} />
              </Routes>
            )}
        </Router>
      </Paper>
      {alerts.length > 0 && <AlertContainer />}
    </Container>
  );
}

export default App;
