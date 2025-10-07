import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Sparkles, ChevronDown } from 'lucide-react';

const PapsnetHero: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<'ko' | 'en'>('ko');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const content = {
    ko: {
      announcement: 'NEW: PAPSNET AI 출시',
      announcementLink: '/blog/papsnet-ai-launch',
      headline1: '디지털 혁신을 위한',
      headlineGradient: '최적의 솔루션',
      headline2: 'PAPSNET',
      subheadline: '기업의 디지털 전환을 위한 통합 플랫폼으로 생산성을 극대화하세요',
      ctaPrimary: '무료 체험 시작',
      ctaSecondary: '데모 요청',
      socialProof: '1,000+ 기업이 신뢰하는 솔루션',
      features: [
        '도면 관리 시스템',
        'AI 기반 자동화',
        '실시간 협업',
        '보안 문서 관리',
        '워크플로우 최적화',
        '클라우드 통합'
      ]
    },
    en: {
      announcement: 'NEW: PAPSNET AI Launched',
      announcementLink: '/blog/papsnet-ai-launch',
      headline1: 'The Optimal Solution for',
      headlineGradient: 'Digital Innovation',
      headline2: 'PAPSNET',
      subheadline: 'Maximize productivity with an integrated platform for enterprise digital transformation',
      ctaPrimary: 'Start Free Trial',
      ctaSecondary: 'Request Demo',
      socialProof: 'Trusted by 1,000+ Companies',
      features: [
        'Drawing Management System',
        'AI-Based Automation',
        'Real-time Collaboration',
        'Secure Document Management',
        'Workflow Optimization',
        'Cloud Integration'
      ]
    }
  };

  const companyLogos = [
    { name: 'Samsung', logo: '/logos/samsung.svg' },
    { name: 'LG', logo: '/logos/lg.svg' },
    { name: 'SK', logo: '/logos/sk.svg' },
    { name: 'Hyundai', logo: '/logos/hyundai.svg' },
    { name: 'POSCO', logo: '/logos/posco.svg' },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>

        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-papsnet-accent-electric/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-papsnet-accent-glow/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-papsnet-accent-cyber/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Announcement Banner */}
          <Link href={content[currentLang].announcementLink}>
            <div className={`
              inline-flex items-center gap-2
              px-4 py-2 mb-8
              bg-gradient-to-r from-papsnet-accent-electric/10 to-papsnet-accent-cyber/10
              border border-papsnet-accent-electric/20
              rounded-full
              hover:border-papsnet-accent-electric/40
              transition-all duration-500
              transform
              ${isVisible ? 'animate-fade-in-down' : 'opacity-0'}
            `}>
              <Sparkles className="w-4 h-4 text-papsnet-accent-electric" />
              <span className="text-sm font-medium text-papsnet-gray-200">
                {content[currentLang].announcement}
              </span>
              <ArrowRight className="w-4 h-4 text-papsnet-accent-electric" />
            </div>
          </Link>

          {/* Main Headline */}
          <h1 className={`
            text-4xl sm:text-5xl lg:text-hero-title
            font-bold
            mb-6
            transform
            ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
          `}
          style={{ animationDelay: '100ms' }}
          >
            <span className="block text-white mb-2">
              {content[currentLang].headline1}
            </span>
            <span className="block bg-gradient-electric text-gradient mb-4">
              {content[currentLang].headlineGradient}
            </span>
            <span className="block text-papsnet-accent-electric text-5xl sm:text-6xl lg:text-7xl">
              {content[currentLang].headline2}
            </span>
          </h1>

          {/* Subheadline */}
          <p className={`
            text-lg sm:text-xl lg:text-2xl
            text-papsnet-gray-300
            mb-10
            max-w-3xl
            transform
            ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
          `}
          style={{ animationDelay: '200ms' }}
          >
            {content[currentLang].subheadline}
          </p>

          {/* CTA Buttons */}
          <div className={`
            flex flex-col sm:flex-row gap-4
            mb-16
            transform
            ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
          `}
          style={{ animationDelay: '300ms' }}
          >
            <Link
              href="/signup"
              className="
                group
                inline-flex items-center justify-center gap-2
                px-8 py-4
                text-base font-semibold
                text-white
                bg-gradient-electric
                rounded-xl
                shadow-xl shadow-papsnet-accent-electric/20
                hover:shadow-2xl hover:shadow-papsnet-accent-electric/30
                transform hover:-translate-y-1
                transition-all duration-300
              "
            >
              {content[currentLang].ctaPrimary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/demo"
              className="
                group
                inline-flex items-center justify-center gap-2
                px-8 py-4
                text-base font-semibold
                text-papsnet-gray-200
                bg-white/5
                backdrop-blur-sm
                border border-papsnet-gray-700
                rounded-xl
                hover:bg-white/10
                hover:border-papsnet-accent-electric/50
                transform hover:-translate-y-1
                transition-all duration-300
              "
            >
              <Play className="w-5 h-5" />
              {content[currentLang].ctaSecondary}
            </Link>
          </div>

          {/* Social Proof */}
          <div className={`
            transform
            ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
          `}
          style={{ animationDelay: '400ms' }}
          >
            <p className="text-sm text-papsnet-gray-400 mb-6 text-center">
              {content[currentLang].socialProof}
            </p>

            {/* Company Logos */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
              {companyLogos.map((company, index) => (
                <div
                  key={company.name}
                  className="
                    w-24 h-12
                    bg-white/5
                    rounded-lg
                    flex items-center justify-center
                    hover:bg-white/10
                    transition-all duration-300
                    opacity-70 hover:opacity-100
                  "
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <span className="text-papsnet-gray-400 text-sm font-medium">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {content[currentLang].features.map((feature, index) => (
                <div
                  key={feature}
                  className={`
                    px-4 py-2
                    bg-gradient-to-r from-papsnet-primary-800/50 to-papsnet-primary-700/50
                    border border-papsnet-primary-600/30
                    rounded-full
                    text-sm text-papsnet-gray-300
                    backdrop-blur-sm
                    hover:border-papsnet-accent-electric/50
                    hover:text-papsnet-accent-electric
                    transition-all duration-300
                    transform
                    ${isVisible ? 'animate-fade-in' : 'opacity-0'}
                  `}
                  style={{ animationDelay: `${600 + index * 50}ms` }}
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Demo Video/Image Placeholder */}
          <div className={`
            mt-20
            relative
            rounded-2xl
            overflow-hidden
            bg-gradient-to-br from-papsnet-primary-800/50 to-papsnet-primary-700/50
            border border-papsnet-primary-600/30
            backdrop-blur-sm
            shadow-2xl
            transform
            ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
          `}
          style={{ animationDelay: '700ms' }}
          >
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="
                  w-20 h-20
                  mx-auto mb-4
                  bg-gradient-electric
                  rounded-full
                  flex items-center justify-center
                  shadow-lg shadow-papsnet-accent-electric/30
                  animate-pulse-glow
                ">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-papsnet-gray-300 text-lg font-medium">
                  {currentLang === 'ko' ? '제품 데모 보기' : 'Watch Product Demo'}
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 left-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-papsnet-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default PapsnetHero;