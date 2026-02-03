import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useDarkMode from '../hooks/useDarkMode';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, Languages, Menu, X, LogOut, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [colorTheme, setTheme] = useDarkMode();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Scroll state for glass effect
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    // Check system preference on mount
    useEffect(() => {
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
        if (!localStorage.getItem('theme') && matchMedia.matches) {
            setTheme('dark');
        }
    }, [setTheme]);

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

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        ...(currentUser ? [
            { name: t('nav.detect'), path: '/detect' },
            { name: t('nav.dashboard'), path: '/dashboard' }
        ] : [])
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/90 dark:bg-[#022c22]/95 backdrop-blur-md shadow-lg py-3 border-b border-gray-100 dark:border-white/5'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <motion.span
                            whileHover={{ rotate: 20 }}
                            className="text-4xl transition-transform cursor-pointer"
                        >
                            🌱
                        </motion.span>
                        <span className={`text-2xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-slate-800 dark:text-white' : 'text-slate-900 dark:text-white drop-shadow-sm'}`}>
                            <span className="text-agri-green">Kisaan</span> Rakshak
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} className="relative group p-2">
                                <span className={`font-medium text-lg transition-colors ${isScrolled
                                    ? 'text-slate-600 dark:text-gray-200 group-hover:text-agri-green dark:group-hover:text-agri-green'
                                    : 'text-slate-700 dark:text-white/90 hover:text-agri-green dark:hover:text-white'
                                    }`}>
                                    {link.name}
                                </span>
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-agri-green"
                                    />
                                )}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-agri-green/50 transition-all group-hover:w-full opacity-50"></span>
                            </Link>
                        ))}

                        {/* Actions */}
                        <div className={`flex items-center space-x-4 pl-6 border-l ${isScrolled ? 'border-gray-200 dark:border-white/20' : 'border-gray-300 dark:border-white/20'}`}>

                            {/* Lang Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleLanguage}
                                className={`p-2 rounded-full transition ${isScrolled
                                    ? 'text-slate-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                                    : 'text-slate-700 dark:text-white hover:bg-black/5 dark:hover:bg-white/20'
                                    }`}
                            >
                                <Languages size={20} />
                            </motion.button>

                            {/* Theme Toggle - Premium Switch */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleDarkMode}
                                className={`relative inline-flex h-9 w-16 items-center rounded-full transition-all duration-300 focus:outline-none 
                                ${colorTheme === 'light'
                                        ? 'bg-slate-200 dark:bg-white/10'
                                        : 'bg-white border-2 border-slate-200 dark:border-none' // Sun mode bg
                                    }
                                ${isScrolled ? 'shadow-inner' : 'backdrop-blur-sm bg-white/30 dark:bg-black/30'}
                                `}
                            >
                                <span className="sr-only">Toggle Dark Mode</span>
                                <span
                                    className={`${colorTheme === 'light'
                                        ? 'translate-x-8 bg-slate-800'
                                        : 'translate-x-1 bg-yellow-400'
                                        } 
                                    inline-block h-7 w-7 transform rounded-full transition-transform duration-300 flex items-center justify-center shadow-lg`}
                                >
                                    {colorTheme === 'light' ? (
                                        <Moon size={14} className="text-white" />
                                    ) : (
                                        <Sun size={14} className="text-white" />
                                    )}
                                </span>
                            </motion.button>

                            {/* Auth Button */}
                            {currentUser ? (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all text-sm font-bold border border-red-500/20"
                                >
                                    <LogOut size={16} /> <span>Logout</span>
                                </motion.button>
                            ) : (
                                <Link to="/login">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-agri-green text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all"
                                    >
                                        Login
                                    </motion.button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2 rounded-lg ${isScrolled ? 'text-slate-800 dark:text-white' : 'text-slate-800 dark:text-white'}`}
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-[#022c22] border-t border-gray-100 dark:border-white/10 overflow-hidden shadow-xl"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-gray-200 hover:bg-agri-green/10 dark:hover:bg-white/10 hover:text-agri-green dark:hover:text-green-400 transition-colors flex justify-between items-center"
                                >
                                    {link.name}
                                    <ChevronRight size={16} className="opacity-50" />
                                </Link>
                            ))}
                            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/10 flex justify-between items-center px-4">
                                <span className="text-sm text-slate-500 dark:text-gray-400">Settings</span>
                                <div className="flex gap-4">
                                    <button onClick={toggleLanguage} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-slate-700 dark:text-white"><Languages size={20} /></button>
                                    <button onClick={toggleDarkMode} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-slate-700 dark:text-white">
                                        {colorTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                                    </button>
                                </div>
                            </div>
                            {!currentUser && (
                                <div className="p-4">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                        <button className="w-full bg-agri-green text-white py-3 rounded-xl font-bold shadow-lg shadow-green-500/20">
                                            Login / Signup
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
