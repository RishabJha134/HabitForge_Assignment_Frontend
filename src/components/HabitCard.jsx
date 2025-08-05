import React from 'react';
import { useHabits } from '../context/HabitContext';

const HabitCard = ({ habit, darkMode }) => {
  const { toggleHabitDay, deleteHabit, calculateStreak } = useHabits();

  // Days of the week
  const days = [
    { key: 'monday', label: 'Mon' },
    { key: 'tuesday', label: 'Tue' },
    { key: 'wednesday', label: 'Wed' },
    { key: 'thursday', label: 'Thu' },
    { key: 'friday', label: 'Fri' },
    { key: 'saturday', label: 'Sat' },
    { key: 'sunday', label: 'Sun' }
  ];

  // Calculate streak
  const streak = calculateStreak(habit);

  // Ensure habit has required properties
  if (!habit || !habit.id) {
    return null;
  }

  // Ensure completedDays exists
  const completedDays = habit.completedDays || {
    monday: false, tuesday: false, wednesday: false, thursday: false,
    friday: false, saturday: false, sunday: false
  };

  // Handle day toggle
  const handleDayToggle = (day) => {
    try {
      if (!day || !habit.id) {
        console.error('Invalid day or habit ID');
        return;
      }
      toggleHabitDay(habit.id, day);
    } catch (error) {
      console.error('Error toggling day:', error);
    }
  };

  // Handle delete
  const handleDelete = () => {
    try {
      if (window.confirm(`Are you sure you want to delete "${habit.name || 'this habit'}"?`)) {
        deleteHabit(habit.id);
      }
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  const cardClass = darkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  return (
    <div className={`${cardClass} rounded-lg border p-6 hover:shadow-lg transition-shadow`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {/* Color Badge */}
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: habit.color || '#3B82F6' }}
            />
            <h3 className="text-lg font-semibold">{habit.name || 'Unnamed Habit'}</h3>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <span className={`px-2 py-1 rounded-full text-xs ${
              darkMode 
                ? 'bg-gray-700 text-gray-300' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {habit.category || 'Other'}
            </span>
            
            {streak > 0 && (
              <span className="flex items-center space-x-1 text-orange-600">
                <span>🔥</span>
                <span className="font-medium">{streak} day{streak !== 1 ? 's' : ''}</span>
              </span>
            )}
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className={`p-2 rounded-lg transition-colors ${
            darkMode 
              ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
              : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
          }`}
          title="Delete habit"
        >
          🗑️
        </button>
      </div>

      {/* Days Grid */}
      <div className="space-y-3">
        <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Weekly Progress
        </h4>
        
        <div className="grid grid-cols-7 gap-2">
          {days.map(day => {
            const isCompleted = completedDays[day.key] === true;
            
            return (
              <div key={day.key} className="text-center">
                {/* Day Label */}
                <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {day.label}
                </div>
                
                {/* Day Toggle Button */}
                <button
                  onClick={() => handleDayToggle(day.key)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 ${
                    isCompleted
                      ? 'bg-green-500 border-green-500 text-white hover:bg-green-600'
                      : darkMode
                        ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                  title={`${isCompleted ? 'Mark as not done' : 'Mark as done'} for ${day.label}`}
                >
                  {isCompleted ? '✓' : ''}
                </button>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Progress
            </span>
            <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {Object.values(completedDays).filter(Boolean).length}/7 days
            </span>
          </div>
          
          <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div 
              className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-300"
              style={{ 
                width: `${(Object.values(completedDays).filter(Boolean).length / 7) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
