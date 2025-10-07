import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import { visualAssets } from '@/assets/visual-assets-config';

interface Product {
  id: string;
  name: string;
  fullName: string;
  description: string;
  features: string[];
  color: string;
  gradient: string;
  icon: string;
  techStack: string[];
}

const products: Product[] = [
  {
    id: 'clipPLM',
    name: 'CLIP PLM',
    fullName: 'Product Lifecycle Management',
    description: '제품 기획부터 폐기까지 전체 라이프사이클을 관리하는 통합 솔루션',
    features: [
      '프로젝트 관리 (PMS)',
      '도면 관리 (PDM)',
      'BOM 관리',
      '설계변경 관리 (ECO/ECR/ECN)',
      '일정 및 이슈 관리',
    ],
    color: visualAssets.brand.colors.primary,
    gradient: `linear-gradient(135deg, ${visualAssets.brand.colors.primary}, #60A5FA)`,
    icon: '🎯',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'ddms',
    name: 'DDMS',
    fullName: '협력사 도면 배포 시스템',
    description: '보안이 강화된 도면 배포 및 협업 솔루션',
    features: [
      '도면 배포 관리',
      '워터마크 자동 삽입',
      '배포 이력 추적',
      '협력업체 관리',
      '결재 시스템 연동',
    ],
    color: visualAssets.brand.colors.secondary,
    gradient: `linear-gradient(135deg, ${visualAssets.brand.colors.secondary}, #A78BFA)`,
    icon: '📊',
    techStack: ['Vue.js', 'Spring Boot', 'MySQL', 'Redis'],
  },
  {
    id: 'epl',
    name: 'EPL',
    fullName: 'Multi-BOM 관리 솔루션',
    description: '기구와 전자 BOM을 통합 관리하는 혁신적인 솔루션',
    features: [
      'Multi-BOM 생성/조회',
      '사양별 BOM 관리',
      '리비전 관리',
      'BOM 설계변경',
      'ERP 연동',
    ],
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #34D399)',
    icon: '🔄',
    techStack: ['Angular', '.NET Core', 'SQL Server', 'RabbitMQ'],
  },
  {
    id: 'icms',
    name: 'ICMS',
    fullName: '통합 원가 관리 시스템',
    description: '사전/사후 원가를 체계적으로 관리하는 시스템',
    features: [
      '사전 원가 분석',
      '사후 원가 관리',
      '원소재 가격 변동 대응',
      '수율 시뮬레이션',
      '원가 예측 AI',
    ],
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
    icon: '💰',
    techStack: ['React', 'Python', 'TensorFlow', 'MongoDB'],
  },
  {
    id: 'cadwinAI',
    name: 'CADWin AI',
    fullName: 'AI 도면 관리 시스템',
    description: '3D/2D 도면과 시방서를 AI로 통합 관리하는 차세대 시스템',
    features: [
      '3D→2D 자동 변환',
      'AI 도면 분석',
      '시방서 OCR',
      'AutoCAD/SolidWorks 통합',
      '유사 도면 검색',
    ],
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
    icon: '🤖',
    techStack: ['PyTorch', 'FastAPI', 'ElasticSearch', 'Kubernetes'],
  },
];

const ProductShowcaseWithAssets: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: visualAssets.brand.colors.dark }}>
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: selectedProduct.gradient,
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: selectedProduct.gradient,
            filter: 'blur(100px)',
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Our Solutions</span>
          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            PAPSNET Product Suite
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            스마트 팩토리 구현을 위한 완벽한 솔루션 포트폴리오
          </p>
        </motion.div>

        {/* Product selector tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {products.map((product, index) => (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProduct(product)}
              className={`
                relative px-6 py-3 rounded-xl font-medium transition-all duration-300
                ${
                  selectedProduct.id === product.id
                    ? 'text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }
              `}
              style={{
                background:
                  selectedProduct.id === product.id
                    ? product.gradient
                    : 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">{product.icon}</span>
                <span>{product.name}</span>
              </span>
              {selectedProduct.id === product.id && (
                <motion.div
                  layoutId="productSelector"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: product.gradient,
                    zIndex: -1,
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Product detail display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProduct.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Product visualization */}
            <div className="relative">
              <motion.div
                className="relative rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Product screenshot placeholder */}
                <div
                  className={`aspect-video rounded-2xl ${visualAssets.effects.glassCard} p-8`}
                  style={{
                    background: `linear-gradient(135deg, ${selectedProduct.color}10, ${selectedProduct.color}05)`,
                  }}
                >
                  {/* Animated product interface mockup */}
                  <div className="h-full flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <div className="flex-1 text-center text-sm text-gray-500">
                        {selectedProduct.fullName}
                      </div>
                    </div>

                    {/* Animated dashboard elements */}
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white/5 rounded-lg p-3"
                          style={{
                            background: `linear-gradient(135deg, ${selectedProduct.color}20, transparent)`,
                          }}
                        >
                          <div className="h-2 bg-white/20 rounded mb-2" />
                          <div className="h-2 bg-white/10 rounded w-3/4" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating feature badges */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Best Seller
                </motion.div>
              </motion.div>
            </div>

            {/* Product information */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3
                  className="text-3xl font-bold mb-2"
                  style={{
                    background: selectedProduct.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {selectedProduct.name}
                </h3>
                <p className="text-xl text-gray-300 mb-6">{selectedProduct.fullName}</p>
                <p className="text-gray-400 mb-8 leading-relaxed">{selectedProduct.description}</p>

                {/* Features list with hover effects */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    주요 기능
                  </h4>
                  {selectedProduct.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onMouseEnter={() => setHoveredFeature(index)}
                      onMouseLeave={() => setHoveredFeature(null)}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                        ${hoveredFeature === index ? 'bg-white/10' : 'bg-white/5'}
                      `}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: selectedProduct.gradient,
                        }}
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-white flex-1">{feature}</span>
                      {hoveredFeature === index && (
                        <motion.svg
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </motion.svg>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    기술 스택
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${visualAssets.effects.glassCard} text-gray-300`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex gap-4">
                  <button
                    className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: selectedProduct.gradient,
                    }}
                  >
                    자세히 보기
                  </button>
                  <button className={`px-6 py-3 rounded-lg font-medium text-white ${visualAssets.effects.glassButton}`}>
                    데모 요청
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Integration diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <div className={`rounded-2xl p-8 ${visualAssets.effects.glassCard}`}>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              완벽한 통합 에코시스템
            </h3>
            <div className="relative">
              {/* Central hub */}
              <div className="flex justify-center">
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{
                    background: `linear-gradient(135deg, ${visualAssets.brand.colors.primary}, ${visualAssets.brand.colors.secondary})`,
                  }}
                >
                  PAPSNET
                </div>
              </div>

              {/* Connected products */}
              <div className="absolute inset-0 flex items-center justify-center">
                {products.map((product, index) => {
                  const angle = (index / products.length) * Math.PI * 2 - Math.PI / 2;
                  const radius = 200;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <motion.div
                      key={product.id}
                      className="absolute"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div
                        className="w-20 h-20 rounded-full flex flex-col items-center justify-center text-white"
                        style={{
                          background: product.gradient,
                        }}
                      >
                        <span className="text-2xl mb-1">{product.icon}</span>
                        <span className="text-xs font-medium">{product.name}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ProductShowcaseWithAssets;