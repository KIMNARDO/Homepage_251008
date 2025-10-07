import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { adminContentAPI, adminLegacyContentAPI, publicContentAPI, type ApiResponse, type ContentApiRecord, type HomepageContentPayload } from '@/services/api';

export interface HeroContent {
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

export interface ProductContent {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  stats: Record<string, string>;
  image?: string;
  href?: string;
}

export interface ProductSectionContent {
  heading: string;
  subheading: string;
  products: ProductContent[];
}

interface ContentSection {
  id: string;
  type: 'hero' | 'products' | 'features' | 'pricing' | 'testimonials' | 'cta';
  title: string;
  content: HeroContent | ProductSectionContent | Record<string, any>;
  isVisible: boolean;
  order: number;
  updatedAt: string;
}

interface SimpleContentRecord {
  id: number;
  contentKey: string;
  contentValue: string;
  contentType?: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaPrimary?: boolean;
  displayOrder?: number;
  isActive?: boolean;
  isPublished?: boolean;
  languageCode?: string;
  sectionIdentifier?: string;
  metadata?: string;
  updatedAt?: string;
}

interface AdminContentPayload {
  contentType: string;
  title: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaPrimary?: boolean;
  displayOrder: number;
  isPublished: boolean;
  languageCode?: string;
  sectionIdentifier: string;
  cssClass?: string;
  iconClass?: string;
  metadata?: string;
}

const HERO_SECTION_IDENTIFIER = 'home-hero';
const HERO_DEFAULT_LANGUAGE = 'ko';

interface ContentState {
  sections: ContentSection[];
  heroRecords: ContentApiRecord[];
  pendingHeroContent: HeroContent | null;
  isLoading: boolean;
  error: string | null;
  isDirty: boolean;

