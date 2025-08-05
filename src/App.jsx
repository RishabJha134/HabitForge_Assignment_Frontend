import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HabitProvider } from './context/HabitContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

// Main App Content Component
const AppContent = () => {
  const { currentUser, isLoading } = useAuth();

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading HabitForge...</p>
        </div>
      </div>
    );
  }

  // Show login page if no user is logged in
  if (!currentUser) {
    return <LoginPage />;
  }

  // Show dashboard if user is logged in
  return <Dashboard />;
};

// Main App Component
const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <HabitProvider>
          <AppContent />
        </HabitProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;