import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSimpleContentStore } from '@/stores/simpleContentStore';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

const SimpleHomePage: React.FC = () => {
  const { hero, sections, isLoading, loadContent } = useSimpleContentStore();

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>PAPSNET - PLM 솔루션으로 스마트 팩토리를 구현하세요</title>
        <meta
          name="description"
          content="PAPSNET은 제품 라이프사이클 관리와 협력사 도면 배포를 통해 더 나은 제품 개발을 지원합니다."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center">
            {hero ? (
              <>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                  {hero.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
                  {hero.subtitle}
                </p>
                <Link
                  to={hero.ctaLink}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {hero.ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </>
            ) : (
              <div className="text-gray-500">
                <p className="text-2xl">관리자 페이지에서 콘텐츠를 설정해주세요</p>
              </div>
            )}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 opacity-20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 opacity-20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 opacity-10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Content Sections */}
      {sections && sections.length > 0 && (
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  className="group"
                >
                  <div className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 md:p-12 ${
                    index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                  }`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                      {section.title}
                    </h2>
                    <div
                      className="text-lg text-gray-600 leading-relaxed prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleHomePage;