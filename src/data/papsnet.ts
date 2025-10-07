import type { NavigationItem, NavigationSection, FeatureCard, CompanyLogo, Testimonial, Product, Project } from '@/types';

// Company information
export const COMPANY_INFO = {
  name: '주식회사 팹스넷',
  nameEn: 'PAPSNET Co., Ltd.',
  fullName: 'People and People Solution Networks',
  slogan: 'People and People Solution Networks',
  established: '2021년 6월 1일',
  ceo: '김현석',
  website: 'www.papsnet.net',
  email: 'kimnardo@papsnet.net',
  phone: '(070) 500-1144',
  fax: '(070) 7500-5747',
  mobile: '010-5050-2011',
  address: '서울 금천구 범안로 1142 하우스디 더 스카이밸리 가산2차 714~715호',
  subway: '1호선 독산역 3번 출구',
  description: '팹스넷은 기업 성공을 위해 필수적인 연구개발 솔루션을 국내 자동차, 반도체, 의료기기 산업체에 납품하고 있습니다.',
  mission: '항상 고객을 최우선으로 생각하며 적극적인 커뮤니케이션을 통해 안정적이고 안전한 서비스를 제공하기 위해 노력합니다.',
  values: ['전문성', '신뢰성', '네트워크 인간성'],
  certifications: ['벤처기업 인증', '기업부설연구소 인증'],
  stats: {
    projects: '30+',
    customers: '20+',
    expertRate: '80%',
    established: '2021'
  }
} as const;

// Navigation data
export const MAIN_NAVIGATION: NavigationItem[] = [
  { text: '솔루션', href: '/solutions' },
  { text: 'CLIP PLM', href: '/clip-plm' },
  { text: '활용사례', href: '/case-studies' },
  { text: '가격정책', href: '/pricing' },
  { text: '기술문서', href: '/docs' },
  { text: '블로그', href: '/blog' },
  { text: '연락처', href: '/contact' },
];

export const FOOTER_NAVIGATION: NavigationSection[] = [
  {
    title: '솔루션',
    links: [
      { text: 'CLIP PLM', href: '/clip-plm' },
      { text: 'CLIP DDMS', href: '/clip-ddms' },
      { text: 'CLIP EPL', href: '/clip-epl' },
      { text: 'CLIP PMS', href: '/clip-pms' },
      { text: 'CLIP ICMS', href: '/clip-icms' },
      { text: 'CADWin AI', href: '/cadwin-ai', badge: 'New' },
    ],
  },
  {
    title: '회사',
    links: [
      { text: '블로그', href: '/blog' },
      { text: '고객사', href: '/customers' },
      { text: '채용정보', href: '/careers', badge: '진행중' },
      { text: '개인정보처리방침', href: '/privacy' },
      { text: '서비스 이용약관', href: '/terms' },
    ],
  },
  {
    title: '자료',
    links: [
      { text: '기술문서', href: '/docs' },
      { text: '가격정책', href: '/pricing' },
      { text: '시스템 상태', href: 'https://status.papsnet.net', external: true },
      { text: '가이드', href: '/guides' },
      { text: 'PLM 워크플로우', href: '/plm-workflow' },
    ],
  },
  {
    title: '연결',
    links: [
      { text: '연락처', href: '/contact' },
      { text: '커뮤니티', href: 'https://community.papsnet.net', external: true },
      { text: 'GitHub', href: 'https://github.com/papsnet', external: true },
      { text: 'LinkedIn', href: 'https://linkedin.com/company/papsnet', external: true },
      { text: 'YouTube', href: 'https://youtube.com/@papsnet', external: true },
    ],
  },
];

// Hero section data
export const HERO_DATA = {
  announcement: {
    text: '🚀 CADWin AI 출시! AutoCAD 도면 자동 분석 및 유사 도면 검색',
    href: '/solutions/cadwin-ai',
  },
  heading: 'People and People Solution Networks',
  subheading: '기업 성공을 위한 PLM 솔루션 전문기업. 자동차, 반도체, 의료기기 산업의 제품 개발 혁신을 이끌어갑니다.',
  tagline: 'CLIP PLM으로 제품 개발의 모든 과정을 혁신하세요',
  cta: [
    {
      text: '무료 체험 시작',
      href: '/contact',
      variant: 'primary' as const,
    },
    {
      text: '온라인 데모 예약',
      href: '/demo',
      variant: 'secondary' as const,
    },
  ],
  featureTabs: [
    { icon: '📋', text: '프로젝트 관리' },
    { icon: '📐', text: 'PLM 시스템' },
    { icon: '🤖', text: 'AI 도면 분석' },
    { icon: '💬', text: '협업 도구' },
    { icon: '🔄', text: '설계 변경' },
    { icon: '📊', text: '대시보드' },
    { icon: '📈', text: '개발 지표' },
  ],
};

// Social proof data
export const SOCIAL_PROOF = {
  heading: '20개 이상의 기업이 PAPSNET과 함께 성장하고 있습니다',
  companies: [
    { name: 'DSC', src: '/logos/dsc.svg', alt: 'DSC 로고' },
    { name: '우리산업', src: '/logos/woory.svg', alt: '우리산업 로고' },
    { name: '하이로닉', src: '/logos/hironic.svg', alt: '하이로닉 로고' },
    { name: 'AT SMART', src: '/logos/atsmart.svg', alt: 'AT SMART 로고' },
    { name: '현대공업', src: '/logos/hyundai-industrial.svg', alt: '현대공업 로고' },
    { name: '네오바이오텍', src: '/logos/neobiotech.svg', alt: '네오바이오텍 로고' },
    { name: '타이거테크', src: '/logos/tigertech.svg', alt: '타이거테크 로고' },
    { name: '수성정밀', src: '/logos/soosung.svg', alt: '수성정밀 로고' },
    { name: '파라다이스시티', src: '/logos/paradise.svg', alt: '파라다이스시티 로고' },
    { name: '마이헨지', src: '/logos/myhinge.svg', alt: '마이헨지 로고' },
    { name: '올리브헬스케어', src: '/logos/olive.svg', alt: '올리브헬스케어 로고' },
    { name: '명화공업', src: '/logos/myunghwa.svg', alt: '명화공업 로고' },
    { name: '동성케미컬', src: '/logos/dongsung.svg', alt: '동성케미컬 로고' },
    { name: '대명전기', src: '/logos/daemyung.svg', alt: '대명전기 로고' },
    { name: '스마트비전', src: '/logos/smartvision.svg', alt: '스마트비전 로고' },
    { name: '아이디랩', src: '/logos/idlab.svg', alt: '아이디랩 로고' },
    { name: '테크빌', src: '/logos/techville.svg', alt: '테크빌 로고' },
    { name: '원익로보틱스', src: '/logos/wonick.svg', alt: '원익로보틱스 로고' },
    { name: '바이오텍', src: '/logos/biotech.svg', alt: '바이오텍 로고' },
    { name: '지엔티', src: '/logos/gnt.svg', alt: '지엔티 로고' },
  ] as CompanyLogo[],
  cta: {
    text: '고객사 더 보기',
    href: '/customers',
  },
  testimonials: [
    {
      id: '1',
      company: '현대자동차',
      title: 'CLIP PLM으로 글로벌 자동차 부품 개발 프로세스 혁신',
      href: '/case-studies/hyundai',
    },
    {
      id: '2',
      company: 'KIA',
      title: 'DDMS를 통한 1,000개 협력사와 실시간 도면 공유 체계 구축',
      href: '/case-studies/kia',
    },
    {
      id: '3',
      company: '하이로닉',
      title: 'PLM 도입으로 의료장비 개발 주기를 30% 단축',
      href: '/case-studies/hironic',
    },
    {
      id: '4',
      company: 'AT스마트',
      title: 'CLIP PMS로 프로젝트 관리 체계화 및 품질 향상',
      href: '/case-studies/atsmart',
    },
  ] as Testimonial[],
};

