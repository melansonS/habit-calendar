import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import NavBar from './components/navBar';
import Homepage from './components/homePage';
import ProfilePage from './components/profilePage';
import CalendarPage from './components/calendarPage';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
