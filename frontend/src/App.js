import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Events from './components/Events';
import Places from './components/Places';
import Sports from './components/Sports';
import About from './components/About';
import Login from './components/Login';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import LoginOtp from './components/LoginOtp';
import OrganizerDashboard from './components/OragnizeDashboard/OrganizeDashboard';
import ChessDashboard from './components/chess/ChessDashboard';
import EventsList from './components/UserEvents/EventsList';
import EventDetails from './components/UserEvents/EventDetails';
import RegistrationPage from './components/UserEvents/RegistrationPage';
import OtpSendPage from './components/Otpsendpage';
import ProtectedRoute from './context/ProtectedRoute';
import Unauthorized from './components/Unauthorized';
import UserDashboard from './components/UserDashboard/Dashboard';
import './App.css';
import './fonts.css';

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/* Wrap entire app with AuthProvider */}
        <Router>
          <Routes>
            {/* Homepage route */}
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
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/events" element={<EventsList />} />


            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/otpsend" element={<OtpSendPage />} />
            <Route path="/login-otp" element={<LoginOtp />} />
            
            {/* Protected routes */}
            <Route 
              path="/Organized" 
              element={
                <ProtectedRoute requiredRole="organisation">
                  <OrganizerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chess-dashboard" 
              element={
                <ProtectedRoute requiredRole="organisation">
                  <ChessDashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />

            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route 
              path="/register/:eventId/:sportId" 
              element={
                <ProtectedRoute requiredRole="user">
                  <RegistrationPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Unauthorized page */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Redirect unknown routes to homepage */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default App;