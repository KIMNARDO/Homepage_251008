import React from 'react';

const ServerErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">500</h1>
        <p className="text-xl text-gray-600 mb-8">서버 오류가 발생했습니다</p>
        <a href="/" className="text-blue-600 hover:underline">홈으로 돌아가기</a>
      </div>
    </div>
  );
};

export default ServerErrorPage;