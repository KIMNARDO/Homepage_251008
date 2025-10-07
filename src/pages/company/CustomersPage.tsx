import React from 'react';

const CustomersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">고객사</h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-600">500개 이상의 기업이 PAPSNET과 함께합니다</p>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;