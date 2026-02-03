import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async () => {
        // SIMULATION MODE
        setLoading(true);
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));
            const mockUser: any = {
                uid: "simulated-user-123",
                email: "demo@farmer.com",
                displayName: "Demo Farmer",
                photoURL: null,
                emailVerified: true
            };
            setCurrentUser(mockUser);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // const login = (e,p) => signInWithEmailAndPassword(auth, e, p); // Real impl stored for later
    const logout = async () => {
        setCurrentUser(null);
        await signOut(auth); // Try real signout just in case
    };

    const value = {
        currentUser,
        loading,
        login, // Expose login function
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
