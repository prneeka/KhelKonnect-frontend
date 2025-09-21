import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Events from './components/Events';
import Places from './components/Places';
import Sports from './components/Sports';
import About from './components/About';
import Login from './components/Login';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import OtpLogin from './components/OtpLogin';
import OrganizerDashboard from './components/OrganizeDashboard';
import ChessDashboard from './components/chess/ChessDashboard';
import EventsList from './components/UserEvents/EventsList';
import EventDetails from './components/UserEvents/EventDetails';
import RegistrationPage from './components/UserEvents/RegistrationPage';
import UserDashboard from './components/UserDashboard/Dashboard'; // Import the new dashboard
import './App.css';
import './fonts.css';

// Temporary sport detail placeholder
const SportDetail = () => {
  return (
    <div style={{ padding: '80px', textAlign: 'center', fontSize: '24px' }}>
      Coming Soon...
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page - no navbar */}
        <Route path="/login" element={<Login />} />

        {/* Signin page - no navbar */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Homepage with navbar and all sections */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Landing />
              <Events />
              <Places />
              <Sports />
              <About />
            </>
          }
        />

        {/* Dynamic sports detail page */}
        <Route path="/sports/:sportName" element={<SportDetail />} />
        <Route path="/otps" element={<OtpLogin />} />
        <Route path="/Organized" element={<OrganizerDashboard />} />
        <Route path="/chess-dashboard" element={<ChessDashboard />} />

        {/* User Event Registration */}
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/register/:eventId/:sportId" element={<RegistrationPage />} />

        {/* Add the new User Dashboard route */}
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