// AI Features data
export const AI_FEATURES: FeatureCard[] = [
  {
    id: '1',
    title: 'AI 기반 도면 자동 분석',
    description: 'CADWin AI가 AutoCAD 도면을 자동으로 분석하고 유사 도면을 검색하여 설계 효율성을 극대화합니다.',
    cta: {
      text: '자세히 보기',
      href: '/cadwin-ai',
    },
  },
  {
    id: '2',
    title: '스마트 BOM 관리',
    description: 'Multi-BOM 시스템으로 기구와 전자 부품을 통합 관리하고 AI가 최적의 부품 조합을 제안합니다.',
    cta: {
      text: '자세히 보기',
      href: '/clip-epl',
    },
  },
  {
    id: '3',
    title: '지능형 설계 변경 관리',
    description: 'ECR/ECO 프로세스를 자동화하고 변경 영향도를 AI로 분석하여 리스크를 사전에 방지합니다.',
    cta: {
      text: '자세히 보기',
      href: '/features/change-management',
    },
  },
  {
    id: '4',
    title: '원가 최적화 시뮬레이션',
    description: 'ICMS가 실시간 원자재 가격 변동을 반영하여 최적의 원가 구조를 제안합니다.',
    cta: {
      text: '자세히 보기',
      href: '/clip-icms',
    },
  },
  {
    id: '5',
    title: '품질 예측 분석',
    description: '과거 데이터를 기반으로 품질 이슈를 예측하고 예방 조치를 자동으로 제안합니다.',
    cta: {
      text: '자세히 보기',
      href: '/features/quality-prediction',
    },
  },
];

// Main Features data
export const MAIN_FEATURES: FeatureCard[] = [
  {
    id: '1',
    title: 'CLIP PLM으로 제품 개발 가속화',
    description: 'PMS 프로젝트 관리와 PDM 도면 관리를 통합한 혁신적인 솔루션으로 제품 개발 전 과정을 체계화합니다.',
    image: {
      src: '/images/clip-plm-dashboard.jpg',
      alt: 'CLIP PLM 대시보드',
    },
    cta: {
      text: 'PLM 시작하기',
      href: '/clip-plm',
    },
  },
  {
    id: '2',
    title: '협력사와의 완벽한 협업',
    description: 'CLIP DDMS로 협력사에게 안전하게 도면을 배포하고 실시간 협업이 가능합니다.',
    image: {
      src: '/images/clip-ddms-collaboration.jpg',
      alt: 'CLIP DDMS 협업 시스템',
    },
    cta: {
      text: '협업 도구 보기',
      href: '/clip-ddms',
    },
  },
  {
    id: '3',
    title: '실시간 프로젝트 현황 파악',
    description: '직관적인 대시보드로 프로젝트 진행 상황을 실시간으로 모니터링하고 의사결정을 지원합니다.',
    cta: {
      text: '대시보드 체험하기',
      href: '/demo',
    },
  },
  {
    id: '4',
    title: '스마트 원가 관리',
    description: 'ICMS로 원자재 가격 변동을 실시간 추적하고 최적의 원가 구조를 유지합니다.',
    cta: {
      text: '원가 관리 보기',
      href: '/clip-icms',
    },
  },
  {
    id: '5',
    title: '통합 품질 관리',
    description: '8D Report부터 FMEA까지 품질 관리의 모든 과정을 디지털화하여 관리합니다.',
    cta: {
      text: '품질 관리 보기',
      href: '/features/quality',
    },
  },
  {
    id: '6',
    title: 'CADWin AI 도면 분석',
    description: 'AutoCAD와 완벽 통합된 AI 기술로 도면 분석과 유사 도면 검색을 자동화합니다.',
    cta: {
      text: 'AI 기능 체험하기',
      href: '/cadwin-ai',
    },
  },
];

// Integration section data
export const INTEGRATION_DATA = {
  heading: '기업 인프라와 완벽한 통합',
  subheading: 'PAPSNET은 기존에 사용 중인 시스템과 원활하게 연동됩니다',
  logos: [
    { name: 'AutoCAD', src: '/logos/autocad.svg', alt: 'AutoCAD 로고' },
    { name: 'SolidWorks', src: '/logos/solidworks.svg', alt: 'SolidWorks 로고' },
    { name: 'Git', src: '/logos/git.svg', alt: 'Git 로고' },
    { name: 'SAP ERP', src: '/logos/sap.svg', alt: 'SAP ERP 로고' },
    { name: 'Oracle DB', src: '/logos/oracle.svg', alt: 'Oracle DB 로고' },
  ] as CompanyLogo[],
  benefits: [
    {
      title: '혁신이 일어나는 곳',
      description: 'PAPSNET을 도입한 기업들은 더 많은 제품을 더 빠르게 개발하고 있습니다.',
    },
    {
      title: 'ERP와 완벽 연동',
      description: 'ERP 시스템과의 깊은 통합으로 팀 전체가 항상 동기화된 상태를 유지합니다.',
    },
    {
      title: 'CAD 도구 기반 구축',
      description: 'PAPSNET은 기존 CAD 워크플로우와 완벽하게 통합됩니다.',
    },
  ],
};

