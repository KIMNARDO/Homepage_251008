/**
 * SEO utilities for meta tags and structured data
 */

import type { SEOProps } from '@/types';

export const generatePageTitle = (title?: string, includeCompany = true): string => {
  const companyName = 'PAPSNET';

  if (!title) {
    return `${companyName} - PLM 솔루션으로 스마트 팩토리를 구현하세요`;
  }

  return includeCompany ? `${title} | ${companyName}` : title;
};

export const generateMetaDescription = (description?: string): string => {
  return description || 'PAPSNET은 제품 라이프사이클 관리와 협력사 도면 배포를 통해 더 나은 제품 개발을 지원합니다. CLIP PLM, DDMS, EPL 등 혁신적인 솔루션을 경험해보세요.';
};

export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://www.papsnet.net';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

export const generateStructuredData = (type: 'website' | 'article', data: any) => {
  const baseData = {
    '@context': 'https://schema.org',
  };

  switch (type) {
    case 'website':
      return {
        ...baseData,
        '@type': 'WebSite',
        name: 'PAPSNET',
        description: 'PLM 솔루션 전문기업',
        url: 'https://www.papsnet.net',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.papsnet.net/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
        ...data,
      };

    case 'article':
      return {
        ...baseData,
        '@type': 'Article',
        publisher: {
          '@type': 'Organization',
          name: 'PAPSNET',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.papsnet.net/logo.png',
          },
        },
        ...data,
      };

    default:
      return baseData;
  }
};

export const defaultSEOConfig: SEOProps = {
  title: 'PAPSNET - PLM 솔루션으로 스마트 팩토리를 구현하세요',
  description: 'PAPSNET은 제품 라이프사이클 관리와 협력사 도면 배포를 통해 더 나은 제품 개발을 지원합니다.',
  keywords: ['PLM', 'PDM', 'DDMS', 'EPL', 'CAD', '도면관리', '제품라이프사이클', '스마트팩토리'],
  image: 'https://www.papsnet.net/og-image.jpg',
  url: 'https://www.papsnet.net',
  type: 'website',
};