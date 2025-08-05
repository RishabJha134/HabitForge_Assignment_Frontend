import React, { useState } from 'react';
import { useHabits } from '../context/HabitContext';

const AddHabitForm = ({ onSuccess, darkMode }) => {
  const { addHabit } = useHabits();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    color: '#3B82F6' // Default blue color
  });
  const [error, setError] = useState('');

  // Predefined categories
  const categories = [
    'Fitness', 'Health', 'Study', 'Work', 'Personal', 
    'Mindfulness', 'Social', 'Hobby', 'Finance', 'Other'
  ];

  // Predefined colors
  const colors = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Yellow', value: '#EAB308' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Cyan', value: '#06B6D4' },
    { name: 'Emerald', value: '#059669' }
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.name.trim()) {
      setError('Please enter a habit name');
      return;
    }

    if (formData.name.trim().length < 2) {
      setError('Habit name must be at least 2 characters long');
      return;
    }

    if (formData.name.trim().length > 50) {
      setError('Habit name must be less than 50 characters');
      return;
    }

    if (!formData.category) {
      setError('Please select a category');
      return;
    }

    try {
      // Add the habit
      addHabit({
        name: formData.name.trim(),
        category: formData.category,
        color: formData.color
      });

      // Reset form
      setFormData({
        name: '',
        category: '',
        color: '#3B82F6'
      });

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error adding habit:', error);
      setError('Failed to add habit. Please try again.');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const inputClass = darkMode 
    ? 'w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
    : 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors';

  const selectClass = darkMode
    ? 'w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
    : 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors';

  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-lg p-6`}>
      <h3 className="text-lg font-semibold mb-4">Add New Habit</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Habit Name */}
        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            Habit Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Morning Exercise, Read for 30 minutes"
            className={inputClass}
            maxLength={50}
          />
        </div>

        {/* Category */}
        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Color Selection */}
        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            Color Badge
          </label>
          <div className="grid grid-cols-5 gap-2">
            {colors.map(color => (
              <button
                key={color.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                className={`w-12 h-12 rounded-lg border-2 transition-all ${
                  formData.color === color.value 
                    ? 'border-gray-900 scale-110' 
                    : 'border-gray-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
          
          {/* Custom Color Input */}
          <div className="mt-2">
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              title="Custom color"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add Habit
          </button>
          <button
            type="button"
            onClick={onSuccess}
            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHabitForm;
