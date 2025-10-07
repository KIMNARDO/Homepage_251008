import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Customer data from company PDF
const CUSTOMERS = [
  {
    id: 'hyundai',
    name: '현대자동차',
    logo: '🚗',
    industry: '자동차 제조',
    solution: 'CLIP PLM, ICMS',
    testimonial: '팹스넷의 PLM 솔루션으로 제품 개발 주기를 40% 단축했습니다.',
    results: {
      efficiency: '+45%',
      cost: '-30%',
      time: '-40%'
    }
  },
  {
    id: 'kia',
    name: 'KIA',
    logo: '🚙',
    industry: '자동차 제조',
    solution: 'CLIP PLM, DDMS',
    testimonial: '협력사 도면 관리가 획기적으로 개선되었습니다.',
    results: {
      collaboration: '+80%',
      errors: '-60%',
      speed: '+3x'
    }
  },
  {
    id: 'dsc',
    name: 'DSC',
    logo: '⚙️',
    industry: '자동차 부품 1차',
    solution: 'CLIP PLM, ICMS',
    testimonial: '원가 관리 시스템으로 수익성이 크게 개선되었습니다.',
    results: {
      profitability: '+25%',
      accuracy: '99.9%',
      automation: '85%'
    }
  },
  {
    id: 'woory',
    name: '우리산업',
    logo: '🏭',
    industry: '자동차 부품 1차',
    solution: 'CLIP PLM 3.0',
    testimonial: '통합 PLM 시스템으로 생산성이 향상되었습니다.',
    results: {
      productivity: '+50%',
      quality: '+35%',
      delivery: '100%'
    }
  },
  {
    id: 'at-smart',
    name: 'AT SMART',
    logo: '🔧',
    industry: '자동차 부품',
    solution: 'CLIP PMS',
    testimonial: '프로젝트 관리 효율성이 크게 향상되었습니다.',
    results: {
      projects: '+60%',
      ontime: '95%',
      satisfaction: '98%'
    }
  },
  {
    id: 'hironic',
    name: '하이로닉',
    logo: '🏥',
    industry: '의료장비',
    solution: 'CLIP PLM 2.0',
    testimonial: '의료기기 품질 관리가 체계화되었습니다.',
    results: {
      compliance: '100%',
      traceability: '100%',
      efficiency: '+40%'
    }
  },
  {
    id: 'neobio',
    name: '네오바이오텍',
    logo: '🦷',
    industry: '의료기기',
    solution: 'CLIP PDM',
    testimonial: '도면 관리 시스템으로 개발 속도가 향상되었습니다.',
    results: {
      development: '-35%',
      accuracy: '99%',
      collaboration: '+70%'
    }
  },
  {
    id: 'ams',
    name: 'AMS',
    logo: '🔩',
    industry: '자동차 부품 2차',
    solution: 'CLIP EPL 2.0',
    testimonial: 'Multi-BOM 관리로 복잡성이 해결되었습니다.',
    results: {
      complexity: '-50%',
      errors: '-75%',
      speed: '+4x'
    }
  }
];

// Industry statistics
const STATS = [
  {
    value: '500+',
    label: '고객사',
    description: '국내 주요 기업들이 신뢰'
  },
  {
    value: '99.9%',
    label: '가동률',
    description: '안정적인 서비스 제공'
  },
  {
    value: '45%',
    label: '효율 향상',
    description: '평균 업무 효율성 증대'
  },
  {
    value: '24/7',
    label: '기술 지원',
    description: '연중무휴 고객 지원'
  }
];

const CustomerSuccess: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(CUSTOMERS[0]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-navy to-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-emerald/10 text-emerald-400 rounded-full text-sm font-medium mb-4">
            Customer Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-gradient bg-gradient-to-r from-emerald-400 to-electric-400 bg-clip-text text-transparent">
              500개 이상
            </span>
            의 기업이 선택한 솔루션
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            현대자동차, KIA 등 국내 주요 기업들이 PAPSNET 솔루션으로
            디지털 전환을 성공적으로 이끌어가고 있습니다
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-electric/50 transition-all duration-300">
                <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-electric-400 to-emerald-400 bg-clip-text mb-2">
                  {stat.value}
                </div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Customer Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-center text-lg font-medium text-gray-400 mb-8">
            주요 고객사
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {CUSTOMERS.map((customer) => (
              <motion.button
                key={customer.id}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCustomer(customer)}
                className={`
                  relative p-4 rounded-xl border transition-all duration-300
                  ${selectedCustomer.id === customer.id
                    ? 'bg-gradient-to-br from-electric-400/20 to-emerald-400/20 border-electric/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }
                `}
              >
                <div className="text-3xl mb-2">{customer.logo}</div>
                <div className="text-xs text-white font-medium truncate">
                  {customer.name}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Selected Customer Case Study */}
        <motion.div
          key={selectedCustomer.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-navy-50/30 to-navy-100/30 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Customer Info */}
            <div>
              <div className="flex items-start mb-6">
                <div className="text-5xl mr-4 p-3 bg-gradient-to-br from-electric-400/20 to-emerald-400/20 rounded-2xl">
                  {selectedCustomer.logo}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {selectedCustomer.name}
                  </h3>
                  <p className="text-gray-400">{selectedCustomer.industry}</p>
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 bg-electric/20 text-electric-400 rounded-full text-sm">
                      {selectedCustomer.solution}
                    </span>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <blockquote className="relative mb-8">
                <svg
                  className="absolute -top-2 -left-2 w-8 h-8 text-electric/20"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-lg text-gray-300 italic pl-6">
                  {selectedCustomer.testimonial}
                </p>
              </blockquote>

              {/* Results */}
              <div>
                <h4 className="text-white font-semibold mb-4">도입 성과</h4>
                <div className="space-y-3">
                  {Object.entries(selectedCustomer.results).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-400 capitalize">{key}</span>
                      <span className="text-xl font-bold text-emerald-400">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Visual & CTA */}
            <div className="flex flex-col justify-center">
              {/* Success Metrics Visual */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 backdrop-blur-sm mb-6">
                <h4 className="text-white font-semibold text-lg mb-6">Success Metrics</h4>
                <div className="space-y-4">
                  {Object.entries(selectedCustomer.results).map(([key, value], index) => (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 capitalize">{key}</span>
                        <span className="text-emerald-400 font-bold">{value}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-400 to-electric-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(index + 1) * 25}%` }}
                          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-emerald-400/10 to-electric-400/10 rounded-2xl p-6 border border-white/10">
                <h4 className="text-white font-semibold mb-3">
                  귀사도 성공 사례의 주인공이 되세요
                </h4>
                <p className="text-gray-400 text-sm mb-4">
                  PAPSNET 솔루션으로 디지털 전환을 시작하세요
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-400 to-electric-400 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-emerald/50 transition-all duration-300">
                    사례 상세보기
                  </button>
                  <button className="flex-1 px-4 py-2 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                    문의하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-6">
            더 많은 성공 사례를 확인하고 싶으신가요?
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-electric-400 to-emerald-400 text-white font-medium rounded-lg hover:shadow-xl hover:shadow-electric/50 transition-all duration-300 text-lg">
            전체 고객사 보기 →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerSuccess;