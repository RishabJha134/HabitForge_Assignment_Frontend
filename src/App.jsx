import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { HabitProvider } from "./context/HabitContext";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const AppContent = () => {
  const { currentUser, isLoading } = useAuth();

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

  if (!currentUser) {
    return <LoginPage />;
  }

  return <Dashboard />;
};

const App = () => {
  return (
    <AuthProvider>
      <HabitProvider>
        <AppContent />
      </HabitProvider>
    </AuthProvider>
  );
};

export default App;
