/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // PAPSNET Primary Colors
        'papsnet-primary': {
          50: '#E8F2FF',
          100: '#E8F2FF',
          200: '#9FBFFF',
          300: '#6B93D6',
          400: '#4C7CBF',
          500: '#3B66A0',
          600: '#2C4F7C',
          700: '#1E3A5F',
          800: '#162B4D',
          900: '#0A1628',
        },
        // PAPSNET Accent Colors
        'papsnet-accent': {
          'electric': '#00D4FF',
          'cyber': '#00FFD1',
          'glow': '#7B61FF',
          'warm': '#FF6B6B',
        },
        // PAPSNET Gray Scale
        'papsnet-gray': {
          50: '#FFFFFF',
          100: '#F5F5F7',
          200: '#E1E1E8',
          300: '#B8B8C8',
          400: '#9191A1',
          500: '#6B6B76',
          600: '#4A4A52',
          700: '#2E2E33',
          800: '#1A1A1D',
          900: '#0F0F10',
        },
        // Semantic Colors
        'papsnet-success': '#00C896',
        'papsnet-warning': '#FFA500',
        'papsnet-error': '#FF4757',
        'papsnet-info': '#00A8E8',
      },
      fontFamily: {
        'primary': ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
        'display': ['Montserrat', 'Pretendard', 'sans-serif'],
        'mono': ['JetBrains Mono', 'D2Coding', 'monospace'],
      },
      fontSize: {
        // Hero & Display Sizes
        'hero-title': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['48px', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-sm': ['40px', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        // Headlines
        'headline-lg': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-md': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-sm': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        // Titles
        'title-lg': ['20px', { lineHeight: '1.5', fontWeight: '500' }],
        'title-md': ['18px', { lineHeight: '1.5', fontWeight: '500' }],
        // Body Text
        'body-lg': ['16px', { lineHeight: '1.75' }],
        'body-md': ['14px', { lineHeight: '1.75' }],
        'body-sm': ['13px', { lineHeight: '1.5' }],
        // Small Text
        'caption': ['12px', { lineHeight: '1.5' }],
        'overline': ['11px', { lineHeight: '1.5', letterSpacing: '0.1em', fontWeight: '600' }],
      },
      spacing: {
        '18': '72px',
        '22': '88px',
        '26': '104px',
        '30': '120px',
        '34': '136px',
        '38': '152px',
        '42': '168px',
        '46': '184px',
        '50': '200px',
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        // Elevation Shadows
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'md': '0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        // Glow Effects
        'glow-blue': '0 0 40px rgba(0, 212, 255, 0.3)',
        'glow-purple': '0 0 40px rgba(123, 97, 255, 0.3)',
        'glow-mint': '0 0 40px rgba(0, 255, 209, 0.3)',
        'glow-warm': '0 0 40px rgba(255, 107, 107, 0.3)',
        // Inner Shadows
        'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'inner-md': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        // Glass Morphism
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 16px 48px 0 rgba(31, 38, 135, 0.5)',
      },
      backgroundImage: {
        // Gradients
        'gradient-hero': 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #2C4F7C 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(10, 22, 40, 0.8) 0%, rgba(30, 58, 95, 0.4) 100%)',
        'gradient-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
        'gradient-electric': 'linear-gradient(135deg, #00D4FF 0%, #00FFD1 100%)',
        'gradient-purple': 'linear-gradient(135deg, #7B61FF 0%, #00D4FF 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FF6B6B 0%, #FFA500 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A1628 0%, #1E3A5F 100%)',
        // Mesh Gradients
        'mesh-gradient': `
          radial-gradient(at 40% 20%, rgba(0, 212, 255, 0.2) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(123, 97, 255, 0.15) 0px, transparent 50%),
          radial-gradient(at 10% 50%, rgba(0, 255, 209, 0.15) 0px, transparent 50%),
          radial-gradient(at 90% 50%, rgba(255, 107, 107, 0.1) 0px, transparent 50%),
          radial-gradient(at 30% 80%, rgba(0, 168, 232, 0.15) 0px, transparent 50%)
        `,
      },
      animation: {
        // Basic Animations
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'scale-out': 'scaleOut 0.5s ease-out',
        'slide-in-up': 'slideInUp 0.5s ease-out',
        'slide-in-down': 'slideInDown 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        // Special Effects
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'rotate': 'rotate 20s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-slow': 'bounceSlow 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        // Loading
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)' },
        },
        skeleton: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    // Custom plugin for glass morphism utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-dark': {
          background: 'rgba(10, 22, 40, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
        '.glass-light': {
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
        '.text-gradient': {
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        '.scrollbar-hide': {
          /* Hide scrollbar for Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}