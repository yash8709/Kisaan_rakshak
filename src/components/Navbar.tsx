import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useDarkMode from '../hooks/useDarkMode';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, Languages, Menu, X, LogOut, User, ChevronRight, LayoutDashboard, History } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform, useSpring } from 'framer-motion';
import logo from '../assets/logo-new.png';
import BreathingText from './ui/BreathingText';

const Navbar: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [colorTheme, setTheme] = useDarkMode();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsScrolled(latest > 20);
    });

    // Subtle animated top-border that ramps in as user scrolls
    const borderOpacity = useSpring(
        useTransform(scrollY, [0, 200], [0, 1]),
        { stiffness: 80, damping: 20 }
    );

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
        ...(currentUser
            ? [
                { name: t('nav.detect'), path: '/detect' },
                { name: t('nav.dashboard'), path: '/dashboard' },
                { name: 'Experts', path: '/connect' },
            ]
            : []),
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed w-full z-50 transition-all duration-500 ${
                isScrolled
                    ? 'bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md shadow-glass border-b border-surface-subtle dark:border-white/5 py-3'
                    : 'bg-transparent py-6'
            }`}
        >
            {/* Animated top-border highlight on scroll */}
            <motion.div
                style={{ opacity: borderOpacity }}
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <div className="relative z-50 md:flex-1 flex justify-start">
                        <Link
                            to="/"
                            className="flex items-center space-x-3 group relative z-10 w-[260px] md:w-[350px] flex-shrink-0"
                        >
                            <motion.img
                                src={logo}
                                alt="Kisaan Rakshak"
                                onMouseEnter={() => setIsLogoHovered(true)}
                                onMouseLeave={() => setIsLogoHovered(false)}
                                whileHover={{ rotate: 10, scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-full object-cover shadow-lg border-2 border-white/20"
                            />
                            <div
                                className={`text-3xl md:text-4xl font-display font-bold tracking-tight transition-colors flex items-center pt-1 ${
                                    isScrolled
                                        ? 'text-text-primary dark:text-white'
                                        : 'text-text-primary dark:text-white drop-shadow-sm'
                                }`}
                            >
                                <BreathingText
                                    staggerDuration={0.08}
                                    fromFontVariationSettings="'wght' 100, 'slnt' 0"
                                    toFontVariationSettings="'wght' 800, 'slnt' -10"
                                    className="text-agri-green mr-[0.3em]"
                                >
                                    Kisaan
                                </BreathingText>
                                <BreathingText
                                    staggerDuration={0.08}
                                    fromFontVariationSettings="'wght' 100, 'slnt' 0"
                                    toFontVariationSettings="'wght' 800, 'slnt' -10"
                                    delayOffset={0.08 * 6}
                                >
                                    Rakshak
                                </BreathingText>
                            </div>
                        </Link>

                        {/* Large logo popup — unchanged */}
                        <AnimatePresence>
                            {isLogoHovered && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 10, rotateX: -15 }}
                                    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 10, rotateX: 15 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    style={{ transformPerspective: 1000 }}
                                    className="absolute top-16 left-0 w-64 h-64 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-surface-subtle dark:border-white/10 p-6 flex items-center justify-center z-50 pointer-events-none"
                                >
                                    <div className="relative w-full h-full rounded-full overflow-hidden shadow-inner border border-white/10 bg-white/5 p-2 flex items-center justify-center">
                                        <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                                            <img
                                                src={logo}
                                                alt="Kisaan Rakshak Large"
                                                className="w-full h-full object-cover scale-110"
                                            />
                                        </div>
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Desktop nav links - SaaS Pill */}
                    <div className="hidden md:flex items-center justify-center shrink-0">
                        <div className="flex items-center gap-2 px-2 py-1.5 bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl rounded-full border border-emerald-500/10 dark:border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 group"
                                    >
                                        <span
                                            className={`relative z-10 transition-colors duration-200 ${
                                                isActive
                                                    ? 'text-emerald-700 dark:text-emerald-300 font-semibold'
                                                    : 'text-slate-600 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                                            }`}
                                        >
                                            {link.name}
                                        </span>

                                        {/* Hover background pill */}
                                        <span className="absolute inset-0 rounded-full bg-emerald-50/50 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                                        {/* Active background highlight */}
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-active-pill"
                                                className="absolute inset-0 rounded-full bg-white dark:bg-slate-700 shadow-sm border border-emerald-500/5 dark:border-white/5"
                                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right controls */}
                    <div className="hidden md:flex items-center justify-end gap-3 md:flex-1">
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={toggleLanguage}
                            className="p-2.5 bg-surface-subtle dark:bg-white/5 rounded-full text-text-primary dark:text-white border border-transparent hover:border-gray-200 dark:hover:border-white/20 transition-colors"
                        >
                            <Languages size={20} />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={toggleDarkMode}
                            className="p-2.5 bg-surface-subtle dark:bg-white/5 rounded-full text-text-primary dark:text-white border border-transparent hover:border-gray-200 dark:hover:border-white/20 transition-colors"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={colorTheme}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex"
                                >
                                    {colorTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>

                        {currentUser ? (
                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsDropdownOpen((o) => !o)}
                                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-emerald-500/20 dark:border-emerald-500/30 bg-white/50 dark:bg-slate-800/50 hover:border-emerald-500/40 transition-all"
                                >
                                    <div className="h-8 w-8 rounded-full border border-emerald-500/30 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold overflow-hidden text-sm">
                                        {currentUser.photoURL ? (
                                            <img src={currentUser.photoURL} alt="Profile" className="h-full w-full object-cover" />
                                        ) : (
                                            <span>
                                                {currentUser.displayName
                                                    ? currentUser.displayName.charAt(0).toUpperCase()
                                                    : 'U'}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[80px] truncate">
                                        {currentUser.displayName?.split(' ')[0] || 'User'}
                                    </span>
                                    <motion.span
                                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronRight size={14} className="rotate-90 text-slate-400" />
                                    </motion.span>
                                </motion.button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                            className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50"
                                        >
                                            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                                                    {currentUser.displayName || 'User'}
                                                </p>
                                                <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                                            </div>
                                            <div className="py-2">
                                                <Link
                                                    to="/dashboard"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 transition-colors"
                                                >
                                                    <LayoutDashboard size={16} /> Dashboard
                                                </Link>
                                                <Link
                                                    to="/dashboard"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 transition-colors"
                                                >
                                                    <History size={16} /> Scan History
                                                </Link>
                                            </div>
                                            <div className="border-t border-slate-100 dark:border-slate-800 pt-2 pb-1">
                                                <button
                                                    onClick={() => {
                                                        setIsDropdownOpen(false);
                                                        handleLogout();
                                                    }}
                                                    className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-3 text-sm text-red-600 dark:text-red-400 font-medium transition-colors"
                                                >
                                                    <LogOut size={16} /> Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
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

                    {/* Mobile hamburger */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-text-primary dark:text-white"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={isMenuOpen ? 'close' : 'open'}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.18 }}
                                    className="flex"
                                >
                                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden bg-surface-light dark:bg-surface-dark border-t border-surface-subtle dark:border-white/10 overflow-hidden shadow-xl"
                    >
                        <div className="px-4 pt-4 pb-8 space-y-2">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-4 py-3 rounded-xl text-base font-medium text-text-primary dark:text-gray-200 hover:bg-agri-green/10 dark:hover:bg-white/10 hover:text-agri-green dark:hover:text-green-400 transition-colors flex justify-between items-center"
                                    >
                                        {link.name}
                                        <ChevronRight size={16} className="opacity-50" />
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="pt-6 mt-6 border-t border-surface-subtle dark:border-white/10 flex justify-between items-center px-4">
                                <span className="text-sm font-medium text-text-secondary dark:text-gray-400">Appearance</span>
                                <div className="flex gap-4">
                                    <button
                                        onClick={toggleLanguage}
                                        className="p-2.5 bg-surface-subtle dark:bg-white/5 rounded-full text-text-primary dark:text-white border border-transparent hover:border-gray-200 dark:hover:border-white/20"
                                    >
                                        <Languages size={20} />
                                    </button>
                                    <button
                                        onClick={toggleDarkMode}
                                        className="p-2.5 bg-surface-subtle dark:bg-white/5 rounded-full text-text-primary dark:text-white border border-transparent hover:border-gray-200 dark:hover:border-white/20"
                                    >
                                        {colorTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                                    </button>
                                </div>
                            </div>

                            {currentUser ? (
                                <div className="p-4 mt-2 border-t border-surface-subtle dark:border-white/10">
                                    <div className="flex items-center gap-3 mb-4 px-2">
                                        <div className="h-10 w-10 flex-shrink-0 rounded-full border border-emerald-500/30 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold overflow-hidden">
                                            {currentUser.photoURL ? (
                                                <img src={currentUser.photoURL} alt="Profile" className="h-full w-full object-cover" />
                                            ) : (
                                                <span>
                                                    {currentUser.displayName
                                                        ? currentUser.displayName.charAt(0).toUpperCase()
                                                        : 'U'}
                                                </span>
                                            )}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-semibold text-text-primary dark:text-white truncate">
                                                {currentUser.displayName || 'User'}
                                            </p>
                                            <p className="text-xs text-text-secondary dark:text-gray-400 truncate">
                                                {currentUser.email}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20 py-3.5 rounded-xl font-bold shadow-sm text-lg flex items-center justify-center gap-2"
                                    >
                                        <LogOut size={20} /> Logout
                                    </button>
                                </div>
                            ) : (
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
        </motion.nav>
    );
};

export default Navbar;
