import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHabits } from '../context/HabitContext';
import AddHabitForm from '../components/AddHabitForm';
import HabitCard from '../components/HabitCard';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { habits, clearAllHabits } = useHabits();
  const [showAddForm, setShowAddForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  // Handle clear all habits
  const handleClearAllHabits = () => {
    if (window.confirm('Are you sure you want to delete all your habits? This action cannot be undone.')) {
      clearAllHabits();
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const containerClass = darkMode 
    ? 'min-h-screen bg-gray-900 text-white' 
    : 'min-h-screen bg-gray-50 text-gray-900';

  const cardClass = darkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  return (
    <div className={containerClass}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Welcome */}
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">
                🎯 HabitForge
              </h1>
              <div className="hidden sm:block">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Welcome, {currentUser?.mobile}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                title="Toggle Dark Mode"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

              {/* Clear Habits Button */}
              {habits.length > 0 && (
                <button
                  onClick={handleClearAllHabits}
                  className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Clear All
                </button>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`${cardClass} rounded-lg border p-6`}>
            <h3 className="text-lg font-semibold mb-2">Total Habits</h3>
            <p className="text-3xl font-bold text-blue-600">{habits.length}</p>
          </div>
          
          <div className={`${cardClass} rounded-lg border p-6`}>
            <h3 className="text-lg font-semibold mb-2">Active Today</h3>
            <p className="text-3xl font-bold text-green-600">
              {habits.filter(habit => {
                try {
                  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                  return habit.completedDays && habit.completedDays[today];
                } catch (error) {
                  console.error('Error getting today:', error);
                  return false;
                }
              }).length}
            </p>
          </div>
          
          <div className={`${cardClass} rounded-lg border p-6`}>
            <h3 className="text-lg font-semibold mb-2">Avg Streak</h3>
            <p className="text-3xl font-bold text-purple-600">
              {habits.length > 0 
                ? Math.round(habits.reduce((sum, habit) => {
                    try {
                      if (!habit.completedDays || typeof habit.completedDays !== 'object') {
                        return sum;
                      }
                      const streak = Object.values(habit.completedDays).filter(Boolean).length;
                      return sum + streak;
                    } catch (error) {
                      console.error('Error calculating streak for habit:', habit.id, error);
                      return sum;
                    }
                  }, 0) / habits.length)
                : 0
              }
            </p>
          </div>
        </div>

        {/* Add Habit Section */}
        <div className={`${cardClass} rounded-lg border p-6 mb-8`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Habits</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>{showAddForm ? '✕' : '+'}</span>
              <span>{showAddForm ? 'Cancel' : 'Add Habit'}</span>
            </button>
          </div>

          {/* Add Habit Form */}
          {showAddForm && (
            <AddHabitForm 
              onSuccess={() => setShowAddForm(false)}
              darkMode={darkMode}
            />
          )}
        </div>

        {/* Habits List */}
        {habits.length === 0 ? (
          <div className={`${cardClass} rounded-lg border p-12 text-center`}>
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">No habits yet!</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Start building better habits by creating your first one.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Habit
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {habits.map(habit => (
              <HabitCard 
                key={habit.id} 
                habit={habit} 
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
