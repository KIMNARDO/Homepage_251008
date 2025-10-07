import React from 'react';
import { motion } from 'framer-motion';
import { Book, FileText, Video, Download, Search, Code } from 'lucide-react';

const DocsPage: React.FC = () => {
  const docCategories = [
    {
      id: 1,
      title: '시작 가이드',
      description: 'PLM 솔루션을 시작하는 방법',
      icon: Book,
      color: 'electric',
      docs: [
        '빠른 시작 가이드',
        '설치 및 설정',
        '기본 개념',
        '첫 프로젝트 만들기',
      ],
    },
    {
      id: 2,
      title: '사용자 매뉴얼',
      description: '기능별 상세 사용법',
      icon: FileText,
      color: 'emerald',
      docs: [
        'PLM 관리',
        'BOM 관리',
        '도면 관리',
        '변경 관리',
        '협력사 포털',
      ],
    },
    {
      id: 3,
      title: 'API 문서',
      description: '개발자를 위한 API 레퍼런스',
      icon: Code,
      color: 'purple',
      docs: [
        'REST API',
        '인증 및 권한',
        'Webhook',
        'SDK 다운로드',
      ],
    },
    {
      id: 4,
      title: '비디오 튜토리얼',
      description: '영상으로 배우는 PLM',
      icon: Video,
      color: 'amber',
      docs: [
        '제품 소개',
        '기능 데모',
        '실무 활용법',
        '고급 팁',
      ],
    },
  ];

  const popularDocs = [
    { title: 'PLM 시스템 설치 가이드', views: '15,234', category: '시작 가이드' },
    { title: 'BOM 관리 완벽 가이드', views: '12,456', category: '사용자 매뉴얼' },
    { title: 'REST API 레퍼런스', views: '8,732', category: 'API 문서' },
    { title: '협력사 포털 사용법', views: '7,891', category: '사용자 매뉴얼' },
    { title: '설계 변경 워크플로우', views: '6,543', category: '사용자 매뉴얼' },
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
              기술 문서
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              PAPSNET PLM 솔루션의 모든 것을 배우고 활용하세요
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="문서 검색..."
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-electric-400 transition-colors"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {docCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-electric-400/50 transition-all duration-300 cursor-pointer"
                >
                  <div className={`p-3 bg-${category.color}-400/10 rounded-xl w-fit mb-4 group-hover:bg-${category.color}-400/20 transition-colors`}>
                    <Icon className={`w-6 h-6 text-${category.color}-400`} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{category.description}</p>

                  <ul className="space-y-2">
                    {category.docs.map((doc, idx) => (
                      <li key={idx} className="text-white/70 text-sm hover:text-white transition-colors">
                        • {doc}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Documents */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-4">인기 문서</h2>
            <p className="text-white/60 text-center mb-12">
              가장 많이 조회된 문서를 확인하세요
            </p>

            <div className="space-y-4">
              {popularDocs.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-electric-400/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-white/20 group-hover:text-electric-400 transition-colors">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-electric-400 transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-white/60 text-sm">{doc.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white/60 text-sm">{doc.views} 조회</span>
                    <Download className="w-5 h-5 text-white/40 group-hover:text-electric-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help CTA */}
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
              도움이 필요하신가요?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              전문 지원팀이 24/7 대기하고 있습니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-electric-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                지원팀 문의
              </button>
              <button className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
                커뮤니티 포럼
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DocsPage;