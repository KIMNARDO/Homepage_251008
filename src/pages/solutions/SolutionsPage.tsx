import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Package,
  FileText,
  Database,
  Cpu,
  Shield,
  Brain,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  TrendingUp,
  Globe
} from 'lucide-react';
import Container from '@/components/ui/Container';

const solutions = [
  {
    id: 'clip-plm',
    name: 'CLIP PLM',
    description: '제품 라이프사이클 관리 통합 솔루션',
    icon: Package,
    color: 'from-blue-500 to-cyan-500',
    href: '/clip-plm',
    features: ['BOM 관리', '워크플로우', '버전 관리', 'CAD 통합'],
    badge: 'Most Popular'
  },
  {
    id: 'clip-ddms',
    name: 'CLIP DDMS',
    description: 'AutoCAD 도면 및 문서 관리 시스템',
    icon: FileText,
    color: 'from-purple-500 to-pink-500',
    href: '/clip-ddms',
    features: ['도면 관리', '문서 보안', '자동 버전 관리', '협업 도구']
  },
  {
    id: 'clip-epl',
    name: 'CLIP EPL',
    description: '전자 부품 라이브러리 관리 시스템',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    href: '/clip-epl',
    features: ['부품 DB', 'BOM 연동', '재고 관리', '공급업체 관리']
  },
  {
    id: 'clip-pms',
    name: 'CLIP PMS',
    description: '프로젝트 관리 시스템',
    icon: TrendingUp,
    color: 'from-orange-500 to-red-500',
    href: '/clip-pms',
    features: ['일정 관리', '리소스 할당', '진행 추적', '리포팅']
  },
  {
    id: 'clip-icms',
    name: 'CLIP ICMS',
    description: '통합 콘텐츠 관리 시스템',
    icon: Shield,
    color: 'from-indigo-500 to-blue-500',
    href: '/clip-icms',
    features: ['콘텐츠 관리', '권한 제어', '워크플로우', '감사 추적']
  },
  {
    id: 'cadwin-ai',
    name: 'CADWin AI',
    description: 'AI 기반 CAD 자동화 솔루션',
    icon: Brain,
    color: 'from-rose-500 to-pink-500',
    href: '/cadwin-ai',
    features: ['AI 설계', '자동 최적화', '패턴 인식', '예측 분석'],
    badge: 'New'
  }
];

const benefits = [
  {
    icon: Zap,
    title: '생산성 향상',
    description: '자동화된 프로세스로 업무 효율성 극대화'
  },
  {
    icon: Users,
    title: '협업 강화',
    description: '실시간 공유와 커뮤니케이션으로 팀워크 향상'
  },
  {
    icon: Shield,
    title: '보안 강화',
    description: '엔터프라이즈급 보안으로 데이터 보호'
  },
  {
    icon: Globe,
    title: '글로벌 확장',
    description: '다국어 지원과 글로벌 표준 준수'
  }
];

const SolutionsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>솔루션 - PAPSNET PLM Solutions</title>
        <meta name="description" content="PAPSNET의 통합 PLM 솔루션으로 제품 라이프사이클을 혁신하세요." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6 border border-blue-500/30"
            >
              <span className="text-sm font-medium text-blue-400">
                Industry Leading PLM Solutions
              </span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              통합 PLM 솔루션으로
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                비즈니스 혁신
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              제품 개발부터 제조, 서비스까지 전 과정을 디지털로 연결하는
              <br />
              PAPSNET의 혁신적인 PLM 솔루션을 경험하세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                데모 신청하기
              </Link>
              <Link
                to="/trial"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                무료 체험하기
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                PAPSNET Solutions
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              각 비즈니스 영역에 최적화된 맞춤형 솔루션을 제공합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Link
                    to={solution.href}
                    className="block group relative"
                  >
                    <div className="relative p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                      {/* Badge */}
                      {solution.badge && (
                        <span className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full">
                          {solution.badge}
                        </span>
                      )}

                      {/* Icon */}
                      <div className={`w-16 h-16 mb-4 rounded-xl bg-gradient-to-br ${solution.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-full h-full text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {solution.name}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {solution.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-4">
                        {solution.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                        <span className="text-sm font-medium">자세히 보기</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              왜 PAPSNET을 선택해야 할까요?
            </h2>
            <p className="text-gray-400 text-lg">
              30년의 경험과 기술력으로 검증된 솔루션을 제공합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl backdrop-blur-sm border border-blue-500/30 text-center overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />

            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                지금 시작하세요
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                전문가 상담을 통해 귀사에 최적화된 솔루션을 찾아보세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  전문가 상담 신청
                </Link>
                <Link
                  to="/pricing"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  가격 정보 보기
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default SolutionsPage;