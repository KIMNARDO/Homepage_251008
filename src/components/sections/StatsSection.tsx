import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Container from '@/components/ui/Container';
import { COMPANY_INFO } from '@/data/papsnet';

interface StatCardProps {
  number: string;
  label: string;
  description?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ number, label, description, delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.8, delay: delay + 0.2, type: "spring" }}
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4"
        >
          {number}
        </motion.div>
        <h3 className="text-xl font-semibold text-white mb-2">{label}</h3>
        {description && (
          <p className="text-white/60 text-sm">{description}</p>
        )}
      </div>
    </motion.div>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    {
      number: COMPANY_INFO.stats.projects,
      label: '수행 프로젝트',
      description: '다양한 산업 분야의 PLM 구축 경험',
    },
    {
      number: COMPANY_INFO.stats.customers,
      label: '고객사',
      description: '대기업부터 중소기업까지 폭넓은 고객층',
    },
    {
      number: COMPANY_INFO.stats.expertRate,
      label: '전문가 비율',
      description: '중급 이상 전문가로 구성된 팀',
    },
    {
      number: COMPANY_INFO.stats.established,
      label: '설립연도',
      description: '지속적인 성장과 혁신을 이어가는 기업',
    },
  ];

  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={sectionRef} className="relative py-24 bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/5 to-black" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            PAPSNET의 성과와 신뢰
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            {COMPANY_INFO.certifications.join(', ')} 인증 기업으로서
            안정적이고 전문적인 PLM 솔루션을 제공합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              description={stat.description}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          {COMPANY_INFO.certifications.map((cert, index) => (
            <div
              key={index}
              className="px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full"
            >
              <span className="text-white font-medium flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {cert}
              </span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default StatsSection;