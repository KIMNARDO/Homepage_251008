import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { MAIN_FEATURES } from '@/data/papsnet';

const FeaturesSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              더 빠른 제품 개발을 위한
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                모든 것이 준비되었습니다
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              하나의 통합 도구로 워크플로우를 간소화하고 가속화하세요
            </p>
          </motion.div>

          {/* Features List */}
          <div className="space-y-20 md:space-y-32">
            {MAIN_FEATURES.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-cols-2' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
                    {feature.title}
                  </h3>

                  <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                    {feature.description}
                  </p>

                  {feature.cta && (
                    <Button
                      variant="primary"
                      size="lg"
                      href={feature.cta.href}
                      className="mb-4"
                    >
                      {feature.cta.text}
                    </Button>
                  )}
                </div>

                {/* Image/Visual */}
                <motion.div
                  variants={imageVariants}
                  className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                >
                  {feature.image ? (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                      <img
                        src={feature.image.src}
                        alt={feature.image.alt}
                        className="relative w-full h-80 md:h-96 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    // Placeholder visual for features without images
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
                      <div className="relative w-full h-80 md:h-96 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                              className="w-10 h-10 text-blue-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <h4 className="text-xl font-semibold text-white mb-2">
                            {feature.title.split(' ').slice(0, 2).join(' ')}
                          </h4>
                          <p className="text-white/60 text-sm">
                            곧 업데이트 예정
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Section Footer */}
          <motion.div variants={itemVariants} className="text-center mt-20">
            <div className="inline-flex items-center space-x-4">
              <Button
                variant="ghost"
                href="/features"
                className="text-blue-400 hover:text-blue-300"
              >
                모든 기능 자세히 보기
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Feature highlights floating elements */}
      <div className="absolute top-1/4 left-5 opacity-20 pointer-events-none">
        <motion.div
          className="flex flex-col space-y-4"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">📋</span>
          </div>
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">🔄</span>
          </div>
          <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">📊</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-1/4 right-5 opacity-20 pointer-events-none">
        <motion.div
          className="flex flex-col space-y-4"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">✅</span>
          </div>
          <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">⚡</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;