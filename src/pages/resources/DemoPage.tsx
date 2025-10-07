import React from 'react';

const DemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">데모 요청</h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-600">PLM 솔루션을 직접 체험해보세요</p>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;