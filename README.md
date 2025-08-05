# 🎯 HabitForge - Frontend Habit Tracker

A beautiful, responsive habit tracker application built with React that supports multiple users and helps you build better habits, one day at a time.

## 📱 Live Demo
[View Live Demo](https://your-habit-forge-app.vercel.app) *(Deploy to get the actual link)*

## ✨ Features

### 🔐 Authentication (Frontend-only)
- **Multi-user support** - Multiple users can use the same app
- **Mobile + OTP-style login** - 10-digit mobile number + 4-digit password
- **Automatic registration** - New users are registered automatically
- **Secure storage** - User data stored safely in browser localStorage

### 🎯 Habit Management
- **Create custom habits** - Add habits with name, category, and color
- **7-day tracking grid** - Track habits across a full week (Mon-Sun)
- **Visual progress** - Beautiful progress bars and completion indicators
- **Categories** - Organize habits by Fitness, Health, Study, Work, etc.
- **Color coding** - Customize each habit with unique colors
- **Streak tracking** - See how many consecutive days you've completed

### 🎨 User Experience
- **Dark mode** - Toggle between light and dark themes
- **Responsive design** - Works perfectly on desktop, tablet, and mobile
- **Smooth animations** - Delightful micro-interactions
- **Intuitive interface** - Clean, modern design that's easy to use

### 💾 Data Management
- **Persistent storage** - All data saved in localStorage
- **User isolation** - Each user sees only their own habits
- **Data safety** - Works offline, no internet required
- **Clear options** - Easy to reset or clear all habits

## 🛠️ Tech Stack

- **React 18** - Modern React with functional components and hooks
- **Context API** - State management for auth and habits
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Vite** - Fast build tool and dev server
- **LocalStorage** - Browser storage for data persistence

## 🚀 Getting Started

### Prerequisites
- Node.js (14.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/habitforge.git
   cd habitforge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 📖 How to Use

### 1. Login/Sign Up
- Enter your 10-digit mobile number (e.g., 9876543210)
- Create a 4-digit password (e.g., 1234)
- New users are automatically registered
- Existing users just need to enter the correct password

### 2. Create Your First Habit
- Click the "Add Habit" button
- Enter a habit name (e.g., "Morning Exercise")
- Select a category (Fitness, Health, Study, etc.)
- Choose a color for your habit
- Click "Add Habit"

### 3. Track Your Progress
- Click on any day (Mon-Sun) to mark it as complete
- Watch your progress bar fill up
- Build streaks by completing consecutive days
- View your completion statistics

### 4. Manage Your Habits
- Delete habits you no longer need
- Use the "Clear All" button to start fresh
- Toggle dark mode for comfortable viewing
- Logout to switch users

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── AddHabitForm.jsx    # Form for creating new habits
│   └── HabitCard.jsx       # Individual habit display card
├── context/            # React Context providers
│   ├── AuthContext.jsx     # Authentication state management
│   └── HabitContext.jsx    # Habit state management
├── pages/              # Main page components
│   ├── LoginPage.jsx       # Login/signup interface
│   └── Dashboard.jsx       # Main habit tracking dashboard
├── utils/              # Utility functions
│   └── helpers.js          # Common helper functions
├── App.jsx             # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles with Tailwind
```

## 🔄 State Management Architecture

### AuthContext
- Manages user authentication state
- Handles login/logout functionality
- Stores current user information
- Manages user registration

### HabitContext
- Manages habit CRUD operations
- Handles day toggling for habits
- Calculates streaks and statistics
- Manages user-specific habit isolation

## 📱 Key Components

### LoginPage
- Mobile number validation (10 digits)
- Password validation (4 digits)
- User registration and authentication
- Form validation and error handling

### Dashboard
- User statistics display
- Habit management interface
- Dark mode toggle
- User actions (logout, clear habits)

### HabitCard
- 7-day progress grid
- Day toggling functionality
- Streak calculation
- Habit deletion

### AddHabitForm
- Habit creation form
- Category selection
- Color picker
- Form validation

## 💾 Data Storage

All data is stored in browser localStorage:

- **Users**: `habitForgeUsers` - Array of user objects
- **Current User**: `currentUser` - Currently logged-in user
- **Habits**: `habitForgeHabits` - Object with user IDs as keys
- **Settings**: `habitForgeSettings` - App settings and preferences

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom CSS** for animations and special effects
- **Dark mode** support throughout the app
- **Responsive design** for all screen sizes
- **Smooth transitions** and hover effects

## 🔒 Security Considerations

⚠️ **Important**: This is a frontend-only application with limitations:

- Passwords are stored in plain text in localStorage
- No real encryption or secure authentication
- Data is stored locally and can be cleared
- Not suitable for production without proper backend security

## 🌟 Future Enhancements

- [ ] Habit templates and suggestions
- [ ] Weekly/monthly habit reports
- [ ] Habit sharing with friends
- [ ] Reminder notifications
- [ ] Data export/import functionality
- [ ] Habit analytics and insights
- [ ] Custom habit frequencies (not just daily)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Built as part of a Frontend Development internship assignment
- Inspired by habit tracking apps like Habitica and Streaks
- Icons and emojis from various sources
- Tailwind CSS for the amazing styling system

## 📞 Contact

- **Developer**: [Your Name]
- **Email**: [your.email@example.com]  
- **LinkedIn**: [Your LinkedIn Profile]
- **GitHub**: [Your GitHub Profile]
- **Phone**: [Your Contact Number]

---

**Happy Habit Building! 🎯**
