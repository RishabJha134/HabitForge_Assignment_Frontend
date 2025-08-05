import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const loggedInUser = localStorage.getItem('currentUser');
      if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        if (userData && userData.id && userData.mobile) {
          setCurrentUser(userData);
        } else {
          localStorage.removeItem('currentUser');
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      localStorage.removeItem('currentUser');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (mobile, password) => {
    try {
      if (!mobile || !password) {
        return { success: false, message: 'Mobile number and password are required!' };
      }

      const users = JSON.parse(localStorage.getItem('habitForgeUsers') || '[]');
      
      const existingUser = users.find(user => user.mobile === mobile);
      
      if (existingUser) {
        if (existingUser.password === password) {
          setCurrentUser(existingUser);
          localStorage.setItem('currentUser', JSON.stringify(existingUser));
          return { success: true, message: 'Login successful!' };
        } else {
          return { success: false, message: 'Invalid password!' };
        }
      } else {
        const newUser = {
          id: Date.now().toString(),
          mobile,
          password,
          createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('habitForgeUsers', JSON.stringify(users));
        
        setCurrentUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        return { success: true, message: 'Account created and logged in!' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Something went wrong! Please try again.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

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
