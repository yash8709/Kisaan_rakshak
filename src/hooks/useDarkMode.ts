import { useEffect, useState } from 'react';

export default function useDarkMode() {
    // Initialize state from local storage or system preference
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'dark'; // Default to dark
        }
        return 'dark';
    });

    const colorTheme = theme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
        const root = window.document.documentElement;

        // Smooth transition fix
        root.classList.add('transition-colors', 'duration-300');

        root.classList.remove(colorTheme);
        root.classList.add(theme);

        // Save to local storage
        localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme] as const;
}
