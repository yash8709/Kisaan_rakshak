import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useDarkMode from '../hooks/useDarkMode';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, Languages, Menu, X, LogOut, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import logo from '../assets/logo-new.png';

const Navbar: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [colorTheme, setTheme] = useDarkMode();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
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
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md shadow-glass border-b border-surface-subtle dark:border-white/5 py-3'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    <div
                        className="relative z-50"
                        onMouseEnter={() => setIsLogoHovered(true)}
                        onMouseLeave={() => setIsLogoHovered(false)}
                    >
                        <Link to="/" className="flex items-center space-x-3 group relative z-10">
                            <motion.img
                                src={logo}
                                alt="Kisaan Rakshak"
                                whileHover={{ rotate: 10, scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover shadow-lg border-2 border-white/20"
                            />
                            <span className={`text-2xl font-display font-bold tracking-tight transition-colors ${isScrolled ? 'text-text-primary dark:text-white' : 'text-text-primary dark:text-white drop-shadow-sm'}`}>
                                <span className="text-agri-green">Kisaan</span> Rakshak
                            </span>
                        </Link>

                        {/* Large Logo Popup */}
                        <AnimatePresence>
                            {isLogoHovered && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 10, rotateX: -15 }}
                                    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 10, rotateX: 15 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{ transformPerspective: 1000 }}
                                    className="absolute top-16 left-0 w-64 h-64 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-surface-subtle dark:border-white/10 p-6 flex items-center justify-center z-50"
                                >
                                    <div className="relative w-full h-full rounded-full overflow-hidden shadow-inner border border-white/10 bg-white/5 p-2 flex items-center justify-center">
                                        <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                                            <img
                                                src={logo}
                                                alt="Kisaan Rakshak Large"
                                                className="w-full h-full object-cover scale-110"
                                            />
                                        </div>
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-50 pointer-events-none rounded-full" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1 bg-surface-subtle/50 dark:bg-surface-dark-subtle/30 backdrop-blur-md px-2 py-1.5 rounded-full border border-surface-subtle dark:border-white/5 shadow-inner">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link key={link.path} to={link.path} className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors">
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white dark:bg-white/10 shadow-sm rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className={`relative z-10 transition-colors ${isActive
                                        ? 'text-agri-dark dark:text-white font-semibold'
                                        : 'text-text-secondary dark:text-text-dark-secondary hover:text-text-primary dark:hover:text-white'
                                        }`}>
                                        {link.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleDarkMode}
                            className="p-2.5 rounded-full bg-surface-subtle/50 dark:bg-surface-dark-subtle/50 hover:bg-white dark:hover:bg-white/10 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-white/10"
                        >
                            {colorTheme === 'light' ? <Moon size={18} className="text-slate-600" /> : <Sun size={18} className="text-amber-400" />}
                        </motion.button>
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
                        className={`p-2 rounded-lg ${isScrolled ? 'text-text-primary dark:text-white' : 'text-text-primary dark:text-white'}`}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-surface-light dark:bg-surface-dark border-t border-surface-subtle dark:border-white/10 overflow-hidden shadow-xl"
                    >
                        <div className="px-4 pt-4 pb-8 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-4 py-3 rounded-xl text-base font-medium text-text-primary dark:text-gray-200 hover:bg-agri-green/10 dark:hover:bg-white/10 hover:text-agri-green dark:hover:text-green-400 transition-colors flex justify-between items-center"
                                >
                                    {link.name}
                                    <ChevronRight size={16} className="opacity-50" />
                                </Link>
                            ))}
                            <div className="pt-6 mt-6 border-t border-surface-subtle dark:border-white/10 flex justify-between items-center px-4">
                                <span className="text-sm font-medium text-text-secondary dark:text-gray-400">Appearance</span>
                                <div className="flex gap-4">
                                    <button onClick={toggleLanguage} className="p-2.5 bg-surface-subtle dark:bg-white/5 rounded-full text-text-primary dark:text-white border border-transparent hover:border-gray-200 dark:hover:border-white/20"><Languages size={20} /></button>
                                    <button onClick={toggleDarkMode} className="p-2.5 bg-surface-subtle dark:bg-white/5 rounded-full text-text-primary dark:text-white border border-transparent hover:border-gray-200 dark:hover:border-white/20">
                                        {colorTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                                    </button>
                                </div>
                            </div>
                            {!currentUser && (
                                <div className="p-4 mt-2">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                        <button className="w-full bg-agri-green text-white py-3.5 rounded-xl font-bold shadow-lg shadow-green-500/20 text-lg">
                                            Login / Signup
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav >
    );
};

export default Navbar;
