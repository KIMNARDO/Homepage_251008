/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pretendard': ['Pretendard', 'Noto Sans KR', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'noto': ['Noto Sans KR', 'Pretendard', '-apple-system', 'sans-serif'],
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'sans': ['Pretendard', 'Inter', 'Noto Sans KR', 'system-ui', 'sans-serif'],
        'display': ['Pretendard', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['2rem', { lineHeight: '2.5rem' }],      // 32px
        '4xl': ['3rem', { lineHeight: '3.5rem' }],      // 48px
        '5xl': ['4rem', { lineHeight: '4.5rem' }],      // 64px
        '6xl': ['5rem', { lineHeight: '1' }],           // 80px
        '7xl': ['6rem', { lineHeight: '1' }],           // 96px
      },
      lineHeight: {
        'tighter': '1.1',
        'heading': '1.2',
        'body': '1.5',
        'relaxed': '1.7',
        'loose': '2',
      },
      letterSpacing: {
        'ko-tight': '-0.02em',
        'ko-normal': '-0.01em',
        'en-tight': '-0.01em',
        'en-normal': '0',
        'en-wide': '0.025em',
      },
      colors: {
        // Primary Navy & Blue
        navy: {
          DEFAULT: '#0A0E27',
          50: '#1A1F42',
          100: '#141836',
          200: '#0F1329',
          900: '#0A0E27',
        },
        electric: {
          DEFAULT: '#3B82F6',
          50: '#E0EDFF',
          100: '#B3D1FF',
          200: '#80B3FF',
          300: '#60A5FA',
          400: '#3B82F6',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
        },
        emerald: {
          DEFAULT: '#10B981',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        amber: {
          DEFAULT: '#F59E0B',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        // Keep existing colors for compatibility
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        papsnet: {
          navy: '#0A0E27',
          blue: '#3B82F6',
          'blue-dark': '#2563EB',
          'blue-light': '#60A5FA',
          emerald: '#10B981',
          amber: '#F59E0B',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 64, 175, 0.1) 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: 'class',
};