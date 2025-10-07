import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import { visualAssets } from '@/assets/visual-assets-config';

interface Testimonial {
  id: string;
  company: string;
  industry: string;
  author: string;
  role: string;
  content: string;
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  logo?: string;
  gradient: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    company: 'DSC',
    industry: '자동차 부품 1차 벤더',
    author: '김현수',
    role: '생산관리팀 팀장',
    content: 'PAPSNET의 CLIP PLM 도입 후 제품 개발 주기가 획기적으로 단축되었습니다. 특히 설계변경 관리와 BOM 관리가 체계화되어 오류가 현저히 감소했습니다.',
    results: [
      { metric: '개발 기간', value: '40%', improvement: '단축' },
      { metric: '설계 오류', value: '65%', improvement: '감소' },
      { metric: '협업 효율', value: '3배', improvement: '향상' },
    ],
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    id: '2',
    company: '우리산업',
    industry: '자동차 부품 제조',
    author: '이정민',
    role: '연구개발본부 본부장',
    content: 'CADWin AI의 도입으로 도면 검색 시간이 획기적으로 단축되었고, 3D-2D 도면 연동으로 설계 정확도가 크게 향상되었습니다.',
    results: [
      { metric: '도면 검색', value: '80%', improvement: '시간 절감' },
      { metric: '설계 정확도', value: '95%', improvement: '달성' },
      { metric: 'ROI', value: '250%', improvement: '달성' },
    ],
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    id: '3',
    company: 'HIRONIC',
    industry: '의료장비 제조',
    author: '박소영',
    role: 'IT혁신팀 팀장',
    content: 'DDMS를 통해 협력사와의 도면 공유가 안전하고 효율적으로 이루어지고 있습니다. 보안 걱정 없이 실시간 협업이 가능해졌습니다.',
    results: [
      { metric: '보안 사고', value: '0건', improvement: '유지' },
      { metric: '협업 속도', value: '5배', improvement: '향상' },
      { metric: '관리 비용', value: '30%', improvement: '절감' },
    ],
    gradient: 'from-green-600 to-teal-600',
  },
  {
    id: '4',
    company: 'AMS',
    industry: '자동차 부품 2차 벤더',
    author: '최진호',
    role: '품질관리부 부장',
    content: 'EPL Multi-BOM 시스템으로 복잡한 제품 구성 관리가 단순해졌고, 사양별 BOM 관리로 고객 맞춤 대응이 빨라졌습니다.',
    results: [
      { metric: '주문 처리', value: '50%', improvement: '시간 단축' },
      { metric: '재고 정확도', value: '99%', improvement: '달성' },
      { metric: '고객 만족도', value: '35%', improvement: '상승' },
    ],
    gradient: 'from-amber-600 to-orange-600',
  },
];

const ClientSuccessSection: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
            Customer Success Stories
          </span>
          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            고객의 성공이 우리의 성공입니다
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            PAPSNET 솔루션으로 디지털 혁신을 이룬 기업들의 이야기
          </p>
        </motion.div>

        {/* Success metrics overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: '평균 ROI', value: '280%', icon: '📈' },
            { label: '생산성 향상', value: '45%', icon: '⚡' },
            { label: '비용 절감', value: '35%', icon: '💰' },
            { label: '품질 개선', value: '60%', icon: '✨' },
          ].map((metric, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`${visualAssets.effects.glassCard} rounded-xl p-6 text-center`}
            >
              <div className="text-3xl mb-3">{metric.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className={`${visualAssets.effects.glassCard} rounded-2xl p-8 md:p-12`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Testimonial content */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                      style={{
                        background: `linear-gradient(135deg, ${testimonials[activeTestimonial].gradient})`,
                      }}
                    >
                      {testimonials[activeTestimonial].company[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {testimonials[activeTestimonial].company}
                      </h3>
                      <p className="text-gray-400">{testimonials[activeTestimonial].industry}</p>
                    </div>
                  </div>

                  <blockquote className="mb-6">
                    <svg
                      className="w-8 h-8 text-gray-600 mb-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-lg text-gray-300 leading-relaxed italic">
                      "{testimonials[activeTestimonial].content}"
                    </p>
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-700" />
                    <div>
                      <p className="font-medium text-white">
                        {testimonials[activeTestimonial].author}
                      </p>
                      <p className="text-sm text-gray-400">
                        {testimonials[activeTestimonial].role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Results metrics */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                    도입 성과
                  </h4>
                  {testimonials[activeTestimonial].results.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">{result.metric}</span>
                        <span
                          className="text-2xl font-bold"
                          style={{
                            background: `linear-gradient(135deg, ${testimonials[activeTestimonial].gradient})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {result.value}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">{result.improvement}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${
                    index === activeTestimonial
                      ? 'w-8 bg-blue-500'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Client logos grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            150+ 기업이 PAPSNET과 함께합니다
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {visualAssets.clients.logos.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className={`${visualAssets.effects.glassCard} rounded-xl p-4 flex items-center justify-center h-20`}
              >
                <span className="text-gray-400 font-medium text-sm text-center">
                  {client.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className={`${visualAssets.effects.glassCard} rounded-2xl p-12 max-w-4xl mx-auto`}>
            <h3 className="text-3xl font-bold text-white mb-4">
              귀사도 디지털 혁신의 주인공이 되세요
            </h3>
            <p className="text-xl text-gray-400 mb-8">
              PAPSNET의 전문가들이 귀사의 성공적인 디지털 전환을 도와드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-4 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${visualAssets.brand.colors.primary}, ${visualAssets.brand.colors.secondary})`,
                }}
              >
                성공 사례 자세히 보기
              </button>
              <button className={`px-8 py-4 rounded-lg font-medium text-white ${visualAssets.effects.glassButton}`}>
                컨설팅 문의하기
              </button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ClientSuccessSection;