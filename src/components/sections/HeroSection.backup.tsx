import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import VideoPlayer from '@/components/ui/VideoPlayer';
import { HERO_DATA, SOCIAL_PROOF } from '@/data/papsnet';
import { useContentStore } from '@/stores/contentStore';

interface HeroContent {
  announcement: {
    text: string;
    href: string;
  };
  heading: string;
  subheading: string;
  tagline: string;
  cta: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
  backgroundImage?: string;
  backgroundVideo?: string;
}

interface HeroSectionProps {
  content?: HeroContent;
}

const HeroSection: React.FC<HeroSectionProps> = ({ content: propContent }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { sections, loadContent } = useContentStore();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Find hero section from store
  const heroSection = sections.find(s => s.type === 'hero');
  const adminContent = heroSection?.content as HeroContent | undefined;

  // Use propContent first, then adminContent, then static data
  const content = propContent || adminContent || {
    announcement: HERO_DATA.announcement,
    heading: HERO_DATA.heading,
    subheading: HERO_DATA.subheading,
    tagline: HERO_DATA.tagline,
    cta: HERO_DATA.cta
  };

  // Log for debugging
  console.log('[HeroSection] Content being used:', {
    hasPropContent: !!propContent,
    hasAdminContent: !!adminContent,
    finalHeading: content.heading
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
      className="relative min-h-screen flex items-center bg-black overflow-hidden pt-16 lg:pt-18"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />

      <Container className="relative z-10">
        <motion.div
          className="text-center max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Announcement Banner */}
          {content.announcement?.text && (
            <motion.div variants={itemVariants} className="mb-8">
              <a
                href={content.announcement.href}
                className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium hover:bg-blue-500/20 transition-all duration-300 group"
              >
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse" />
                {content.announcement.text}
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
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
              </a>
            </motion.div>
          )}

          {/* Main Heading */}
          {content.heading && (
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-white to-blue-400 bg-clip-text text-transparent">
                {content.heading}
              </span>
            </motion.h1>
          )}

          {/* Subheading */}
          {content.subheading && (
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl lg:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              {content.subheading}
            </motion.p>
          )}

          {/* Tagline */}
          {content.tagline && (
            <motion.p
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-400 mb-12 leading-tight"
            >
              {content.tagline}
            </motion.p>
          )}

          {/* CTA Buttons */}
          {content.cta && content.cta.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              {content.cta.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant}
                  size="lg"
                  href={button.href}
                  className="text-base"
                >
                  {button.text}
                </Button>
              ))}
            </motion.div>
          )}

          {/* Company Logos */}
          <motion.div variants={itemVariants} className="mb-16">
            <p className="text-white/60 text-sm mb-8">
              국내 주요 기업들이 신뢰하는 PLM 솔루션
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
              {SOCIAL_PROOF.companies.slice(0, 5).map((company, index) => (
                <motion.div
                  key={company.name}
                  className="h-12 w-24 bg-white/10 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-white/80 text-sm font-medium">
                    {company.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Video Player */}
          <motion.div variants={itemVariants} className="mb-16">
            <VideoPlayer
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              poster="/images/video-thumbnail.jpg"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden"
              autoPlay={false}
              controls={true}
              muted={true}
            />
          </motion.div>

          {/* Feature Tabs */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8">
              <h3 className="text-white text-lg md:text-xl font-semibold mb-6">
                PAPSNET 핵심 기능
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
                {HERO_DATA.featureTabs.map((feature, index) => (
                  <motion.button
                    key={index}
                    className={`p-3 md:p-4 rounded-xl transition-all duration-300 text-center group ${
                      selectedTab === index
                        ? 'bg-blue-500/20 border-2 border-blue-400/50'
                        : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedTab(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                      {feature.icon}
                    </div>
                    <div className="text-white text-xs md:text-sm font-medium">
                      {feature.text}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-white/60 text-sm">스크롤하여 더 보기</span>
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;