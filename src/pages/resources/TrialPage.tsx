import React from 'react';

const TrialPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">무료 체험</h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-600">30일 무료 체험을 시작하세요</p>
        </div>
      </div>
    </div>
  );
};

export default TrialPage;