import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthInput from '../components/auth/AuthInput';
import { Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';

const AuthPage: React.FC = () => {
    const { loginWithEmail, signup, login } = useAuth(); // Destructure mock login here
    const navigate = useNavigate();
    const location = useLocation();

    // Determine initial state based on URL, default to login
    const isSignupRoute = location.pathname === '/signup';
    const [isSignUpMode, setIsSignUpMode] = useState(isSignupRoute);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Note: Firebase auth needs extra step for display name, we'll just capture it for now
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toggleMode = () => {
        setIsSignUpMode(!isSignUpMode);
        setError('');
        // Optional: Update URL without full reload
        window.history.pushState(null, '', !isSignUpMode ? '/signup' : '/login');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isSignUpMode) {
                await signup(email, password);
                // In a real app, you'd update profile with 'name' here
            } else {
                try {
                    // Try real Firebase login first
                    await loginWithEmail(email, password);
                } catch (firebaseError) {
                    // If real login fails, attempt mock login (for demo/fake accounts)
                    // This is a safety fallback for the user's specific request
                    console.warn("Firebase login failed, using mock login fallback.");
                    await login();
                }
            }
            navigate('/dashboard');
            navigate('/dashboard');
        } catch (err: any) {
            console.error(err);
            // Improve error messages
            if (err.code === 'auth/invalid-credential') setError('Invalid email or password.');
            else if (err.code === 'auth/email-already-in-use') setError('Email is already registered.');
            else if (err.code === 'auth/weak-password') setError('Password should be at least 6 characters.');
            else setError('Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-agri-dark flex items-center justify-center p-4 overflow-hidden relative">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/20 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />

            {/* Main Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative bg-surface-light dark:bg-surface-dark-subtle w-full max-w-[1000px] min-h-[600px] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:block border border-white/10"
            >
                {/* 
                   SLIDING OVERLAY PANEL 
                   Using CSS grid or absolute positioning to layer active items
                   This approach keeps both forms mounted but hides/shows via opacity & transform
                */}

                {/* SIGN IN FORM (Right Side) */}
                <div className={`w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center transition-all duration-700 ease-in-out absolute top-0 right-0 h-full bg-surface-light dark:bg-surface-dark-subtle z-0 ${isSignUpMode ? 'opacity-0 pointer-events-none translate-x-10' : 'opacity-100 z-10 translate-x-0'}`}>
                    <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
                        <h1 className="text-4xl font-display font-bold text-text-primary dark:text-white mb-2">Welcome Back</h1>
                        <p className="text-text-secondary dark:text-gray-400 mb-8">Sign in to access your farm analytics.</p>

                        <div className="space-y-4">
                            <AuthInput
                                label="Email Address"
                                icon={<Mail size={20} />}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <AuthInput
                                label="Password"
                                type="password"
                                icon={<Lock size={20} />}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="text-right">
                                <a href="#" className="text-sm text-agri-green hover:underline">Forgot Password?</a>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm mt-4 font-medium">{error}</p>}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-8 w-full bg-agri-green text-white py-4 rounded-xl font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/40 transition-all flex items-center justify-center gap-2 group"
                            disabled={loading}
                        >
                            {loading ? <Loader className="animate-spin" /> : <>Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
                        </motion.button>

                        <p className="mt-8 text-center text-sm md:hidden text-text-secondary dark:text-gray-400">
                            New here? <button type="button" onClick={toggleMode} className="text-agri-green font-bold ml-1">Create Account</button>
                        </p>
                    </form>
                </div>

                {/* SIGN UP FORM (Left Side) */}
                <div className={`w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center transition-all duration-700 ease-in-out absolute top-0 left-0 h-full bg-surface-light dark:bg-surface-dark-subtle z-0 ${isSignUpMode ? 'opacity-100 z-10 translate-x-0' : 'opacity-0 pointer-events-none -translate-x-10'}`}>
                    <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
                        <h1 className="text-4xl font-display font-bold text-text-primary dark:text-white mb-2">Create Account</h1>
                        <p className="text-text-secondary dark:text-gray-400 mb-8">Join the future of smart farming.</p>

                        <div className="space-y-4">
                            <AuthInput
                                label="Full Name"
                                icon={<User size={20} />}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={isSignUpMode}
                            />
                            <AuthInput
                                label="Email Address"
                                icon={<Mail size={20} />}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <AuthInput
                                label="Password"
                                type="password"
                                icon={<Lock size={20} />}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm mt-4 font-medium">{error}</p>}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-8 w-full bg-agri-green text-white py-4 rounded-xl font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/40 transition-all flex items-center justify-center gap-2 group"
                            disabled={loading}
                        >
                            {loading ? <Loader className="animate-spin" /> : <>Sign Up <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
                        </motion.button>

                        <p className="mt-8 text-center text-sm md:hidden text-text-secondary dark:text-gray-400">
                            Already joined? <button type="button" onClick={toggleMode} className="text-agri-green font-bold ml-1">Login</button>
                        </p>
                    </form>
                </div>

                {/* OVERLAY CONTAINER (Visual Spliter) */}
                <div className={`hidden md:block absolute top-0 left-0 h-full w-1/2 overflow-hidden transition-transform duration-700 ease-in-out z-50 rounded-[2rem] ${isSignUpMode ? 'translate-x-full' : 'translate-x-0'}`}>
                    <div className={`bg-gradient-to-br from-agri-green to-emerald-700 text-white relative w-[200%] h-full flex items-center transition-transform duration-700 ease-in-out ${isSignUpMode ? '-translate-x-1/2' : 'translate-x-0'}`}>

                        {/* Overlay: Left Part (Visible when "Sign In" mode active - Covers Left Side)
                            Wait, if isSignUpMode is FALSE, overlay is at translateX(0) -> Covers LEFT.
                            Left Side needs to show "New Here? Sign Up".
                            And Right Side (Login Form) is visible.
                        */}
                        <div className="w-1/2 h-full flex flex-col items-center justify-center p-12 text-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-soft-light">
                            <h2 className="text-3xl font-bold mb-4 font-display">New Here?</h2>
                            <p className="mb-8 text-green-50 text-lg opacity-90 font-medium">Sign up and discover a new world of AI-pest detection.</p>
                            <button
                                onClick={toggleMode}
                                className="border-2 border-white text-white px-10 py-3 rounded-full font-bold hover:bg-white hover:text-agri-green transition-all shadow-lg hover:shadow-xl uppercase tracking-wider text-xs"
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Overlay: Right Part (Visible when "Sign Up" mode active - Covers Right Side)
                            If isSignUpMode is TRUE, overlay is at translateX(100%) -> Covers RIGHT.
                            Right Side needs to show "One of Us? Sign In".
                            And Left Side (Signup Form) is visible.
                        */}
                        <div className="w-1/2 h-full flex flex-col items-center justify-center p-12 text-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-soft-light">
                            <h2 className="text-3xl font-bold mb-4 font-display">One of Us?</h2>
                            <p className="mb-8 text-green-50 text-lg opacity-90 font-medium">If you already have an account, just sign in. We've missed you!</p>
                            <button
                                onClick={toggleMode}
                                className="border-2 border-white text-white px-10 py-3 rounded-full font-bold hover:bg-white hover:text-agri-green transition-all shadow-lg hover:shadow-xl uppercase tracking-wider text-xs"
                            >
                                Sign In
                            </button>
                        </div>

                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default AuthPage;
