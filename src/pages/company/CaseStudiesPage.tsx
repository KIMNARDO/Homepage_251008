import React from 'react';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Users, Award } from 'lucide-react';

const CaseStudiesPage: React.FC = () => {
  const caseStudies = [
    {
      id: 1,
      company: '현대자동차',
      industry: '자동차 제조',
      title: 'PLM 시스템 도입으로 개발 기간 30% 단축',
      description: 'CLIP PLM을 도입하여 제품 개발 프로세스를 혁신하고 협업 효율성을 크게 향상시켰습니다.',
      results: ['개발 기간 30% 단축', '협업 효율 50% 증가', '도면 관리 오류 95% 감소'],
      icon: Building2,
    },
    {
      id: 2,
      company: '삼성전자',
      industry: '전자 제조',
      title: '설계 변경 관리 자동화로 품질 혁신',
      description: 'ECO 관리 시스템을 통해 설계 변경 프로세스를 자동화하고 품질을 대폭 개선했습니다.',
      results: ['설계 변경 시간 40% 감소', '품질 오류 80% 감소', 'ROI 200% 달성'],
      icon: TrendingUp,
    },
    {
      id: 3,
      company: 'LG전자',
      industry: '가전 제조',
      title: '협력사 도면 배포 시스템으로 협업 강화',
      description: 'DDMS를 통해 200개 이상의 협력사와 실시간으로 도면을 공유하고 관리합니다.',
      results: ['협력사 만족도 95%', '도면 배포 시간 90% 단축', '보안 사고 0건'],
      icon: Users,
    },
    {
      id: 4,
      company: '두산중공업',
      industry: '중공업',
      title: 'BOM 관리 시스템으로 생산성 극대화',
      description: 'E-BOM과 M-BOM을 통합 관리하여 생산 효율성과 정확도를 크게 향상시켰습니다.',
      results: ['생산 효율 35% 증가', 'BOM 오류 98% 감소', '재고 비용 25% 절감'],
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-navy">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-400/10 via-transparent to-purple-500/10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              고객 성공 사례
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              대한민국 대표 기업들이 PAPSNET 솔루션으로 달성한 혁신적인 성과를 확인하세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-electric-400/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-electric-400/10 rounded-xl group-hover:bg-electric-400/20 transition-colors">
                      <Icon className="w-6 h-6 text-electric-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{study.company}</h3>
                      <p className="text-white/60 text-sm">{study.industry}</p>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-white mb-4">
                    {study.title}
                  </h4>

                  <p className="text-white/70 mb-6 leading-relaxed">
                    {study.description}
                  </p>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-electric-400 mb-3">주요 성과</p>
                    {study.results.map((result, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        <span className="text-white/80 text-sm">{result}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-electric-500 to-purple-600 rounded-3xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              귀사의 성공 사례를 만들어보세요
            </h2>
            <p className="text-white/90 text-lg mb-8">
              PAPSNET 전문가와 상담하고 맞춤형 솔루션을 경험해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-electric-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                무료 상담 신청
              </button>
              <button className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
                제품 데모 보기
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;