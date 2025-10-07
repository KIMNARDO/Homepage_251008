import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useContentStore } from '@/stores/contentStore';
import type { HeroContent, ProductSectionContent } from '@/stores/contentStore';
import { motion } from 'framer-motion';

// Sections
import HeroSection from '@/components/sections/HeroSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import StatsSection from '@/components/sections/StatsSection';
import ProductShowcase from '@/components/sections/ProductShowcase';
import AIFeaturesSection from '@/components/sections/AIFeaturesSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import IntegrationSection from '@/components/sections/IntegrationSection';
import CTASection from '@/components/sections/CTASection';

// Data
import { COMPANY_INFO } from '@/data/papsnet';

const HomePage: React.FC = () => {
  const { sections, loadContent, isLoading } = useContentStore();

  // Load content on mount
  useEffect(() => {
    loadContent();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO and Meta Tags */}
      <Helmet>
        <title>PAPSNET - PLM 솔루션으로 스마트 팩토리를 구현하세요</title>
        <meta
          name="description"
          content="PAPSNET은 제품 라이프사이클 관리와 협력사 도면 배포를 통해 더 나은 제품 개발을 지원합니다. CLIP PLM, DDMS, EPL 등 혁신적인 솔루션을 경험해보세요."
        />
        <meta
          name="keywords"
          content="PLM, PDM, DDMS, EPL, PMS, ICMS, CAD, AutoCAD, 도면관리, 제품라이프사이클, 스마트팩토리, BOM관리, 설계변경, 협력사도면배포"
        />

        {/* Open Graph tags */}
        <meta property="og:title" content="PAPSNET - PLM 솔루션으로 스마트 팩토리를 구현하세요" />
        <meta property="og:description" content="제품 라이프사이클 관리와 협력사 도면 배포의 혁신적인 솔루션을 제공합니다." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.papsnet.net" />
        <meta property="og:image" content="https://www.papsnet.net/og-image.jpg" />
        <meta property="og:site_name" content="PAPSNET" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PAPSNET - PLM 솔루션으로 스마트 팩토리를 구현하세요" />
        <meta name="twitter:description" content="제품 라이프사이클 관리와 협력사 도면 배포의 혁신적인 솔루션을 제공합니다." />
        <meta name="twitter:image" content="https://www.papsnet.net/og-image.jpg" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": COMPANY_INFO.nameEn,
            "alternateName": COMPANY_INFO.name,
            "description": COMPANY_INFO.description,
            "url": "https://www.papsnet.net",
            "logo": "https://www.papsnet.net/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": COMPANY_INFO.phone,
              "contactType": "customer service",
              "email": COMPANY_INFO.email,
              "availableLanguage": ["Korean", "English"]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": COMPANY_INFO.address,
              "addressCountry": "KR"
            },
            "founder": {
              "@type": "Person",
              "name": COMPANY_INFO.ceo
            },
            "foundingDate": "2021-06-01",
            "sameAs": [
              "https://github.com/papsnet",
              "https://linkedin.com/company/papsnet",
              "https://youtube.com/@papsnet"
            ]
          })}
        </script>

        {/* Additional SEO tags */}
        <link rel="canonical" href="https://www.papsnet.net" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={COMPANY_INFO.nameEn} />
        <meta name="language" content="ko-KR" />

        {/* Preload critical resources */}
        <link rel="preload" href="/videos/papsnet-demo.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/images/video-thumbnail.jpg" as="image" />
      </Helmet>

      {/* Page Content */}
      <div className="min-h-screen">
        {isLoading ? (
          // Loading State
          <div className="flex items-center justify-center min-h-[70vh]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <>
            {/* Dynamic Content Sections */}
            {sections && sections.length > 0 ? (
              // Render sections from admin
              sections
                .filter(section => section.isVisible)
                .sort((a, b) => a.order - b.order)
                .map((section) => {
                  switch (section.type) {
                    case 'hero':
                      return <HeroSection key={section.id} content={section.content as HeroContent} />;
                    case 'products':
                      return <ProductShowcase key={section.id} content={section.content as ProductSectionContent} />;
                    case 'features':
                      return <FeaturesSection key={section.id} />;
                    case 'pricing':
                      return <AIFeaturesSection key={section.id} />;
                    case 'testimonials':
                      return <SocialProofSection key={section.id} />;
                    case 'cta':
                      return <CTASection key={section.id} />;
                    default:
                      return null;
                  }
                })
            ) : (
              // Fallback to default sections
              <>
                <HeroSection />
                <StatsSection />
                <SocialProofSection />
                <ProductShowcase />
                <AIFeaturesSection />
                <FeaturesSection />
                <IntegrationSection />
                <CTASection />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;