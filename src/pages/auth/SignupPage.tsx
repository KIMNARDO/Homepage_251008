import React from 'react';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">회원가입</h1>
        <p className="text-center text-gray-600">관리자 전용 시스템입니다</p>
      </div>
    </div>
  );
};

export default SignupPage;