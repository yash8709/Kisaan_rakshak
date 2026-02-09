/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                agri: {
                    dark: '#0f2e1a', // Deep Forest (Primary Dark)
                    darker: '#041b14', // Near Black (Footer/Contrast)
                    green: '#10b981', // Action Green
                    neon: '#34d399', // Highlights
                    leaf: '#059669', // Mid-tone
                    glass: 'rgba(255, 255, 255, 0.1)',
                    darkGlass: 'rgba(6, 36, 26, 0.6)', // Green-tinted glass
                    cream: '#f8fafc',
                    white: '#ffffff',
                    'green-light': '#ecfdf5',
                },
                surface: {
                    light: '#ffffff',
                    dark: '#06241a', // Dark Emerald (Replaces Slate-900)
                    subtle: '#f1f5f9',
                    'dark-subtle': '#0b3d2e', // Rich Agri Green (Replaces Slate-800)
                },
                text: {
                    primary: '#06241a', // Dark Emerald text for light mode
                    secondary: '#334155', // Slate-700
                    'dark-primary': '#f0fdf4', // Green-tinted white
                    'dark-secondary': '#a7f3d0', // Soft green text
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            boxShadow: {
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'neon': '0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.2)',
                'card': '0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.04)',
                'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.08)',
                'glow': '0 0 20px rgba(16, 185, 129, 0.3)',
            },
            animation: {
                'fade-in-down': 'fadeInDown 0.8s ease-out',
                'fade-in-up': 'fadeInUp 0.8s ease-out',
                'slow-spin': 'spin 3s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
