import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const ClipICMSPage: React.FC = () => {
  const breadcrumbs = [
    { label: '솔루션', href: '/solutions' },
    { label: 'CLIP ICMS' }
  ];

  const features = [
    {
      title: '사전/사후 원가 관리',
      description: '제품 개발 단계별 원가를 체계적으로 관리합니다.',
      icon: '💰'
    },
    {
      title: '원자재 가격 실시간 연동',
      description: '시장 가격 변동을 실시간으로 반영하여 정확한 원가를 산정합니다.',
      icon: '📈'
    },
    {
      title: '수율 시뮬레이션',
      description: '다양한 시나리오를 통해 수율을 예측하고 최적화합니다.',
      icon: '🔄'
    },
    {
      title: '전자 합의 프로세스',
      description: '원가 결정 과정을 디지털화하여 투명성을 확보합니다.',
      icon: '✅'
    },
    {
      title: '원가 분석 리포트',
      description: '다차원 원가 분석으로 의사결정을 지원합니다.',
      icon: '📊'
    },
    {
      title: '다국어/해외법인 지원',
      description: '글로벌 운영을 위한 다국어 및 다통화 지원합니다.',
      icon: '🌍'
    }
  ];

  return (
    <>
      <Helmet>
        <title>CLIP ICMS - 통합 원가 관리 시스템 | PAPSNET</title>
        <meta name="description" content="CLIP ICMS로 원가를 정확하게 관리하세요. 사전/사후 원가 관리, 원자재 가격 연동, 수율 시뮬레이션을 제공하는 통합 원가 관리 솔루션입니다." />
        <meta name="keywords" content="ICMS, 원가관리, 원자재가격, 수율시뮬레이션, 원가분석, 글로벌원가관리" />
      </Helmet>

      <PageHeader
        title="CLIP ICMS"
        subtitle="정확한 원가 관리로 수익성을 극대화하세요"
        breadcrumbs={breadcrumbs}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" href="/demo">
            데모 신청하기
          </Button>
          <Button variant="secondary" href="/trial">
            무료 체험하기
          </Button>
        </div>
      </PageHeader>

      {/* Overview Section */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                정확한 원가 관리의 시작
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                CLIP ICMS는 제품 개발부터 생산까지 전 과정의 원가를 통합 관리하는 솔루션입니다.
                실시간 원자재 가격 연동과 수율 시뮬레이션으로 정확한 원가 산정을 지원합니다.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                  <span className="text-gray-300">실시간 원자재 가격 연동</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                  <span className="text-gray-300">다차원 원가 분석</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                  <span className="text-gray-300">글로벌 원가 관리</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 rounded-2xl p-8 border border-indigo-500/30">
                <img
                  src="/images/clip-icms-overview.jpg"
                  alt="CLIP ICMS 원가 관리"
                  className="w-full rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              핵심 기능
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              원가 관리의 모든 측면을 지원하는 통합 솔루션입니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              원가 관리의 혁신
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '원가 정확도 향상',
                description: '실시간 데이터 기반 정확한 원가 산정',
                icon: '🎯'
              },
              {
                title: '수익성 개선',
                description: '최적화된 원가 구조로 수익성 극대화',
                icon: '📈'
              },
              {
                title: '의사결정 지원',
                description: '다차원 분석으로 전략적 의사결정 지원',
                icon: '🧠'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-gradient-to-b from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-8"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              CLIP ICMS로 원가 관리를 혁신하세요
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              정확한 원가 관리로 경쟁력을 확보해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" href="/contact" className="bg-white text-indigo-600 hover:bg-gray-100">
                전문가 상담 신청
              </Button>
              <Button variant="ghost" href="/demo" className="text-white border-white hover:bg-white/10">
                제품 데모 보기
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default ClipICMSPage;