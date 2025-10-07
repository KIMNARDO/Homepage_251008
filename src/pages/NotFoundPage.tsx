import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 - 페이지를 찾을 수 없습니다 | PAPSNET</title>
        <meta name="description" content="요청하신 페이지를 찾을 수 없습니다. PAPSNET 홈페이지로 돌아가세요." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 404 Animation */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                404
              </h1>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                페이지를 찾을 수 없습니다
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
                <br />
                홈페이지로 돌아가서 다시 시도해보세요.
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button
                variant="primary"
                size="lg"
                href="/"
                className="min-w-[160px]"
              >
                홈으로 돌아가기
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/contact"
                className="min-w-[160px]"
              >
                문의하기
              </Button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="mt-12 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <p className="text-white/60 text-sm mb-4">빠른 링크:</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link
                  to="/solutions"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  솔루션
                </Link>
                <Link
                  to="/clip-plm"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  CLIP PLM
                </Link>
                <Link
                  to="/case-studies"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  활용사례
                </Link>
                <Link
                  to="/docs"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  기술문서
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </Container>

        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 left-10 opacity-20 pointer-events-none"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🔍</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-10 opacity-20 pointer-events-none"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">❓</span>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFoundPage;