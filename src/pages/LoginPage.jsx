import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validate mobile number (10 digits)
  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  // Validate password (4 digits)
  const validatePassword = (password) => {
    const passwordRegex = /^[0-9]{4}$/;
    return passwordRegex.test(password);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validation
    if (!validateMobile(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError('Please enter a valid 4-digit password');
      setIsLoading(false);
      return;
    }

    // Attempt login
    const result = login(mobile, password);
    
    if (result.success) {
      setSuccess(result.message);
      // Clear form
      setMobile('');
      setPassword('');
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  // Handle mobile input (only numbers, max 10 digits)
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      setMobile(value);
    }
  };

  // Handle password input (only numbers, max 4 digits)
  const handlePasswordChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 4) {
      setPassword(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎯 HabitForge
          </h1>
          <p className="text-gray-600">
            Build better habits, forge a better you
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Login / Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mobile Number Input */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={handleMobileChange}
                placeholder="Enter 10-digit mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                autoComplete="tel"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                10 digits only (e.g., 9876543210)
              </p>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password (OTP-style)
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter 4-digit password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                autoComplete="current-password"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                4 digits only (e.g., 1234)
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Please wait...' : 'Login / Sign Up'}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">How it works:</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Enter your mobile number and create a 4-digit password</li>
              <li>• New users will be automatically registered</li>
              <li>• Existing users just need to enter correct password</li>
              <li>• Your habits are saved securely in your browser</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
