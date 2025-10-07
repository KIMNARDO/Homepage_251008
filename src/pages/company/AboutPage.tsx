import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">회사 소개</h1>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">PAPSNET 소개</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PAPSNET은 제조업 디지털 혁신을 선도하는 PLM 전문 기업입니다.
              20년 이상의 경험과 노하우를 바탕으로 고객의 비즈니스 성공을 위한
              최적의 솔루션을 제공합니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              자동차, 반도체, 의료기기 등 다양한 산업 분야에서
              500개 이상의 기업이 PAPSNET의 솔루션을 통해
              디지털 전환을 성공적으로 이루어냈습니다.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">핵심 가치</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <div>
                  <strong>혁신</strong> - 최신 기술을 통한 지속적인 혁신
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <div>
                  <strong>신뢰</strong> - 고객과의 신뢰를 바탕으로 한 파트너십
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <div>
                  <strong>전문성</strong> - 업계 최고 수준의 기술 전문성
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">연혁</h2>
            <div className="space-y-3">
              <div className="flex">
                <span className="font-semibold mr-4">2024</span>
                <span>AI 기반 CADWin AI 출시</span>
              </div>
              <div className="flex">
                <span className="font-semibold mr-4">2020</span>
                <span>CLIP PLM 5.0 출시</span>
              </div>
              <div className="flex">
                <span className="font-semibold mr-4">2015</span>
                <span>해외 시장 진출</span>
              </div>
              <div className="flex">
                <span className="font-semibold mr-4">2010</span>
                <span>CLIP DDMS 출시</span>
              </div>
              <div className="flex">
                <span className="font-semibold mr-4">2005</span>
                <span>PAPSNET 설립</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;