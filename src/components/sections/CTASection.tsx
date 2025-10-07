import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { CTA_SECTION } from '@/data/papsnet';

const CTASection: React.FC = () => {
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
      className="py-20 md:py-32 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="cta-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-white"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Main CTA Content */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse" />
              지금 시작하세요
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight">
              {CTA_SECTION.heading}
            </h2>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              {CTA_SECTION.cta.map((button, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={button.variant}
                    size="lg"
                    href={button.href}
                    className="text-lg px-8 py-4 min-w-[180px]"
                  >
                    {button.text}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-blue-400">
                  무료
                </div>
                <div className="text-white/70 text-sm">
                  30일 무료 체험
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-green-400">
                  24/7
                </div>
                <div className="text-white/70 text-sm">
                  전문가 지원
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-purple-400">
                  즉시
                </div>
                <div className="text-white/70 text-sm">
                  설정 및 시작
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom decorative elements */}
          <motion.div
            variants={itemVariants}
            className="mt-20 flex justify-center"
          >
            <div className="flex space-x-4 opacity-30">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Floating action elements */}
      <div className="absolute top-1/4 left-10 opacity-20 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🚀</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/3 right-10 opacity-20 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
            <span className="text-xl">⭐</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-1/4 left-1/4 opacity-20 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        >
          <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center">
            <span className="text-xl">💎</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;