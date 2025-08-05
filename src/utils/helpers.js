export const STORAGE_KEYS = {
  USERS: 'habitForgeUsers',
  CURRENT_USER: 'currentUser',
  HABITS: 'habitForgeHabits',
  SETTINGS: 'habitForgeSettings'
};

export const validateMobile = (mobile) => {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobile);
};

export const validatePassword = (password) => {
  const passwordRegex = /^[0-9]{4}$/;
  return passwordRegex.test(password);
};

export const formatMobile = (mobile) => {
  if (!mobile || mobile.length !== 10) return mobile;
  return `${mobile.slice(0, 3)}-${mobile.slice(3, 6)}-${mobile.slice(6)}`;
};

export const getCurrentDay = () => {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
};

export const getDaysOfWeek = () => {
  return [
    { key: 'monday', label: 'Mon', full: 'Monday' },
    { key: 'tuesday', label: 'Tue', full: 'Tuesday' },
    { key: 'wednesday', label: 'Wed', full: 'Wednesday' },
    { key: 'thursday', label: 'Thu', full: 'Thursday' },
    { key: 'friday', label: 'Fri', full: 'Friday' },
    { key: 'saturday', label: 'Sat', full: 'Saturday' },
    { key: 'sunday', label: 'Sun', full: 'Sunday' }
  ];
};

export const calculateCompletionPercentage = (habit) => {
  const completedDays = Object.values(habit.completedDays).filter(Boolean).length;
  return Math.round((completedDays / 7) * 100);
};

export const calculateStreak = (habit) => {
  const days = getDaysOfWeek();
  let streak = 0;
  
  for (const day of days) {
    if (habit.completedDays[day.key]) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

export const getHabitSuggestions = () => {
  return [
    { name: 'Drink 8 glasses of water', category: 'Health', color: '#06B6D4' },
    { name: 'Exercise for 30 minutes', category: 'Fitness', color: '#10B981' },
    { name: 'Read for 20 minutes', category: 'Study', color: '#8B5CF6' },
    { name: 'Meditate for 10 minutes', category: 'Mindfulness', color: '#EC4899' },
    { name: 'Write in journal', category: 'Personal', color: '#F97316' },
    { name: 'Take vitamins', category: 'Health', color: '#EAB308' },
    { name: 'Go for a walk', category: 'Fitness', color: '#059669' },
    { name: 'Practice gratitude', category: 'Mindfulness', color: '#6366F1' },
    { name: 'Learn a new word', category: 'Study', color: '#3B82F6' },
    { name: 'Call family/friends', category: 'Social', color: '#EF4444' }
  ];
};

export const exportUserData = (userId) => {
  try {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
    const habits = JSON.parse(localStorage.getItem(STORAGE_KEYS.HABITS)) || {};
    
    const user = users.find(u => u.id === userId);
    const userHabits = habits[userId] || [];
    
    const exportData = {
      user: { ...user, password: undefined },
      habits: userHabits,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Export error:', error);
    return null;
  }
};

export const safeLocalStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

export const habitColors = [
  { name: 'Blue', value: '#3B82F6', light: '#DBEAFE' },
  { name: 'Green', value: '#10B981', light: '#D1FAE5' },
  { name: 'Purple', value: '#8B5CF6', light: '#EDE9FE' },
  { name: 'Pink', value: '#EC4899', light: '#FCE7F3' },
  { name: 'Red', value: '#EF4444', light: '#FEE2E2' },
  { name: 'Orange', value: '#F97316', light: '#FED7AA' },
  { name: 'Yellow', value: '#EAB308', light: '#FEF3C7' },
  { name: 'Indigo', value: '#6366F1', light: '#E0E7FF' },
  { name: 'Cyan', value: '#06B6D4', light: '#CFFAFE' },
  { name: 'Emerald', value: '#059669', light: '#D1FAE5' }
];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * habitColors.length);
  return habitColors[randomIndex].value;
};
