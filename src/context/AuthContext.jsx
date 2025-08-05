import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in when app loads
  useEffect(() => {
    try {
      const loggedInUser = localStorage.getItem('currentUser');
      if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        // Validate user data structure
        if (userData && userData.id && userData.mobile) {
          setCurrentUser(userData);
        } else {
          // Corrupted user data, clear it
          localStorage.removeItem('currentUser');
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Clear corrupted data
      localStorage.removeItem('currentUser');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = (mobile, password) => {
    try {
      // Validate inputs
      if (!mobile || !password) {
        return { success: false, message: 'Mobile number and password are required!' };
      }

      // Get all users from localStorage
      const users = JSON.parse(localStorage.getItem('habitForgeUsers') || '[]');
      
      // Check if user exists
      const existingUser = users.find(user => user.mobile === mobile);
      
      if (existingUser) {
        // User exists, check password
        if (existingUser.password === password) {
          // Login successful
          setCurrentUser(existingUser);
          localStorage.setItem('currentUser', JSON.stringify(existingUser));
          return { success: true, message: 'Login successful!' };
        } else {
          // Wrong password
          return { success: false, message: 'Invalid password!' };
        }
      } else {
        // New user - register them
        const newUser = {
          id: Date.now().toString(), // Simple ID generation
          mobile,
          password,
          createdAt: new Date().toISOString()
        };
        
        // Add to users array
        users.push(newUser);
        localStorage.setItem('habitForgeUsers', JSON.stringify(users));
        
        // Set as current user
        setCurrentUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        return { success: true, message: 'Account created and logged in!' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Something went wrong! Please try again.' };
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Context value
  const value = {
    currentUser,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
