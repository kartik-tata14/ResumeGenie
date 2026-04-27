import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({ errorInfo });
    }

    resetError = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 pt-20">
                    <div className="text-center max-w-md">
                        <div className="mb-4 flex justify-center">
                            <AlertTriangle className="w-16 h-16 text-red-500" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                            Something Went Wrong
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                            Please try refreshing the page or go back to start over.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                            >
                                Refresh Page
                            </button>
                            <a
                                href="/"
                                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                Go Home
                            </a>
                        </div>
                        {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                            <details className="mt-6 text-left">
                                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                                    Error details (dev only)
                                </summary>
                                <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 overflow-auto text-xs rounded border border-gray-300 dark:border-gray-700">
                                    {this.state.error?.stack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
