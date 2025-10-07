import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const PapsnetHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'ko' | 'en'>('ko');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = {
    ko: [
      { label: '제품', href: '/products' },
      { label: '솔루션', href: '/solutions' },
      { label: '고객사례', href: '/cases' },
      { label: '가격', href: '/pricing' },
      { label: '문서', href: '/docs' },
      { label: '블로그', href: '/blog' },
      { label: '문의', href: '/contact' }
    ],
    en: [
      { label: 'Products', href: '/products' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Cases', href: '/cases' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Docs', href: '/docs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' }
    ]
  };

  const ctaButtons = {
    ko: {
      login: '로그인',
      signup: '무료 체험'
    },
    en: {
      login: 'Log in',
      signup: 'Free Trial'
    }
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-in-out
        ${isScrolled
          ? 'bg-papsnet-primary-900/95 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
        }
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 z-50 relative"
          >
            <div className="relative">
              <span className="text-2xl font-bold bg-gradient-electric bg-clip-text text-transparent">
                PAPSNET
              </span>
              <span className="text-xs text-papsnet-gray-400 absolute -bottom-4 left-0 whitespace-nowrap">
                주식회사 팹스넷
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation[currentLang].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  text-papsnet-gray-300 hover:text-papsnet-accent-electric
                  transition-colors duration-300
                  text-sm font-medium
                  relative group
                "
              >
                {item.label}
                <span className="
                  absolute -bottom-1 left-0 w-0 h-0.5
                  bg-gradient-electric
                  group-hover:w-full
                  transition-all duration-300
                "></span>
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={() => setCurrentLang(currentLang === 'ko' ? 'en' : 'ko')}
              className="
                text-papsnet-gray-400 hover:text-papsnet-gray-200
                transition-colors duration-300
                text-sm font-medium
                px-2 py-1
              "
            >
              {currentLang === 'ko' ? 'EN' : 'KO'}
            </button>

            {/* Login Button */}
            <Link
              href="/login"
              className="
                px-4 py-2
                text-sm font-medium
                text-papsnet-gray-200
                hover:text-white
                transition-colors duration-300
              "
            >
              {ctaButtons[currentLang].login}
            </Link>

            {/* Signup Button */}
            <Link
              href="/signup"
              className="
                px-6 py-2.5
                text-sm font-semibold
                text-white
                bg-gradient-electric
                rounded-xl
                shadow-lg shadow-papsnet-accent-electric/20
                hover:shadow-xl hover:shadow-papsnet-accent-electric/30
                transform hover:-translate-y-0.5
                transition-all duration-300
              "
            >
              {ctaButtons[currentLang].signup}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-papsnet-primary-800/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          lg:hidden
          fixed inset-x-0 top-16 lg:top-20
          bg-papsnet-primary-900/98 backdrop-blur-xl
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-4">
            {navigation[currentLang].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                  text-papsnet-gray-300 hover:text-papsnet-accent-electric
                  transition-colors duration-300
                  text-base font-medium
                  py-2
                "
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-papsnet-gray-800 space-y-3">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                  block w-full
                  px-4 py-3
                  text-center text-sm font-medium
                  text-papsnet-gray-200
                  border border-papsnet-gray-700
                  rounded-xl
                  hover:bg-papsnet-primary-800
                  transition-colors duration-300
                "
              >
                {ctaButtons[currentLang].login}
              </Link>

              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                  block w-full
                  px-4 py-3
                  text-center text-sm font-semibold
                  text-white
                  bg-gradient-electric
                  rounded-xl
                  shadow-lg shadow-papsnet-accent-electric/20
                  hover:shadow-xl hover:shadow-papsnet-accent-electric/30
                  transition-all duration-300
                "
              >
                {ctaButtons[currentLang].signup}
              </Link>

              <button
                onClick={() => {
                  setCurrentLang(currentLang === 'ko' ? 'en' : 'ko');
                  setIsMobileMenuOpen(false);
                }}
                className="
                  block w-full
                  px-4 py-3
                  text-center text-sm font-medium
                  text-papsnet-gray-400
                  hover:text-papsnet-gray-200
                  transition-colors duration-300
                "
              >
                {currentLang === 'ko' ? 'English' : '한국어'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PapsnetHeader;