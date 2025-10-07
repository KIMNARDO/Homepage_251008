import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Building2, Rocket } from 'lucide-react';

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const pricingPlans = [
    {
      name: 'Starter',
      icon: Zap,
      description: '소규모 팀을 위한 기본 PLM',
      monthlyPrice: '500,000',
      yearlyPrice: '5,000,000',
      features: [
        '사용자 10명',
        '기본 PLM 기능',
        '5GB 스토리지',
        '이메일 지원',
        '기본 보고서',
      ],
      notIncluded: [
        '고급 워크플로우',
        '협력사 포털',
        '전담 지원',
        'API 접근',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      icon: Building2,
      description: '성장하는 기업을 위한 완전한 솔루션',
      monthlyPrice: '1,500,000',
      yearlyPrice: '15,000,000',
      features: [
        '사용자 50명',
        '전체 PLM 기능',
        '100GB 스토리지',
        '우선 지원',
        '고급 분석',
        '협력사 포털',
        '맞춤 워크플로우',
        'API 접근',
      ],
      notIncluded: [
        '전담 계정 매니저',
        '온사이트 교육',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      description: '대기업을 위한 맞춤형 솔루션',
      monthlyPrice: '맞춤 견적',
      yearlyPrice: '맞춤 견적',
      features: [
        '무제한 사용자',
        '전체 기능 + 맞춤 개발',
        '무제한 스토리지',
        '24/7 전담 지원',
        '전담 계정 매니저',
        '온사이트 교육',
        '맞춤형 통합',
        'SLA 보장',
        '컨설팅 서비스',
      ],
      notIncluded: [],
      popular: false,
    },
  ];

  const addons = [
    { name: 'CAD-WIN AI', price: '300,000원/월' },
    { name: '추가 스토리지 (100GB)', price: '100,000원/월' },
    { name: '추가 사용자 (10명)', price: '200,000원/월' },
    { name: '온사이트 교육', price: '2,000,000원/회' },
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
              투명하고 합리적인 가격
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              귀사의 규모와 필요에 맞는 플랜을 선택하세요
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-electric-500 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                월간 결제
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all relative ${
                  billingCycle === 'yearly'
                    ? 'bg-electric-500 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                연간 결제
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                  20% 할인
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 ${
                    plan.popular
                      ? 'border-electric-400 scale-105 shadow-2xl shadow-electric-500/20'
                      : 'border-white/10'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-electric-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                        인기
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-electric-400/10 rounded-xl">
                      <Icon className="w-6 h-6 text-electric-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  </div>

                  <p className="text-white/60 mb-6">{plan.description}</p>

                  <div className="mb-8">
                    <div className="text-4xl font-bold text-white mb-2">
                      {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                      {plan.monthlyPrice !== '맞춤 견적' && <span className="text-lg text-white/60">원</span>}
                    </div>
                    {plan.monthlyPrice !== '맞춤 견적' && (
                      <p className="text-white/60 text-sm">
                        {billingCycle === 'monthly' ? '월간 결제' : '연간 결제 시'}
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 opacity-50">
                        <X className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                        <span className="text-white/40">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-4 rounded-xl font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-electric-500 to-purple-600 text-white hover:shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {plan.monthlyPrice === '맞춤 견적' ? '영업팀 문의' : '시작하기'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-4">추가 옵션</h2>
            <p className="text-white/60 text-center mb-12">
              필요에 따라 추가할 수 있는 옵션입니다
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {addons.map((addon, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <span className="text-white font-medium">{addon.name}</span>
                  <span className="text-electric-400 font-semibold">{addon.price}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ CTA */}
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
              가격에 대해 궁금하신가요?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              전문 상담사가 귀사에 맞는 최적의 플랜을 제안해드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-electric-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                무료 상담 신청
              </button>
              <button className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
                견적서 다운로드
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;