import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useContentStore } from '@/stores/contentStore';

interface ProductContent {
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

interface ProductSectionContent {
  heading: string;
  subheading: string;
  products: ProductContent[];
}

interface ProductShowcaseProps {
  content?: ProductSectionContent;
}

// Fallback product data based on company PDF
const FALLBACK_PRODUCTS = [
  {
    id: 'clip-plm',
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
    id: 'ddms',
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
    id: 'epl',
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
    id: 'icms',
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
    id: 'cadwin-ai',
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
];

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ content: propContent }) => {
  const { getProductSectionContent } = useContentStore();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [dataJsonSections, setDataJsonSections] = useState<any[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // 백엔드에서 섹션 데이터 로드 (히어로 패턴과 동일)
  const loadSectionsData = () => {
    axios.get('http://localhost:8080/api/public/sections')
      .then((response) => {
        console.log('[ProductShowcase] Loaded sections from data.json:', response.data);
        const publishedSections = response.data.filter((s: any) => s.isPublished);
        setDataJsonSections(publishedSections);
      })
      .catch((error) => console.error('[ProductShowcase] Failed to load sections:', error));
  };

  useEffect(() => {
    loadSectionsData();

    // 관리자 페이지에서 업데이트 이벤트 수신 (히어로 패턴과 동일)
    const handleSectionsUpdate = (event: CustomEvent) => {
      console.log('[ProductShowcase] Sections updated:', event.detail);
      loadSectionsData(); // 새로운 데이터 다시 로드
    };

    window.addEventListener('sectionsUpdated', handleSectionsUpdate as EventListener);
    return () => {
      window.removeEventListener('sectionsUpdated', handleSectionsUpdate as EventListener);
    };
  }, []);

  // Get content from admin or fallback to static data
  const adminContent = getProductSectionContent();

  // Transform dataJsonSections to product format
  const dynamicProducts = dataJsonSections.map(section => ({
    id: section.id,
    title: section.title,
    subtitle: section.subtitle || '',
    description: section.description || '',
    features: section.features?.filter((f: string) => f) || [],
    icon: '🚀', // Default icon
    color: 'from-electric-400 to-electric-600',
    stats: {
      status: section.isPublished ? 'Published' : 'Draft'
    }
  }));

  const content = propContent || adminContent || {
    heading: '혁신적인 PLM 솔루션 라인업',
    subheading: '제품 기획부터 폐기까지 전체 라이프사이클을 관리하는 통합 솔루션으로 기업의 디지털 전환을 가속화합니다',
    products: dynamicProducts.length > 0 ? dynamicProducts : FALLBACK_PRODUCTS
  };

  const [selectedProduct, setSelectedProduct] = useState(content.products[0] || FALLBACK_PRODUCTS[0]);

  // Update selected product when content changes
  useEffect(() => {
    if (content.products.length > 0) {
      setSelectedProduct(content.products[0]);
    }
  }, [dataJsonSections]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section ref={ref} className="py-20 bg-gradient-to-b from-navy-900 to-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-electric/10 text-electric-400 rounded-full text-sm font-medium mb-4">
            PAPSNET Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-gradient bg-gradient-to-r from-electric-400 to-purple-400 bg-clip-text text-transparent">
              {content.heading}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {content.subheading}
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {content.products.map((product, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
              onMouseEnter={() => setHoveredCard(index.toString())}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.div
                className={`
                  relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer
                  ${selectedProduct.title === product.title
                    ? 'bg-gradient-to-br ' + product.color + ' border-transparent shadow-2xl scale-105'
                    : 'bg-navy-50/50 backdrop-blur-sm border-white/10 hover:border-electric/50'
                  }
                `}
                onClick={() => setSelectedProduct(product)}
                whileHover={{ y: -5 }}
              >
                {/* Glow Effect */}
                {hoveredCard === index.toString() && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at center, ${product.color.split(' ')[1].replace('to-', '')}20 0%, transparent 70%)`,
                      filter: 'blur(40px)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-4xl mb-4">{product.icon}</div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-2 ${
                    selectedProduct.title === product.title ? 'text-white' : 'text-white'
                  }`}>
                    {product.title}
                  </h3>

                  {/* Subtitle */}
                  <p className={`text-sm mb-4 ${
                    selectedProduct.title === product.title ? 'text-white/90' : 'text-gray-400'
                  }`}>
                    {product.subtitle}
                  </p>

                  {/* Mini Stats */}
                  <div className="flex justify-between items-center text-xs">
                    <span className={`${
                      selectedProduct.title === product.title ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {Object.entries(product.stats)[0] ? `${Object.entries(product.stats)[0][0]} ${Object.entries(product.stats)[0][1]}` : ''}
                    </span>
                    <span className={`px-2 py-1 rounded-full ${
                      selectedProduct.title === product.title
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-gray-400'
                    }`}>
                      자세히 보기 →
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Product Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProduct.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-navy-50/30 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Details */}
              <div>
                <div className="flex items-start mb-6">
                  <div className="text-5xl mr-4">{selectedProduct.icon}</div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {selectedProduct.title}
                    </h3>
                    <p className="text-electric-400 text-lg">
                      {selectedProduct.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="space-y-3 mb-8">
                  <h4 className="text-white font-semibold text-lg mb-3">주요 기능</h4>
                  {selectedProduct.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <svg
                        className="w-5 h-5 text-electric-400 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-electric-400 to-electric-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-electric/50 transition-all duration-300">
                    제품 상세보기
                  </button>
                  <button className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                    데모 요청
                  </button>
                </div>
              </div>

              {/* Right: Stats & Visual */}
              <div className="flex flex-col justify-center">
                {/* Performance Stats */}
                <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <h4 className="text-white font-semibold text-lg mb-6">Performance Metrics</h4>
                  <div className="space-y-4">
                    {Object.entries(selectedProduct.stats).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400 capitalize">{key}</span>
                          <span className="text-electric-400 font-bold text-xl">{value}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${selectedProduct.color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Element */}
                <div className="mt-6 relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${selectedProduct.color} rounded-2xl blur-xl opacity-30`} />
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold text-white">500+</div>
                        <div className="text-sm text-gray-400">기업 도입</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">99.9%</div>
                        <div className="text-sm text-gray-400">가동률</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">24/7</div>
                        <div className="text-sm text-gray-400">기술지원</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductShowcase;