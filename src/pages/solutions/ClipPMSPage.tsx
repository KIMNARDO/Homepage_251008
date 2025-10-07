import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const ClipPMSPage: React.FC = () => {
  const breadcrumbs = [
    { label: '솔루션', href: '/solutions' },
    { label: 'CLIP PMS' }
  ];

  const features = [
    {
      title: '일정 관리',
      description: '프로젝트 일정을 시각적으로 관리하고 마일스톤을 추적합니다.',
      icon: '📅'
    },
    {
      title: '리소스 할당',
      description: '인력과 자원을 효율적으로 배분하고 관리합니다.',
      icon: '👥'
    },
    {
      title: '진행 추적',
      description: '실시간으로 프로젝트 진행 상황을 모니터링합니다.',
      icon: '📊'
    },
    {
      title: '리포팅',
      description: '다양한 관점의 프로젝트 리포트를 자동 생성합니다.',
      icon: '📈'
    },
    {
      title: '위험 관리',
      description: '프로젝트 리스크를 사전에 식별하고 대응합니다.',
      icon: '⚠️'
    },
    {
      title: '협업 도구',
      description: '팀원 간 원활한 소통과 협업을 지원합니다.',
      icon: '💬'
    }
  ];

  return (
    <>
      <Helmet>
        <title>CLIP PMS - 프로젝트 관리 시스템 | PAPSNET</title>
        <meta name="description" content="CLIP PMS로 프로젝트를 체계적으로 관리하세요. 일정, 리소스, 진행상황을 통합 관리하는 전문 프로젝트 관리 솔루션입니다." />
        <meta name="keywords" content="PMS, 프로젝트관리, 일정관리, 리소스관리, 진행추적, 협업도구" />
      </Helmet>

      <PageHeader
        title="CLIP PMS"
        subtitle="프로젝트 성공을 위한 체계적인 관리 솔루션"
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
                프로젝트 성공률을 높이는 체계적 관리
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                CLIP PMS는 프로젝트의 계획부터 완료까지 전 과정을 체계적으로 관리하는 솔루션입니다.
                일정, 리소스, 품질, 리스크를 통합 관리하여 프로젝트 성공률을 극대화합니다.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  <span className="text-gray-300">Gantt 차트 기반 일정 관리</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  <span className="text-gray-300">실시간 진행상황 모니터링</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  <span className="text-gray-300">자동화된 리포팅 시스템</span>
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
              <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-2xl p-8 border border-orange-500/30">
                <img
                  src="/images/clip-pms-overview.jpg"
                  alt="CLIP PMS 프로젝트 관리"
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
              프로젝트 관리의 모든 영역을 커버하는 통합 솔루션입니다.
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
                className="bg-gradient-to-b from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300"
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
              프로젝트 관리의 새로운 기준
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '프로젝트 성공률 향상',
                description: '체계적인 관리로 프로젝트 완성도 극대화',
                icon: '🎯'
              },
              {
                title: '일정 준수율 개선',
                description: '정확한 일정 계획과 추적으로 지연 최소화',
                icon: '⏰'
              },
              {
                title: '팀 생산성 증대',
                description: '명확한 역할 분담과 효율적인 협업 환경',
                icon: '🚀'
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
            className="text-center bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              CLIP PMS로 프로젝트 관리를 혁신하세요
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              체계적인 프로젝트 관리로 성공률을 높여보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" href="/contact" className="bg-white text-orange-600 hover:bg-gray-100">
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

export default ClipPMSPage;