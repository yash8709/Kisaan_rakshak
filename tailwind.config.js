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
                    dark: '#022c22', // deep emerald
                    darker: '#011c16',
                    green: '#10b981',
                    neon: '#34d399',
                    leaf: '#059669',
                    glass: 'rgba(255, 255, 255, 0.1)',
                    darkGlass: 'rgba(0, 0, 0, 0.3)',
                    cream: '#f8fafc', // Premium Light background
                    white: '#ffffff', // Card white
                    'green-light': '#ecfdf5', // Light green accents
                },
                surface: {
                    light: '#ffffff',
                    dark: '#111827',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            boxShadow: {
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'neon': '0 0 20px rgba(16, 185, 129, 0.5)',
                'card': '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
                'card-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
            },
            animation: {
                'fade-in-down': 'fadeInDown 0.8s ease-out',
                'fade-in-up': 'fadeInUp 0.8s ease-out',
                'slow-spin': 'spin 3s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
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
                    '100%': { transform: 'translateX(100%)' },
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
