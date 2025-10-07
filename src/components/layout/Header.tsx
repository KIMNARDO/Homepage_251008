import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { MAIN_NAVIGATION, COMPANY_INFO } from '@/data/papsnet';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const headerClasses = clsx(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    {
      'bg-black/80 backdrop-blur-md border-b border-white/10': isScrolled,
      'bg-transparent': !isScrolled,
    }
  );

  return (
    <header className={headerClasses}>
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            aria-label={`${COMPANY_INFO.nameEn} 홈페이지로 이동`}
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-sm lg:text-base">P</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-semibold text-lg lg:text-xl">
                PAPSNET
              </div>
              <div className="text-white/60 text-xs lg:text-sm -mt-1">
                PLM Solutions
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" role="navigation">
            {MAIN_NAVIGATION.map((item) => (
              <Link
                key={item.text}
                to={item.href}
                className={clsx(
                  'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  'hover:bg-white/10 focus:bg-white/10 focus:outline-none',
                  {
                    'text-white': location.pathname !== item.href,
                    'text-blue-400 bg-blue-400/10': location.pathname === item.href,
                  }
                )}
              >
                {item.text}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              href="/login"
            >
              로그인
            </Button>
            <Button
              variant="primary"
              size="sm"
              href="/contact"
            >
              무료 상담
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴 열기"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Container>
                <div className="py-6">
                  {/* Navigation Links */}
                  <nav className="space-y-1 mb-6" role="navigation">
                    {MAIN_NAVIGATION.map((item) => (
                      <Link
                        key={item.text}
                        to={item.href}
                        className={clsx(
                          'block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200',
                          'hover:bg-white/10 focus:bg-white/10 focus:outline-none',
                          {
                            'text-white': location.pathname !== item.href,
                            'text-blue-400 bg-blue-400/10': location.pathname === item.href,
                          }
                        )}
                      >
                        {item.text}
                      </Link>
                    ))}
                  </nav>

                  {/* CTA Buttons */}
                  <div className="flex flex-col space-y-3 px-4">
                    <Button
                      variant="ghost"
                      href="/login"
                      className="justify-center"
                    >
                      로그인
                    </Button>
                    <Button
                      variant="primary"
                      href="/contact"
                      className="justify-center"
                    >
                      무료 상담
                    </Button>
                  </div>
                </div>
              </Container>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;