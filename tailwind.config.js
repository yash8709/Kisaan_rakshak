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
                    dark: '#0f172a', // Slate-900 for better contrast
                    subtle: '#f1f5f9', // Slate-100
                    'dark-subtle': '#1e293b', // Slate-800
                },
                text: {
                    primary: '#0f172a', // Slate-900
                    secondary: '#475569', // Slate-600
                    'dark-primary': '#f8fafc', // Slate-50
                    'dark-secondary': '#94a3b8', // Slate-400
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
