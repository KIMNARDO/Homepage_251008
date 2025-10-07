import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Carousel from '@/components/ui/Carousel';
import { SOCIAL_PROOF } from '@/data/papsnet';

const SocialProofSection: React.FC = () => {
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
      className="py-20 md:py-32 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {SOCIAL_PROOF.heading}
            </h2>
          </motion.div>

          {/* Company Logos - Infinite Scroll for Desktop */}
          <motion.div variants={itemVariants} className="mb-16">
            {/* Desktop Infinite Scroll */}
            <div className="hidden md:block relative overflow-hidden">
              <div className="flex animate-scroll-infinite">
                {/* First set of logos */}
                <div className="flex gap-8 shrink-0">
                  {SOCIAL_PROOF.companies.map((company, index) => (
                    <motion.div
                      key={`first-${company.name}`}
                      variants={logoVariants}
                      className="group cursor-pointer"
                    >
                      <div className="w-32 h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                        <span className="text-white/70 group-hover:text-white text-sm font-medium text-center px-2">
                          {company.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* Duplicate set for seamless loop */}
                <div className="flex gap-8 shrink-0 ml-8">
                  {SOCIAL_PROOF.companies.map((company, index) => (
                    <motion.div
                      key={`second-${company.name}`}
                      variants={logoVariants}
                      className="group cursor-pointer"
                    >
                      <div className="w-32 h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                        <span className="text-white/70 group-hover:text-white text-sm font-medium text-center px-2">
                          {company.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Grid View */}
            <div className="grid grid-cols-3 gap-4 md:hidden">
              {SOCIAL_PROOF.companies.slice(0, 12).map((company, index) => (
                <motion.div
                  key={company.name}
                  variants={logoVariants}
                  className="group cursor-pointer"
                >
                  <div className="w-full h-16 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                    <span className="text-white/70 group-hover:text-white text-xs font-medium text-center px-1">
                      {company.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Link */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <Button
              variant="ghost"
              href={SOCIAL_PROOF.cta.href}
              className="text-blue-400 hover:text-blue-300"
            >
              {SOCIAL_PROOF.cta.text}
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
          </motion.div>

          {/* Testimonials Carousel */}
          <motion.div variants={itemVariants}>
            <Carousel
              options={{ loop: true, align: 'start' }}
              autoplay={true}
              autoplayDelay={5000}
              className="max-w-4xl mx-auto"
            >
              {SOCIAL_PROOF.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="px-4">
                  <motion.div
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 text-center group hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Company badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                      {testimonial.company}
                    </div>

                    {/* Testimonial title */}
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 leading-relaxed">
                      {testimonial.title}
                    </h3>

                    {/* Read more link */}
                    {testimonial.href && (
                      <Button
                        variant="ghost"
                        href={testimonial.href}
                        className="text-blue-400 hover:text-blue-300 group-hover:translate-x-1 transition-transform duration-200"
                      >
                        자세히 보기
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
                    )}
                  </motion.div>
                </div>
              ))}
            </Carousel>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="mt-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '20+', label: '고객사' },
                { number: '30+', label: '수행 프로젝트' },
                { number: '80%', label: '전문가 비율' },
                { number: '24/7', label: '기술 지원' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={itemVariants}
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/70 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default SocialProofSection;