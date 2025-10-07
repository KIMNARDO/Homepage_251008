import React from 'react';

const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">시스템 점검 중</h1>
        <p className="text-xl text-gray-600 mb-8">
          더 나은 서비스를 위해 점검 중입니다<br />
          잠시 후 다시 방문해주세요
        </p>
        <p className="text-sm text-gray-500">문의: support@papsnet.net</p>
      </div>
    </div>
  );
};

export default MaintenancePage;