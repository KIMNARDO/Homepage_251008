import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Container from '@/components/ui/Container';
import { FOOTER_NAVIGATION, COMPANY_INFO } from '@/data/papsnet';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-white/10">
      <Container>
        <div className="py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link
                to="/"
                className="inline-flex items-center space-x-3 group mb-6"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <span className="text-white font-bold text-base">P</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-xl">
                    PAPSNET
                  </div>
                  <div className="text-white/60 text-sm -mt-1">
                    PLM Solutions
                  </div>
                </div>
              </Link>

              <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
                {COMPANY_INFO.description}
              </p>

              <div className="space-y-2">
                <p className="text-white/60 text-sm">
                  <span className="font-medium">주소:</span> {COMPANY_INFO.address}
                </p>
                <p className="text-white/60 text-sm">
                  <span className="font-medium">전화:</span> {COMPANY_INFO.phone}
                </p>
                <p className="text-white/60 text-sm">
                  <span className="font-medium">이메일:</span>{' '}
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Navigation Sections */}
            {FOOTER_NAVIGATION.map((section, index) => (
              <div key={section.title}>
                <h3 className="text-white font-semibold text-sm mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.text}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-white/70 hover:text-white text-sm transition-colors duration-200 group"
                        >
                          {link.text}
                          {link.badge && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                              {link.badge}
                            </span>
                          )}
                          <svg
                            className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="inline-flex items-center text-white/70 hover:text-white text-sm transition-colors duration-200"
                        >
                          {link.text}
                          {link.badge && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <p className="text-white/60 text-sm">
                © {currentYear} {COMPANY_INFO.nameEn}. All rights reserved.
              </p>

              {/* Status indicator */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <a
                  href="https://status.papsnet.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                >
                  모든 시스템 정상 운영
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <motion.a
                href="https://github.com/papsnet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>

              <motion.a
                href="https://linkedin.com/company/papsnet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>

              <motion.a
                href="https://youtube.com/@papsnet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;