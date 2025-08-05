import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create the Habit Context
const HabitContext = createContext();

// Custom hook to use the Habit Context
export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};

// Habit Provider Component
export const HabitProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [habits, setHabits] = useState([]);

  // Load user's habits when user changes
  useEffect(() => {
    if (currentUser) {
      loadUserHabits(currentUser.id);
    } else {
      setHabits([]);
    }
  }, [currentUser]);

  // Load habits for a specific user
  const loadUserHabits = (userId) => {
    try {
      if (!userId) {
        setHabits([]);
        return;
      }
      
      const allHabits = JSON.parse(localStorage.getItem('habitForgeHabits') || '{}');
      const userHabits = allHabits[userId] || [];
      
      // Validate habit data structure
      const validHabits = userHabits.filter(habit => {
        return habit && 
               habit.id && 
               habit.name && 
               habit.completedDays && 
               typeof habit.completedDays === 'object';
      });
      
      setHabits(validHabits);
    } catch (error) {
      console.error('Error loading habits:', error);
      setHabits([]);
    }
  };

  // Save habits to localStorage
  const saveHabitsToStorage = (userHabits) => {
    try {
      const allHabits = JSON.parse(localStorage.getItem('habitForgeHabits')) || {};
      allHabits[currentUser.id] = userHabits;
      localStorage.setItem('habitForgeHabits', JSON.stringify(allHabits));
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  };

  // Add a new habit
  const addHabit = (habitData) => {
    if (!currentUser) {
      console.error('No user logged in');
      return;
    }

    // Validate habit data
    if (!habitData.name || !habitData.name.trim()) {
      console.error('Habit name is required');
      return;
    }

    try {
      const newHabit = {
        id: Date.now().toString(),
        name: habitData.name.trim(),
        category: habitData.category || 'Other',
        color: habitData.color || '#3B82F6',
        createdAt: new Date().toISOString(),
        completedDays: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false
        }
      };

      const updatedHabits = [...habits, newHabit];
      setHabits(updatedHabits);
      saveHabitsToStorage(updatedHabits);
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  // Toggle a day for a habit
  const toggleHabitDay = (habitId, day) => {
    if (!currentUser || !habitId || !day) {
      console.error('Invalid parameters for toggle habit day');
      return;
    }

    try {
      const updatedHabits = habits.map(habit => {
        if (habit.id === habitId) {
          // Ensure completedDays exists and is an object
          const completedDays = habit.completedDays || {
            monday: false, tuesday: false, wednesday: false, thursday: false,
            friday: false, saturday: false, sunday: false
          };
          
          return {
            ...habit,
            completedDays: {
              ...completedDays,
              [day]: !completedDays[day]
            }
          };
        }
        return habit;
      });

      setHabits(updatedHabits);
      saveHabitsToStorage(updatedHabits);
    } catch (error) {
      console.error('Error toggling habit day:', error);
    }
  };

  // Delete a habit
  const deleteHabit = (habitId) => {
    if (!currentUser) return;

    const updatedHabits = habits.filter(habit => habit.id !== habitId);
    setHabits(updatedHabits);
    saveHabitsToStorage(updatedHabits);
  };

  // Clear all habits for current user
  const clearAllHabits = () => {
    if (!currentUser) return;

    setHabits([]);
    saveHabitsToStorage([]);
  };

  // Calculate streak for a habit
  const calculateStreak = (habit) => {
    try {
      if (!habit || !habit.completedDays || typeof habit.completedDays !== 'object') {
        return 0;
      }
      
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      let streak = 0;
      
      // Count consecutive completed days from the start of the week
      for (const day of days) {
        if (habit.completedDays[day] === true) {
          streak++;
        } else {
          break;
        }
      }
      
      return streak;
    } catch (error) {
      console.error('Error calculating streak:', error);
      return 0;
    }
  };

  // Context value
  const value = {
    habits,
    addHabit,
    toggleHabitDay,
    deleteHabit,
    clearAllHabits,
    calculateStreak
  };

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
};