// Products data
export const PRODUCTS: Product[] = [
  {
    id: 'clip-plm',
    name: 'CLIP PLM',
    version: '3.0',
    description: '제품 라이프사이클 전체를 관리하는 통합 솔루션',
    category: 'PLM',
    features: [
      'PMS 프로젝트 관리',
      'PDM 도면 관리',
      'E-BOM 관리',
      '설계변경(ECR/ECO/ECN) 관리',
      '결재 및 승인 프로세스',
      '대시보드 및 리포팅',
    ],
  },
  {
    id: 'clip-ddms',
    name: 'CLIP DDMS',
    version: '2.0',
    description: '협력사 도면 배포 및 협업 솔루션',
    category: 'DDMS',
    features: [
      '안전한 도면 배포',
      '워터마크 자동 삽입',
      '배포 이력 관리',
      '협력업체 관리',
      '권한별 접근 제어',
      '만료일 자동 관리',
    ],
  },
  {
    id: 'clip-epl',
    name: 'CLIP EPL',
    version: '1.0',
    description: '기구&전자 Multi-BOM 관리 솔루션',
    category: 'EPL',
    features: [
      'Multi-BOM 통합 관리',
      '사양별 BOM 구성',
      '국가별 BOM 관리',
      '부품 라이브러리',
      'BOM 설계변경 결재',
      'ERP 연동',
    ],
  },
  {
    id: 'clip-icms',
    name: 'CLIP ICMS',
    version: '1.0',
    description: '통합 원가 관리 시스템',
    category: 'ICMS',
    features: [
      '사전/사후 원가 관리',
      '원자재 가격 실시간 연동',
      '수율 시뮬레이션',
      '전자 합의 프로세스',
      '원가 분석 리포트',
      '다국어/해외법인 지원',
    ],
  },
];

// Projects/Case studies data
export const RECENT_PROJECTS: Project[] = [
  {
    id: '1',
    company: 'DSC',
    product: 'CLIP PLM',
    version: '2.0',
    period: '2021~현재',
    industry: '자동차 부품 1차 제조',
    status: 'ongoing',
  },
  {
    id: '2',
    company: '우리산업',
    product: 'CLIP PLM',
    version: '3.0',
    period: '2021~현재',
    industry: '자동차 부품 1차 제조',
    status: 'ongoing',
  },
  {
    id: '3',
    company: '하이로닉',
    product: 'CLIP PLM',
    version: '2.0',
    period: '2022~2023',
    industry: '의료장비 생산',
    status: 'completed',
  },
  {
    id: '4',
    company: 'AT스마트',
    product: 'CLIP PMS',
    version: '1.0',
    period: '2021~2022',
    industry: '자동차 부품 제조',
    status: 'completed',
  },
  {
    id: '5',
    company: 'PARADISE CITY',
    product: 'CLIP 주문관리',
    version: '1.0',
    period: '2023',
    industry: '국제 호텔',
    status: 'completed',
  },
  {
    id: '6',
    company: '마이헨지',
    product: 'CLIP MES',
    version: '2.0',
    period: '2023~현재',
    industry: '키오스크 제조 생산',
    status: 'ongoing',
  },
];

// Call-to-Action data
export const CTA_SECTION = {
  heading: '세계 최고 수준의 엔지니어링 팀을 위해 구축된 솔루션, 이제 모든 기업이 사용할 수 있습니다',
  cta: [
    {
      text: '데모 요청하기',
      href: '/demo',
      variant: 'secondary' as const,
    },
    {
      text: '무료 체험 시작',
      href: '/trial',
      variant: 'primary' as const,
    },
  ],
};