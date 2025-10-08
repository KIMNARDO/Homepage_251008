/**
 * Unified Section Management System
 *
 * All homepage sections can be managed through admin panel
 */

// Base section interface
export interface BaseSection {
  id: string;
  type: SectionType;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt?: string;
}

// Section types
export type SectionType =
  | 'hero'
  | 'stats'
  | 'social-proof'
  | 'products'
  | 'ai-features'
  | 'features'
  | 'integration'
  | 'cta';

// Hero Section
export interface HeroSection extends BaseSection {
  type: 'hero';
  content: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage?: string;
    videoUrl?: string;
  };
}

// Stats Section
export interface StatsSection extends BaseSection {
  type: 'stats';
  content: {
    heading?: string;
    stats: Array<{
      label: string;
      value: string;
      description?: string;
      icon?: string;
    }>;
  };
}

// Social Proof Section
export interface SocialProofSection extends BaseSection {
  type: 'social-proof';
  content: {
    heading: string;
    subheading?: string;
    testimonials: Array<{
      name: string;
      company: string;
      position: string;
      content: string;
      rating?: number;
      avatar?: string;
    }>;
  };
}

// Products Section
export interface ProductsSection extends BaseSection {
  type: 'products';
  content: {
    heading: string;
    subheading: string;
    products: Array<{
      id: string;
      title: string;
      subtitle: string;
      description: string;
      features: string[];
      icon?: string;
      image?: string;
      link?: string;
    }>;
  };
}

// AI Features Section
export interface AIFeaturesSection extends BaseSection {
  type: 'ai-features';
  content: {
    heading: string;
    subheading: string;
    features: Array<{
      title: string;
      description: string;
      icon?: string;
      badge?: string;
    }>;
  };
}

// Features Section
export interface FeaturesSection extends BaseSection {
  type: 'features';
  content: {
    heading: string;
    subheading: string;
    features: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  };
}

// Integration Section
export interface IntegrationSection extends BaseSection {
  type: 'integration';
  content: {
    heading: string;
    subheading: string;
    integrations: Array<{
      name: string;
      description: string;
      logo?: string;
      category: string;
    }>;
  };
}

// CTA Section
export interface CTASection extends BaseSection {
  type: 'cta';
  content: {
    heading: string;
    subheading: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton?: {
      text: string;
      link: string;
    };
    backgroundImage?: string;
  };
}

// Union type for all sections
export type Section =
  | HeroSection
  | StatsSection
  | SocialProofSection
  | ProductsSection
  | AIFeaturesSection
  | FeaturesSection
  | IntegrationSection
  | CTASection;

// Section metadata for admin panel
export const SECTION_METADATA: Record<SectionType, { name: string; description: string; icon: string }> = {
  'hero': {
    name: '히어로 섹션',
    description: '메인 페이지 최상단 섹션',
    icon: '🎯'
  },
  'stats': {
    name: '통계 섹션',
    description: '주요 지표 및 성과 표시',
    icon: '📊'
  },
  'social-proof': {
    name: '고객 평가 섹션',
    description: '고객 후기 및 평점',
    icon: '⭐'
  },
  'products': {
    name: '제품 쇼케이스',
    description: '제품 및 서비스 소개',
    icon: '🚀'
  },
  'ai-features': {
    name: 'AI 기능 섹션',
    description: 'AI 기반 기능 강조',
    icon: '🤖'
  },
  'features': {
    name: '주요 기능 섹션',
    description: '핵심 기능 나열',
    icon: '✨'
  },
  'integration': {
    name: '통합 섹션',
    description: '외부 서비스 연동',
    icon: '🔗'
  },
  'cta': {
    name: '행동 유도 섹션',
    description: '사용자 행동 유도 (CTA)',
    icon: '🎬'
  }
};

// Default section templates
export const DEFAULT_SECTIONS: Record<SectionType, Omit<Section, 'id' | 'createdAt' | 'updatedAt'>> = {
  'hero': {
    type: 'hero',
    isPublished: true,
    order: 0,
    content: {
      title: '새로운 제목을 입력하세요',
      subtitle: '부제목을 입력하세요',
      ctaText: '시작하기',
      ctaLink: '/demo'
    }
  },
  'stats': {
    type: 'stats',
    isPublished: true,
    order: 1,
    content: {
      heading: '수치로 보는 성과',
      stats: [
        { label: '고객사', value: '500+', icon: '🏢' },
        { label: '프로젝트', value: '1,000+', icon: '📁' },
        { label: '만족도', value: '99%', icon: '⭐' },
        { label: '지원', value: '24/7', icon: '💬' }
      ]
    }
  },
  'social-proof': {
    type: 'social-proof',
    isPublished: true,
    order: 2,
    content: {
      heading: '고객 평가',
      subheading: '실제 고객들의 생생한 후기',
      testimonials: [
        {
          name: '홍길동',
          company: 'ABC 제조',
          position: 'CTO',
          content: '탁월한 솔루션입니다.',
          rating: 5
        }
      ]
    }
  },
  'products': {
    type: 'products',
    isPublished: true,
    order: 3,
    content: {
      heading: '제품 라인업',
      subheading: '혁신적인 솔루션',
      products: []
    }
  },
  'ai-features': {
    type: 'ai-features',
    isPublished: true,
    order: 4,
    content: {
      heading: 'AI 기능',
      subheading: '인공지능 기반 혁신',
      features: [
        {
          title: 'AI 분석',
          description: '자동 데이터 분석',
          badge: 'NEW'
        }
      ]
    }
  },
  'features': {
    type: 'features',
    isPublished: true,
    order: 5,
    content: {
      heading: '주요 기능',
      subheading: '강력한 기능들',
      features: [
        {
          title: '실시간 협업',
          description: '팀원들과 실시간으로 협업',
          icon: '👥'
        }
      ]
    }
  },
  'integration': {
    type: 'integration',
    isPublished: true,
    order: 6,
    content: {
      heading: '통합 연동',
      subheading: '다양한 서비스와 연동',
      integrations: [
        {
          name: 'AutoCAD',
          description: 'CAD 통합',
          category: 'CAD'
        }
      ]
    }
  },
  'cta': {
    type: 'cta',
    isPublished: true,
    order: 7,
    content: {
      heading: '지금 시작하세요',
      subheading: '무료 체험을 통해 직접 경험해보세요',
      primaryButton: {
        text: '무료 체험',
        link: '/trial'
      },
      secondaryButton: {
        text: '데모 요청',
        link: '/demo'
      }
    }
  }
};
