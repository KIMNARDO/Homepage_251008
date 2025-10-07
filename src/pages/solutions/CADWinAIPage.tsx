import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const CADWinAIPage: React.FC = () => {
  const breadcrumbs = [
    { label: '솔루션', href: '/solutions' },
    { label: 'CADWin AI' }
  ];

  const features = [
    {
      title: 'AI 도면 자동 분석',
      description: 'AutoCAD 도면을 AI가 자동으로 분석하여 패턴과 구조를 파악합니다.',
      icon: '🤖'
    },
    {
      title: '유사 도면 검색',
      description: '기존 도면 라이브러리에서 유사한 설계를 빠르게 찾아줍니다.',
      icon: '🔍'
    },
    {
      title: 'AutoCAD 완벽 통합',
      description: 'AutoCAD와 완벽하게 통합되어 기존 워크플로우를 유지합니다.',
      icon: '🎨'
    },
    {
      title: '설계 효율성 극대화',
      description: '반복 작업을 줄이고 설계 품질을 향상시킵니다.',
      icon: '⚡'
    },
    {
      title: '도면 패턴 인식',
      description: '복잡한 도면에서도 패턴을 정확하게 인식합니다.',
      icon: '🧠'
    },
    {
      title: '자동 분류 시스템',
      description: '도면을 자동으로 분류하고 태그를 생성합니다.',
      icon: '📁'
    }
  ];

  const aiFeatures = [
    {
      title: '딥러닝 기반 분석',
      description: '최신 딥러닝 기술로 도면의 복잡한 패턴도 정확하게 분석',
      percentage: '95%',
      metric: '분석 정확도'
    },
    {
      title: '실시간 처리',
      description: '대용량 도면도 실시간으로 빠르게 처리',
      percentage: '80%',
      metric: '처리 속도 향상'
    },
    {
      title: '지속적 학습',
      description: '사용할수록 더 정확해지는 AI 시스템',
      percentage: '99%',
      metric: '학습 성능'
    }
  ];

  return (
    <>
      <Helmet>
        <title>CADWin AI - AI 기반 CAD 자동화 솔루션 | PAPSNET</title>
        <meta name="description" content="CADWin AI로 AutoCAD 작업을 자동화하세요. AI 기반 도면 분석, 유사 도면 검색, 패턴 인식으로 설계 효율성을 극대화하는 혁신적인 솔루션입니다." />
        <meta name="keywords" content="CADWin AI, AI CAD, 도면분석, AutoCAD AI, 설계자동화, 패턴인식, 유사도면검색" />
      </Helmet>

      <PageHeader
        title="CADWin AI"
        subtitle="AI 기술로 CAD 설계의 새로운 차원을 경험하세요"
        badge="New AI Technology"
        breadcrumbs={breadcrumbs}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" href="/demo">
            AI 데모 체험하기
          </Button>
          <Button variant="secondary" href="/trial">
            무료 체험하기
          </Button>
        </div>
      </PageHeader>

      {/* AI Showcase Section */}
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
                AI가 변화시키는 CAD 설계
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                CADWin AI는 인공지능 기술을 활용하여 AutoCAD 설계 과정을 혁신합니다.
                도면 분석부터 유사 설계 검색까지, AI가 설계자의 창의성을 극대화합니다.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
                  <span className="text-gray-300">머신러닝 기반 도면 분석</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
                  <span className="text-gray-300">실시간 유사 도면 검색</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
                  <span className="text-gray-300">자동 설계 최적화 제안</span>
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
              <div className="bg-gradient-to-br from-rose-600/20 to-pink-600/20 rounded-2xl p-8 border border-rose-500/30">
                <img
                  src="/images/cadwin-ai-overview.jpg"
                  alt="CADWin AI 인터페이스"
                  className="w-full rounded-lg"
                />
                <div className="absolute top-4 right-4 bg-rose-500/20 backdrop-blur-sm text-rose-300 text-xs font-semibold px-3 py-1 rounded-full">
                  AI Powered
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* AI Performance Section */}
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
              AI 성능 지표
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              검증된 AI 기술로 설계 효율성을 극대화합니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-gradient-to-b from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-8"
              >
                <div className="text-4xl font-bold text-rose-400 mb-2">
                  {feature.percentage}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.metric}</h3>
                <h4 className="text-lg font-semibold text-gray-200 mb-3">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Section */}
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
              혁신적인 AI 기능
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              설계 과정의 모든 단계에서 AI의 도움을 받으세요.
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
                className="bg-gradient-to-b from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-rose-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Integration Section */}
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
              AutoCAD와의 완벽한 통합
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: '플러그인 방식',
                description: 'AutoCAD에 직접 통합되어 별도 프로그램 불필요',
                icon: '🔌'
              },
              {
                title: '기존 워크플로우 유지',
                description: '현재 작업 방식을 그대로 유지하면서 AI 기능 추가',
                icon: '🔄'
              }
            ].map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-gradient-to-b from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-8"
              >
                <div className="text-4xl mb-4">{integration.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{integration.title}</h3>
                <p className="text-gray-300">{integration.description}</p>
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
            className="text-center bg-gradient-to-r from-rose-600 to-pink-600 rounded-3xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              CADWin AI로 설계의 미래를 경험하세요
            </h2>
            <p className="text-xl text-rose-100 mb-8">
              AI 기술로 설계 효율성을 획기적으로 향상시켜보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" href="/demo" className="bg-white text-rose-600 hover:bg-gray-100">
                AI 데모 체험하기
              </Button>
              <Button variant="ghost" href="/contact" className="text-white border-white hover:bg-white/10">
                전문가 상담 신청
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default CADWinAIPage;