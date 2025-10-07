import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Container from '@/components/ui/Container';
import FeatureCard from '@/components/ui/FeatureCard';
import { AI_FEATURES } from '@/data/papsnet';

const AIFeaturesSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-grid-pattern bg-center bg-repeat opacity-20" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse" />
              AI 기반 스마트 기능
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI가 만드는
              </span>
              <br />
              차세대 PLM 솔루션
            </h2>

            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              인공지능 기술로 제품 개발 프로세스를 혁신하고,
              더 빠르고 정확한 의사결정을 지원합니다
            </p>
          </motion.div>

          {/* AI Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {AI_FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                {...feature}
                variant={index === 0 ? 'highlighted' : 'default'}
                index={index}
                icon="🤖"
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16 md:mt-20"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                AI 기능을 직접 체험해보세요
              </h3>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                PAPSNET의 AI 기반 PLM 솔루션이 어떻게 여러분의 업무를
                혁신할 수 있는지 확인해보세요
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/demo"
                  className="btn btn-primary text-lg px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  무료 데모 신청
                </motion.a>
                <motion.a
                  href="/cadwin-ai"
                  className="btn btn-secondary text-lg px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  CADWin AI 자세히 보기
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Floating AI elements */}
          <div className="absolute top-10 left-10 opacity-20">
            <motion.div
              className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-2xl">🧠</span>
            </motion.div>
          </div>

          <div className="absolute top-32 right-20 opacity-20">
            <motion.div
              className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center"
              animate={{
                y: [0, -15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              <span className="text-xl">⚡</span>
            </motion.div>
          </div>

          <div className="absolute bottom-20 left-1/4 opacity-20">
            <motion.div
              className="w-14 h-14 bg-cyan-500/20 rounded-lg flex items-center justify-center"
              animate={{
                y: [0, -18, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4,
              }}
            >
              <span className="text-xl">🔍</span>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {/* Animated background lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-blue-400"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </section>
  );
};

export default AIFeaturesSection;