import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">개인정보처리방침</h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-600">PAPSNET은 고객님의 개인정보를 소중히 보호합니다</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;