import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Users, GitBranch, Shield, Zap } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/card';

const PlmWorkflowPage: React.FC = () => {
  const workflowSteps = [
    {
      id: 1,
      title: '기획 단계',
      description: '제품 요구사항 분석 및 개발 계획 수립',
      icon: <Clock className="w-6 h-6" />,
      features: [
        '요구사항 문서화',
        '프로젝트 일정 관리',
        '리소스 할당',
        '리스크 평가'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: '설계 단계',
      description: 'CAD 모델링 및 설계 검토',
      icon: <GitBranch className="w-6 h-6" />,
      features: [
        '3D CAD 모델링',
        '도면 생성 및 관리',
        '설계 변경 추적',
        'BOM 구성'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 3,
      title: '개발 단계',
      description: '프로토타입 제작 및 테스트',
      icon: <Zap className="w-6 h-6" />,
      features: [
        '프로토타입 제작',
        '성능 테스트',
        '품질 검증',
        '문서화'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      title: '생산 단계',
      description: '대량 생산 및 품질 관리',
      icon: <Shield className="w-6 h-6" />,
      features: [
        '생산 계획 수립',
        '품질 관리',
        '공급망 관리',
        '원가 관리'
      ],
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 5,
      title: '서비스 단계',
      description: '유지보수 및 고객 지원',
      icon: <Users className="w-6 h-6" />,
      features: [
        '고객 피드백 수집',
        '유지보수 계획',
        '부품 관리',
        '서비스 이력 추적'
      ],
      color: 'from-red-500 to-red-600'
    }
  ];

  const benefits = [
    {
      title: '개발 기간 단축',
      value: '45%',
      description: '자동화된 워크플로우로 개발 시간 대폭 감소'
    },
    {
      title: '오류 감소',
      value: '60%',
      description: '체계적인 프로세스 관리로 오류 최소화'
    },
    {
      title: '협업 효율',
      value: '80%',
      description: '실시간 협업으로 커뮤니케이션 개선'
    },
    {
      title: 'ROI 증가',
      value: '250%',
      description: '투자 대비 수익률 극대화'
    }
  ];

  return (
    <>
      <Helmet>
        <title>PLM 워크플로우 | PAPSNET - 제품 수명주기 관리 프로세스</title>
        <meta
          name="description"
          content="PAPSNET PLM 워크플로우로 제품 기획부터 폐기까지 전체 수명주기를 효율적으로 관리하세요. 자동화된 프로세스와 실시간 협업 도구를 제공합니다."
        />
        <meta
          name="keywords"
          content="PLM 워크플로우, 제품 수명주기, 프로세스 관리, 설계 변경, BOM 관리, 협업 도구"
        />
      </Helmet>

      <PageHeader
        title="PLM 워크플로우"
        subtitle="제품의 전체 수명주기를 체계적으로 관리하는 통합 프로세스"
        breadcrumbs={[
          { label: '홈', href: '/' },
          { label: '솔루션', href: '/solutions' },
          { label: 'PLM 워크플로우' }
        ]}
      />

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              제품 개발의 모든 단계를 하나로
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              CLIP PLM 워크플로우는 제품 기획부터 폐기까지 전체 수명주기를 통합 관리하여
              개발 효율성을 극대화하고 Time-to-Market을 단축시킵니다.
            </p>
          </motion.div>

          {/* Workflow Steps */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${step.color} text-white mb-4`}>
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {index < workflowSteps.length - 1 && (
                      <div className="hidden lg:flex absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                        <ArrowRight className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              PLM 워크플로우 도입 효과
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {benefit.value}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-50 rounded-2xl p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  기존 시스템과의 완벽한 통합
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  CLIP PLM은 귀사의 기존 ERP, MES, CAD 시스템과 원활하게 통합되어
                  데이터 일관성을 보장하고 업무 효율성을 극대화합니다.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900">ERP 연동</strong>
                      <p className="text-gray-600">SAP, Oracle 등 주요 ERP와 실시간 데이터 동기화</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900">CAD 통합</strong>
                      <p className="text-gray-600">AutoCAD, SolidWorks, CATIA 등 모든 CAD 도구 지원</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900">API 제공</strong>
                      <p className="text-gray-600">RESTful API로 커스텀 통합 가능</p>
                    </div>
                  </li>
                </ul>
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  도입 문의하기
                </Button>
              </div>
              <div className="relative">
                <img
                  src="/images/plm-workflow-integration.png"
                  alt="PLM 시스템 통합 다이어그램"
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              지금 바로 PLM 워크플로우를 경험해보세요
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              전문 컨설턴트가 귀사에 최적화된 PLM 도입 방안을 제시해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/demo"
                variant="primary"
                size="lg"
              >
                무료 데모 신청
              </Button>
              <Button
                href="/docs"
                variant="secondary"
                size="lg"
              >
                기술 문서 보기
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default PlmWorkflowPage;