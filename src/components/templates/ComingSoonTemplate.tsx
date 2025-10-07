import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';

interface ComingSoonTemplateProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const ComingSoonTemplate: React.FC<ComingSoonTemplateProps> = ({
  title,
  description = '이 페이지는 현재 준비 중입니다.',
  icon: Icon = Clock
}) => {
  return (
    <>
      <Helmet>
        <title>{title} - PAPSNET</title>
        <meta name="description" content={description} />
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
            {/* Icon */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
                <Icon className="w-12 h-12 text-blue-400" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {title}
              </h1>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                {description}
              </p>

              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
                <span className="text-sm font-medium text-blue-400">
                  Coming Soon
                </span>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link
                to="/"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>홈으로 돌아가기</span>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </>
  );
};

export default ComingSoonTemplate;