  // Actions
  loadContent: () => Promise<void>;
  updateSection: (id: string, content: Partial<ContentSection>) => void;
  updateSectionContent: (id: string, content: any) => void;
  reorderSections: (sections: ContentSection[]) => void;
  toggleSectionVisibility: (id: string) => void;
  saveChanges: () => Promise<void>;
  resetChanges: () => void;
  setError: (error: string | null) => void;
  getHeroContent: () => HeroContent | null;
  getProductSectionContent: () => ProductSectionContent | null;
}

const defaultSections: ContentSection[] = [
  {
    id: 'hero',
    type: 'hero',
    title: 'Hero Section',
    content: {
      announcement: {
        text: '🚀 CADWin AI 출시! AutoCAD 도면 자동 분석 및 유사 도면 검색',
        href: '/solutions/cadwin-ai'
      },
      heading: 'People and People Solution Networks',
      subheading: '기업 성공을 위한 PLM 솔루션 전문기업. 자동차, 반도체, 의료기기 산업의 제품 개발 혁신을 이끌어갑니다.',
      tagline: 'CLIP PLM으로 제품 개발의 모든 과정을 혁신하세요',
      cta: [
        {
          text: '무료 체험 시작',
          href: '/contact',
          variant: 'primary' as const
        },
        {
          text: '온라인 데모 예약',
          href: '/demo',
          variant: 'secondary' as const
        }
      ]
    } as HeroContent,
    isVisible: true,
    order: 1,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'products',
    type: 'products',
    title: 'Product Showcase',
    content: {
      heading: '혁신적인 PLM 솔루션 라인업',
      subheading: '제품 기획부터 폐기까지 전체 라이프사이클을 관리하는 통합 솔루션으로 기업의 디지털 전환을 가속화합니다',
      products: [
        {
          title: 'CLIP PLM',
          subtitle: 'Product Lifecycle Management',
          description: '제품 수명 주기를 관리하는 PMS 프로젝트 관리와 기업 연구소의 도면 데이터를 동시에 관리하는 혁신적인 통합 솔루션',
          features: [
            '공지사항 & 대시보드',
            '프로젝트/도면 결재 관리',
            'E-BOM/Multi-BOM 관리',
            '설계변경(ECO, ECR, ECN) 관리'
          ],
          icon: '📊',
          color: 'from-electric-400 to-electric-600',
          stats: {
            efficiency: '+45%',
            time: '-60%',
            accuracy: '99.9%'
          }
        },
        {
          title: 'DDMS',
          subtitle: 'Dynamic Drawing Management System',
          description: '협력사 도면 배포 및 관리를 위한 솔루션으로 PLM과 연계해 최신 설계 변경 정보를 편리하게 적용',
          features: [
            '도면 배포 관리',
            '워터마크 자동 삽입',
            '이력 조회 및 추적',
            '협력업체 관리'
          ],
          icon: '📐',
          color: 'from-emerald-400 to-emerald-600',
          stats: {
            security: '100%',
            collaboration: '+80%',
            tracking: 'Real-time'
          }
        },
        {
          title: 'EPL',
          subtitle: 'Enterprise Parts Library',
          description: '기구&전자 Multi-BOM 솔루션으로 수십 개의 사양 BOM을 통합 관리하여 직관적으로 구성',
          features: [
            'Multi-BOM 생성/조회',
            'BOM 설계변경 결재',
            '사양 분류체계 관리',
            '리비전 관리'
          ],
          icon: '🔧',
          color: 'from-purple-400 to-purple-600',
          stats: {
            integration: '100%',
            processing: '10x',
            reliability: '99.9%'
          }
        },
        {
          title: 'ICMS',
          subtitle: 'Intelligent Cost Management System',
          description: '통합 원가 관리 시스템으로 사전/사후 원가를 자동 산출하고 실시간 가격 변동에 대응',
          features: [
            '프로젝트 견적 자동화',
            '원소재 가격 실시간 반영',
            '수율/불량률 시뮬레이션',
            '전자계약 통합 프로세스'
          ],
          icon: '💰',
          color: 'from-amber-400 to-amber-600',
          stats: {
            accuracy: '+95%',
            time: '-70%',
            cost: '-30%'
          }
        },
        {
          title: 'CADWin AI',
          subtitle: 'AI-Powered CAD Solution',
          description: 'AutoCAD와 완벽 통합된 AI 기반 도면 분석 솔루션으로 설계자 작업 흐름 최적화',
          features: [
            'AI 3차원 도면 분석',
            '자동 유사 도면 검색',
            '다품도 도면 분리 관리',
            'PDM 자동 등록'
          ],
          icon: '🤖',
          color: 'from-cyan-400 to-cyan-600',
          stats: {
            automation: '85%',
            accuracy: '99%',
            speed: '5x'
          }
        }
      ]
    } as ProductSectionContent,
    isVisible: true,
    order: 2,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'features',
    type: 'features',
    title: 'Features Section',
    content: {
      title: 'Powerful Features',
      subtitle: 'Everything you need to manage your product lifecycle',
      features: [
        {
          title: 'AI-Powered Analytics',
          description: 'Get intelligent insights and predictions',
          icon: 'chart'
        },
        {
          title: 'Real-time Collaboration',
          description: 'Work together seamlessly across teams',
          icon: 'users'
        },
        {
          title: 'Automated Workflows',
          description: 'Streamline processes with smart automation',
          icon: 'zap'
        }
      ]
    },
    isVisible: true,
    order: 3,
    updatedAt: new Date().toISOString()
  }
];

const fallbackHeroContent = (): HeroContent => {
  const hero = defaultSections.find((section) => section.id === 'hero');
  if (hero) {
    const content = hero.content as HeroContent;
    return {
      announcement: { ...content.announcement },
      heading: content.heading,
      subheading: content.subheading,
      tagline: content.tagline,
      cta: content.cta.map((cta) => ({ ...cta })),
      backgroundImage: content.backgroundImage,
      backgroundVideo: content.backgroundVideo
    };
  }

  return {
    announcement: { text: '', href: '#' },
    heading: '',
    subheading: '',
    tagline: '',
    cta: []
  };
};

const transformHeroContent = (records: ContentApiRecord[]): HeroContent => {
  const hero = fallbackHeroContent();
  hero.cta = [];

  records
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .forEach((record) => {
      switch (record.contentType) {
        case 'ANNOUNCEMENT':
          hero.announcement = {
            text: record.title || record.content || hero.announcement.text,
            href: record.ctaHref || record.content || hero.announcement.href || '#'
          };
          break;
        case 'HERO_HEADING':
          hero.heading = record.title || record.content || hero.heading;
          break;
        case 'HERO_SUBHEADING':
          hero.subheading = record.content || record.title || hero.subheading;
          break;
        case 'HERO_BANNER':
          hero.tagline = record.content || record.title || hero.tagline;
          if (record.imageUrl) {
            hero.backgroundImage = record.imageUrl;
          }
          break;
        case 'HERO_VIDEO':
          hero.backgroundVideo = record.videoUrl || record.content || hero.backgroundVideo;
          break;
        case 'HERO_CTA':
          hero.cta.push({
            text: record.ctaText || record.title || 'CTA',
            href: record.ctaHref || '#',
            variant: record.ctaPrimary ? 'primary' : 'secondary'
          });
          break;
        default:
          break;
      }
    });

  if (hero.cta.length === 0) {
    hero.cta = fallbackHeroContent().cta;
  }

  return hero;
};


const HERO_KEY_TO_TYPE: Record<string, ContentApiRecord['contentType']> = {
  'hero.title': 'HERO_HEADING',
  'hero.subtitle': 'HERO_SUBHEADING',
  'hero.description': 'HERO_BANNER',
  'hero.tagline': 'HERO_BANNER',
  'hero.announcement': 'ANNOUNCEMENT',
  'hero.cta.primary': 'HERO_CTA',
  'hero.cta.secondary': 'HERO_CTA',
  'hero.video': 'HERO_VIDEO',
  'hero.backgroundImage': 'HERO_BANNER'
};

const HERO_CONTENT_ORDER = {
  ANNOUNCEMENT: 1,
  HERO_HEADING: 2,
  HERO_SUBHEADING: 3,
  HERO_BANNER: 4,
  HERO_VIDEO: 5,
  HERO_CTA: 6
} as const;

const LEGACY_KEY_MAP: Record<string, string> = {
  ANNOUNCEMENT: 'hero.announcement',
  HERO_HEADING: 'hero.title',
  HERO_SUBHEADING: 'hero.subtitle',
  HERO_BANNER: 'hero.description',
  HERO_VIDEO: 'hero.video',
  HERO_CTA: 'hero.cta'
};

const defaultTitleForType = (type: string): string => {
  switch (type) {
    case 'ANNOUNCEMENT':
      return '공지사항';
    case 'HERO_HEADING':
      return 'Hero Heading';
    case 'HERO_SUBHEADING':
      return 'Hero Subheading';
    case 'HERO_BANNER':
      return 'Hero Banner';
    case 'HERO_VIDEO':
      return 'Hero Video';
    case 'HERO_CTA':
      return 'CTA';
    default:
      return 'Content';
  }
};

const isContentApiRecordArray = (records: unknown[]): records is ContentApiRecord[] =>
  Array.isArray(records) &&
  records.every(record => !!record && typeof record === 'object' && 'contentType' in (record as Record<string, unknown>));

const isSimpleContentRecordArray = (records: unknown[]): records is SimpleContentRecord[] =>
  Array.isArray(records) &&
  records.every(record => !!record && typeof record === 'object' && 'contentKey' in (record as Record<string, unknown>));

const filterHeroRecords = (records: ContentApiRecord[]): ContentApiRecord[] =>
  records.filter(record =>
    record.contentType?.startsWith('HERO') ||
    record.contentType === 'ANNOUNCEMENT' ||
    record.sectionIdentifier === HERO_SECTION_IDENTIFIER
  );

const mapSimpleRecordsToContentRecords = (records: SimpleContentRecord[]): ContentApiRecord[] => {
  return records
    .map((record, index) => {
      const contentType = HERO_KEY_TO_TYPE[record.contentKey];
      if (!contentType) {
        return null;
      }

      const value = record.contentValue ?? record.description ?? '';
      const displayOrder = record.displayOrder ??
        HERO_CONTENT_ORDER[contentType as keyof typeof HERO_CONTENT_ORDER] ?? index + 1;
      const title = value || record.description || defaultTitleForType(contentType);

      let ctaPrimary: boolean | undefined = record.ctaPrimary;
      if (ctaPrimary === undefined && contentType === 'HERO_CTA') {
        if (record.contentKey.includes('primary')) ctaPrimary = true;
        if (record.contentKey.includes('secondary')) ctaPrimary = false;
      }

      return {
        id: record.id,
        contentType,
        title,
        content: value,
        contentKey: record.contentKey,
        contentValue: value,
        imageUrl: record.imageUrl,
        videoUrl: record.videoUrl,
        ctaText: record.ctaText ?? (contentType === 'HERO_CTA' ? title : undefined),
        ctaHref: record.ctaHref,
        ctaPrimary,
        displayOrder,
        isPublished: record.isPublished ?? record.isActive ?? true,
        languageCode: record.languageCode ?? HERO_DEFAULT_LANGUAGE,
        sectionIdentifier: record.sectionIdentifier ?? HERO_SECTION_IDENTIFIER,
        metadata: record.metadata,
        updatedAt: record.updatedAt
      } as ContentApiRecord;
    })
    .filter((record): record is ContentApiRecord => record !== null)
    .sort((a, b) => a.displayOrder - b.displayOrder);
};

const fetchHeroRecords = async (): Promise<ContentApiRecord[]> => {
  try {
    const homepageResponse = await publicContentAPI.homepage() as ApiResponse<HomepageContentPayload>;
    if (homepageResponse?.success && homepageResponse.data?.heroContent?.length) {
      return filterHeroRecords(homepageResponse.data.heroContent);
    }
  } catch (error) {
    console.warn('[ContentStore] Failed to fetch homepage payload, falling back to list()', error);
  }

  try {
    const listResponse = await publicContentAPI.list() as ApiResponse<ContentApiRecord[] | SimpleContentRecord[]>;
    if (listResponse?.success && Array.isArray(listResponse.data)) {
      if (isContentApiRecordArray(listResponse.data)) {
        return filterHeroRecords(listResponse.data);
      }
      if (isSimpleContentRecordArray(listResponse.data)) {
        return mapSimpleRecordsToContentRecords(listResponse.data);
      }
    }
  } catch (error) {
    console.warn('[ContentStore] Failed to fetch public content list', error);
  }

  return [];
};

interface HeroPayloadOverrides {
  title?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaPrimary?: boolean;
  displayOrder?: number;
  isPublished?: boolean;
}

const safeText = (value: string | undefined, fallback: string): string =>
  value && value.trim().length > 0 ? value : fallback;

const buildHeroPayload = (
  type: string,
  existing: ContentApiRecord | undefined,
  overrides: HeroPayloadOverrides,
  sectionIdentifier: string,
  languageCode: string,
  defaultDisplayOrder: number
): AdminContentPayload => ({
  contentType: type,
  title: safeText(overrides.title ?? existing?.title, defaultTitleForType(type)),
  content: overrides.content ?? existing?.content,
  imageUrl: overrides.imageUrl ?? existing?.imageUrl,
  imageAlt: overrides.imageAlt ?? existing?.imageAlt,
  videoUrl: overrides.videoUrl ?? existing?.videoUrl,
  ctaText: overrides.ctaText ?? existing?.ctaText,
  ctaHref: overrides.ctaHref ?? existing?.ctaHref,
  ctaPrimary: overrides.ctaPrimary ?? existing?.ctaPrimary ?? false,
  displayOrder: overrides.displayOrder ?? existing?.displayOrder ?? defaultDisplayOrder,
  isPublished: overrides.isPublished ?? existing?.isPublished ?? true,
  languageCode,
  sectionIdentifier,
  cssClass: existing?.cssClass,
  iconClass: existing?.iconClass,
  metadata: existing?.metadata
});

const persistHeroContent = async (heroContent: HeroContent, heroRecords: ContentApiRecord[]) => {
  const sectionIdentifier =
    heroRecords.find(record => record.sectionIdentifier)?.sectionIdentifier ?? HERO_SECTION_IDENTIFIER;
  const languageCode =
    heroRecords.find(record => record.languageCode)?.languageCode ?? HERO_DEFAULT_LANGUAGE;

  const findByType = (type: string) =>
    heroRecords.find(record => record.contentType === type);

  const headingRecord = findByType('HERO_HEADING');
  const subheadingRecord = findByType('HERO_SUBHEADING');
  const bannerRecord = findByType('HERO_BANNER');
  const announcementRecord = findByType('ANNOUNCEMENT');
  const videoRecord = findByType('HERO_VIDEO');
  const ctaRecords = heroRecords
    .filter(record => record.contentType === 'HERO_CTA')
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const promises: Promise<unknown>[] = [];
  const legacyOps: Array<{ key: string; value: string; record?: ContentApiRecord }> = [];
  const upsert = (existing: ContentApiRecord | undefined, payload: AdminContentPayload) => {
    if (existing?.id) {
      promises.push(adminContentAPI.update(existing.id, payload));
    } else {
      promises.push(adminContentAPI.create(payload));
    }
  };

  const scheduleLegacy = (
    type: string,
    value: string,
    record?: ContentApiRecord,
    fallbackKey?: string
  ) => {
    const key = record?.contentKey || fallbackKey || LEGACY_KEY_MAP[type];
    if (!key) return;
    legacyOps.push({ key, value, record });
  };

  const announcementPayload = buildHeroPayload(
    'ANNOUNCEMENT',
    announcementRecord,
    {
      title: heroContent.announcement.text,
      content: heroContent.announcement.text,
      ctaText: heroContent.announcement.text,
      ctaHref: heroContent.announcement.href
    },
    sectionIdentifier,
    languageCode,
    HERO_CONTENT_ORDER.ANNOUNCEMENT
  );
  upsert(announcementRecord, announcementPayload);
  scheduleLegacy('ANNOUNCEMENT', JSON.stringify({
    text: heroContent.announcement.text,
    href: heroContent.announcement.href
  }), announcementRecord);

  const headingPayload = buildHeroPayload(
    'HERO_HEADING',
    headingRecord,
    {
      title: heroContent.heading,
      content: heroContent.heading
    },
    sectionIdentifier,
    languageCode,
    HERO_CONTENT_ORDER.HERO_HEADING
  );
  upsert(headingRecord, headingPayload);
  scheduleLegacy('HERO_HEADING', heroContent.heading, headingRecord);

  const subheadingPayload = buildHeroPayload(
    'HERO_SUBHEADING',
    subheadingRecord,
    {
      title: heroContent.subheading,
      content: heroContent.subheading
    },
    sectionIdentifier,
    languageCode,
    HERO_CONTENT_ORDER.HERO_SUBHEADING
  );
  upsert(subheadingRecord, subheadingPayload);
  scheduleLegacy('HERO_SUBHEADING', heroContent.subheading, subheadingRecord);

  const bannerPayload = buildHeroPayload(
    'HERO_BANNER',
    bannerRecord,
    {
      title: heroContent.tagline,
      content: heroContent.tagline,
      imageUrl: heroContent.backgroundImage
    },
    sectionIdentifier,
    languageCode,
    HERO_CONTENT_ORDER.HERO_BANNER
  );
  upsert(bannerRecord, bannerPayload);
  scheduleLegacy('HERO_BANNER', JSON.stringify({
    tagline: heroContent.tagline,
    backgroundImage: heroContent.backgroundImage
  }), bannerRecord);

  if (heroContent.backgroundVideo || videoRecord) {
    const videoPayload = buildHeroPayload(
      'HERO_VIDEO',
      videoRecord,
      {
        title: heroContent.backgroundVideo ?? videoRecord?.title,
        content: heroContent.backgroundVideo ?? videoRecord?.content,
        videoUrl: heroContent.backgroundVideo
      },
      sectionIdentifier,
      languageCode,
      HERO_CONTENT_ORDER.HERO_VIDEO
    );
    upsert(videoRecord, videoPayload);
  }

  let nextCtaOrder =
    (ctaRecords.length > 0
      ? Math.max(...ctaRecords.map(record => record.displayOrder ?? 0))
      : HERO_CONTENT_ORDER.HERO_CTA - 1) + 1;

      heroContent.cta.forEach((cta, index) => {
        const existing = ctaRecords[index];
        const payload = buildHeroPayload(
          'HERO_CTA',
          existing,
      {
        title: cta.text,
        content: cta.text,
        ctaText: cta.text,
        ctaHref: cta.href,
        ctaPrimary: cta.variant === 'primary',
        displayOrder: existing?.displayOrder ?? nextCtaOrder++
      },
      sectionIdentifier,
      languageCode,
      HERO_CONTENT_ORDER.HERO_CTA + index
        );
        upsert(existing, payload);
        const fallbackKey = `hero.cta.${cta.variant ?? `item-${index}`}`;
        scheduleLegacy('HERO_CTA', JSON.stringify(cta), existing, fallbackKey);
      });

  ctaRecords.slice(heroContent.cta.length).forEach(existing => {
    const payload = buildHeroPayload(
      'HERO_CTA',
      existing,
      {
        isPublished: false,
        displayOrder: existing.displayOrder
      },
      sectionIdentifier,
      languageCode,
      existing.displayOrder ?? HERO_CONTENT_ORDER.HERO_CTA
    );
    upsert(existing, payload);
    scheduleLegacy('HERO_CTA', JSON.stringify({
      text: existing.title,
      href: existing.ctaHref,
      variant: existing.ctaPrimary ? 'primary' : 'secondary'
    }), existing, existing?.contentKey);
  });

  if (promises.length > 0) {
    try {
      await Promise.all(promises);
    } catch (error) {
      console.warn('[ContentStore] Modern content API update failed, falling back to legacy', error);
    }
  }

  if (legacyOps.length > 0) {
    for (const op of legacyOps) {
      try {
        const payload = {
          contentKey: op.key,
          contentValue: op.value,
          contentType: 'text',
          description: `Auto-synced hero content (${op.key})`,
          isActive: true
        };
        if (op.record?.id) {
          await adminLegacyContentAPI.update(op.record.id, payload);
        } else {
          await adminLegacyContentAPI.create(payload);
        }
      } catch (error) {
        console.warn('[ContentStore] Legacy content API update failed for', op.key, error);
      }
    }
  }
};

export const useContentStore = create<ContentState>()(
  // Temporarily disable persist to ensure fresh data from backend
  // persist(
    subscribeWithSelector((set, get) => ({
      sections: defaultSections, // Start with default sections instead of empty array
      heroRecords: [],
      pendingHeroContent: null,
      isLoading: false,
      error: null,
      isDirty: false,

      loadContent: async () => {
        set({ isLoading: true, error: null });

        try {
          const heroRecords = await fetchHeroRecords();
          const currentSections = get().sections.length ? get().sections : defaultSections;
          const currentHeroSection = currentSections.find(section => section.id === 'hero');

          const heroContent = heroRecords.length > 0
            ? transformHeroContent(heroRecords)
            : (currentHeroSection?.content as HeroContent | undefined) ?? fallbackHeroContent();

          const heroVisible = heroRecords.length > 0
            ? heroRecords.some(record => record.isPublished !== false)
            : currentHeroSection?.isVisible ?? true;
          const sections = currentSections.map(section =>
            section.id === 'hero'
              ? {
                  ...section,
                  content: heroContent,
                  isVisible: heroVisible,
                  updatedAt: new Date().toISOString()
                }
              : section
          );

          set({
            sections,
            heroRecords,
            pendingHeroContent: null,
            isLoading: false,
            isDirty: false
          });
        } catch (error) {
          console.error('[ContentStore] Failed to load content', error);
          const currentSections = get().sections.length ? get().sections : defaultSections;
          set({
            sections: currentSections,
            heroRecords: get().heroRecords,
            pendingHeroContent: get().pendingHeroContent,
            error: error instanceof Error ? error.message : '콘텐츠를 불러오지 못했습니다.',
            isLoading: false
          });
        }
      },

      updateSection: (id: string, updates: Partial<ContentSection>) => {
        const { sections } = get();
        const updatedSections = sections.map(section =>
          section.id === id
            ? {
                ...section,
                ...updates,
                updatedAt: new Date().toISOString()
              }
            : section
        );

        set({
          sections: updatedSections,
          isDirty: true
        });

        // Auto-save after update
        setTimeout(() => {
          void get().saveChanges();
        }, 1000);
      },

      updateSectionContent: (id: string, content: any) => {
        const { sections } = get();
        const updatedSections = sections.map(section =>
          section.id === id
            ? {
                ...section,
                content,
                updatedAt: new Date().toISOString()
              }
            : section
        );

        set({
          sections: updatedSections,
          isDirty: true,
          ...(id === 'hero' ? { pendingHeroContent: content as HeroContent } : {})
        });

        // Auto-save after update
        setTimeout(() => {
          void get().saveChanges();
        }, 1000);
      },

      reorderSections: (newSections: ContentSection[]) => {
        const reorderedSections = newSections.map((section, index) => ({
          ...section,
          order: index + 1,
          updatedAt: new Date().toISOString()
        }));

        set({
          sections: reorderedSections,
          isDirty: true
        });
      },

      toggleSectionVisibility: (id: string) => {
        const { sections } = get();
        const updatedSections = sections.map(section =>
          section.id === id
            ? {
                ...section,
                isVisible: !section.isVisible,
                updatedAt: new Date().toISOString()
              }
            : section
        );

        set({
          sections: updatedSections,
          isDirty: true
        });

        // Auto-save after update
        setTimeout(() => {
          void get().saveChanges();
        }, 500);
      },

      saveChanges: async () => {
        const { pendingHeroContent, heroRecords } = get();

        if (!pendingHeroContent) {
          set({ isDirty: false });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          await persistHeroContent(pendingHeroContent, heroRecords);
          set({ pendingHeroContent: null });
          await get().loadContent();
        } catch (error) {
          const message = error instanceof Error ? error.message : '콘텐츠 저장에 실패했습니다.';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      resetChanges: () => {
        set({
          isDirty: false,
          error: null,
          pendingHeroContent: null
        });
        void get().loadContent();
      },

      setError: (error: string | null) => {
        set({ error });
      },

      getHeroContent: (): HeroContent | null => {
        const { sections } = get();
        const heroSection = sections.find(section => section.type === 'hero');
        return heroSection ? heroSection.content as HeroContent : null;
      },

      getProductSectionContent: (): ProductSectionContent | null => {
        const { sections } = get();
        const productSection = sections.find(section => section.type === 'products');
        return productSection ? productSection.content as ProductSectionContent : null;
      }
    }))
    // {
    //   name: 'content-store',
    //   storage: {
    //     getItem: (name) => {
    //       const str = localStorage.getItem(name);
    //       if (!str) return null;
    //       try {
    //         return JSON.parse(str);
    //       } catch {
    //         return null;
    //       }
    //     },
    //     setItem: (name, value) => {
    //       localStorage.setItem(name, JSON.stringify(value));
    //     },
    //     removeItem: (name) => localStorage.removeItem(name),
    //   },
    // }
  // )
);
