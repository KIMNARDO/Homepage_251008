import React from 'react';

const GuidesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">가이드</h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-600">PLM 구축 가이드와 베스트 프랙티스</p>
        </div>
      </div>
    </div>
  );
};

export default GuidesPage;