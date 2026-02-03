import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useDarkMode from '../hooks/useDarkMode';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, Languages, Menu, X, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [colorTheme, setTheme] = useDarkMode();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'hi' : 'en';
        i18n.changeLanguage(newLang);
    };

    const toggleDarkMode = () => {
        setTheme(colorTheme);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch {
            console.error('Failed to logout');
        }
    };

    return (
        <nav className="bg-white/80 dark:bg-agri-dark/90 backdrop-blur-md text-gray-800 dark:text-white shadow-md sticky top-0 z-50 transition-colors duration-300 border-b border-gray-200 dark:border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <Link to="/" className="flex items-center space-x-2 group">
                        <span className="text-3xl transition-transform group-hover:scale-110">🌱</span>
                        <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Kisaan Rakshak</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="hover:text-green-600 dark:hover:text-green-400 font-medium transition relative group">
                            {t('nav.home')}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
                        </Link>

                        {currentUser && (
                            <>
                                <Link to="/detect" className="hover:text-green-600 dark:hover:text-green-400 font-medium transition relative group">
                                    {t('nav.detect')}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
                                </Link>
                                <Link to="/dashboard" className="hover:text-green-600 dark:hover:text-green-400 font-medium transition relative group">
                                    {t('nav.dashboard')}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
                                </Link>
                            </>
                        )}

                        {/* Actions */}
                        <div className="flex items-center space-x-3 pl-6 border-l border-gray-200 dark:border-gray-700">
                            <button onClick={toggleLanguage} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition text-gray-600 dark:text-gray-300">
                                <Languages size={20} />
                            </button>
                            <button
                                onClick={toggleDarkMode}
                                className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none"
                            >
                                <span className="sr-only">Toggle theme</span>
                                <span
                                    className={`${colorTheme === 'light' ? 'translate-x-7 bg-gray-800' : 'translate-x-1 bg-white'
                                        } inline-block h-6 w-6 transform rounded-full transition-transform duration-300 flex items-center justify-center`}
                                >
                                    {colorTheme === 'light' ? <Moon size={14} className="text-white" /> : <Sun size={14} className="text-yellow-500" />}
                                </span>
                            </button>

                            {currentUser ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-full hover:bg-red-100 transition text-sm font-bold"
                                >
                                    <LogOut size={16} /> <span>Logout</span>
                                </button>
                            ) : (
                                <Link to="/login" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition font-bold shadow-lg hover:shadow-green-500/30">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
