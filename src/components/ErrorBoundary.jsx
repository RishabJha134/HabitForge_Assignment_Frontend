import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console for debugging
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReset = () => {
    // Clear error state to retry
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleClearStorage = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="text-6xl mb-4">😵</div>
            
            <h1 className="text-2xl font-bold text-gray-900">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-600">
              The app encountered an unexpected error. This might be due to corrupted data in your browser.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
              <h3 className="text-sm font-medium text-red-800 mb-2">Error Details:</h3>
              <p className="text-xs text-red-700 font-mono break-all">
                {this.state.error && this.state.error.toString()}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              
              <button
                onClick={this.handleClearStorage}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Clear All Data & Restart
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Reload Page
              </button>
            </div>

            <div className="text-xs text-gray-500">
              <p>If the problem persists, please contact support.</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
