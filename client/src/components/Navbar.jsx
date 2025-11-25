import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Sparkles } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme(); return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div onClick={() => navigate('/')} className="flex items-center space-x-2 cursor-pointer">
                        <div className="relative">
                            <Sparkles className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                            <div className="absolute inset-0 blur-xl bg-primary-400/30 dark:bg-primary-600/30 animate-pulse"></div>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                            Resume Genie
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button onClick={() => { navigate('/'); setTimeout(() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                            Features
                        </button>
                        <button onClick={() => { navigate('/'); setTimeout(() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                            How It Works
                        </button>
                        <button onClick={() => navigate('/templates')} className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                            Templates
                        </button>
                    </div>

                    {/* Right side - Theme toggle and CTA */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            ) : (
                                <Sun className="w-5 h-5 text-gray-300" />
                            )}
                        </button>

                        {/* CTA Button */}
                        <button onClick={() => navigate('/create')} className="hidden sm:block px-6 py-2.5 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
