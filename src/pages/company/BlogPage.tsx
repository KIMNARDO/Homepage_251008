import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'PLM 시스템 도입 시 고려해야 할 7가지 핵심 요소',
      excerpt: 'PLM 시스템을 성공적으로 도입하기 위해서는 체계적인 접근이 필요합니다. 기업의 규모와 특성에 맞는 전략을 수립하는 방법을 알아봅니다.',
      date: '2025년 3월 15일',
      readTime: '8분',
      author: '김철수',
      category: 'PLM 가이드',
      image: '/images/blog/plm-implementation.jpg',
      tags: ['PLM', '디지털 전환', '제조 혁신'],
    },
    {
      id: 2,
      title: '협력사 도면 배포의 디지털 혁신: DDMS의 모든 것',
      excerpt: '협력사와의 도면 공유를 자동화하여 업무 효율을 3배 향상시키는 방법을 소개합니다. 실제 도입 사례와 ROI 분석 포함.',
      date: '2025년 3월 10일',
      readTime: '6분',
      author: '이영희',
      category: '제품 소개',
      image: '/images/blog/ddms-guide.jpg',
      tags: ['DDMS', '협력사 관리', '자동화'],
    },
    {
      id: 3,
      title: 'BOM 관리의 새로운 패러다임: E-BOM과 M-BOM 통합',
      excerpt: '설계 BOM과 제조 BOM을 효과적으로 통합 관리하여 생산 오류를 최소화하고 품질을 향상시키는 전략을 공유합니다.',
      date: '2025년 3월 5일',
      readTime: '10분',
      author: '박지성',
      category: 'BOM 관리',
      image: '/images/blog/bom-integration.jpg',
      tags: ['BOM', 'E-BOM', 'M-BOM', '생산 관리'],
    },
    {
      id: 4,
      title: 'AI 기반 CAD 자동화로 설계 생산성 2배 향상',
      excerpt: 'CAD-WIN AI의 혁신적인 기능들을 활용하여 반복적인 설계 작업을 자동화하고 설계자의 창의성에 집중할 수 있는 환경을 만드는 방법.',
      date: '2025년 3월 1일',
      readTime: '7분',
      author: '최민수',
      category: 'AI & 자동화',
      image: '/images/blog/cad-ai.jpg',
      tags: ['AI', 'CAD', '자동화', '생산성'],
    },
    {
      id: 5,
      title: '스마트 팩토리 구축을 위한 PLM의 역할',
      excerpt: '제조업의 디지털 전환에서 PLM이 왜 필수적인지, 그리고 스마트 팩토리 구축 과정에서 PLM을 어떻게 활용해야 하는지 알아봅니다.',
      date: '2025년 2월 25일',
      readTime: '9분',
      author: '정대리',
      category: '산업 트렌드',
      image: '/images/blog/smart-factory.jpg',
      tags: ['스마트 팩토리', 'Industry 4.0', 'IoT'],
    },
    {
      id: 6,
      title: '설계 변경 관리 (ECO) 프로세스 최적화',
      excerpt: '복잡한 설계 변경을 체계적으로 관리하고 승인 프로세스를 자동화하여 제품 개발 주기를 단축하는 실전 노하우.',
      date: '2025년 2월 20일',
      readTime: '5분',
      author: '김철수',
      category: '변경 관리',
      image: '/images/blog/eco-process.jpg',
      tags: ['ECO', '변경 관리', '워크플로우'],
    },
  ];

  const categories = ['전체', 'PLM 가이드', '제품 소개', 'BOM 관리', 'AI & 자동화', '산업 트렌드', '변경 관리'];

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
              PAPSNET 블로그
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              PLM 인사이트, 산업 트렌드, 그리고 혁신적인 솔루션 활용법
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 relative border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, idx) => (
              <button
                key={idx}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  idx === 0
                    ? 'bg-electric-500 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-electric-400/50 transition-all duration-300 cursor-pointer"
              >
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-electric-500/20 to-purple-600/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/40 text-sm">{post.category}</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-electric-500 text-white text-xs rounded-full font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-electric-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-white/70 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 text-white/60 text-xs rounded-md"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white/60">{post.author}</span>
                    </div>
                    <button className="flex items-center gap-1 text-electric-400 text-sm font-medium group-hover:gap-2 transition-all">
                      읽기
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-12">
            <button className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors">
              더 많은 포스트 보기
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
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
              최신 소식을 받아보세요
            </h2>
            <p className="text-white/90 text-lg mb-8">
              PLM 트렌드와 실전 노하우를 매주 이메일로 받아보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="이메일 주소"
                className="flex-1 px-6 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white"
              />
              <button className="px-8 py-4 bg-white text-electric-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                구독하기
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;