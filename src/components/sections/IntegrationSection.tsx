import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Container from '@/components/ui/Container';
import { INTEGRATION_DATA } from '@/data/papsnet';

const IntegrationSection: React.FC = () => {
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

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {INTEGRATION_DATA.heading}
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {INTEGRATION_DATA.subheading}
            </p>
          </motion.div>

          {/* Integration Logos */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center">
              {INTEGRATION_DATA.logos.map((logo, index) => (
                <motion.div
                  key={logo.name}
                  variants={logoVariants}
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-24 h-20 md:w-32 md:h-24 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                    {/* Logo placeholder */}
                    <span className="text-white/70 group-hover:text-white text-sm md:text-base font-medium text-center">
                      {logo.name}
                    </span>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {INTEGRATION_DATA.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    {index === 0 && (
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    )}
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                    {benefit.title}
                  </h3>

                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Integration Flow Visualization */}
          <motion.div variants={itemVariants} className="mt-20">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                통합 워크플로우
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-500/20 border border-blue-400/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📐</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">CAD 설계</h4>
                  <p className="text-white/70 text-sm">AutoCAD, SolidWorks에서 설계</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex justify-center">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-500/20 border border-purple-400/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">PLM 관리</h4>
                  <p className="text-white/70 text-sm">CLIP PLM에서 통합 관리</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex justify-center">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500/20 border border-green-400/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏭</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">생산 연동</h4>
                  <p className="text-white/70 text-sm">ERP, MES 시스템과 연동</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Floating integration icons */}
      <div className="absolute top-1/4 left-8 opacity-20 pointer-events-none">
        <motion.div
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
            <span className="text-2xl">🔗</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-1/4 right-8 opacity-20 pointer-events-none">
        <motion.div
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
          <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🌐</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntegrationSection;