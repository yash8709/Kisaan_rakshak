import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PestDetectionPage from './pages/PestDetectionPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import ExpertConnectPage from './pages/ExpertConnectPage';
import './index.css';

import ChatWindow from './assistant/components/ChatWindow';
import { AIProvider } from './assistant/context/AIContext';
import PublicRoute from './components/auth/PublicRoute';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

// ... imports

function App() {
  return (
    <AuthProvider>
      <AIProvider>
        <Router>
          <ChatWindow /> {/* Global Assistant Overlay */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              }
            />
            <Route
              path="/detect"
              element={
                <ProtectedRoute>
                  <PestDetectionPage />
                </ProtectedRoute>
              }
            />


            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/connect"
              element={
                <ProtectedRoute>
                  <ExpertConnectPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AIProvider>
    </AuthProvider>
  );
}

export default App;
