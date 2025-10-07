import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  ShoppingCart,
  DollarSign,
  Activity
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  const stats = [
    {
      id: 1,
      label: '총 매출',
      value: '₩45.2M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign
    },
    {
      id: 2,
      label: '활성 사용자',
      value: '12,543',
      change: '+8.2%',
      trend: 'up',
      icon: Users
    },
    {
      id: 3,
      label: '전환율',
      value: '3.24%',
      change: '-2.4%',
      trend: 'down',
      icon: ShoppingCart
    },
    {
      id: 4,
      label: '페이지 뷰',
      value: '892K',
      change: '+23.1%',
      trend: 'up',
      icon: Eye
    }
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              대시보드
            </h1>
            <p className="text-slate-400 mt-1">실시간 비즈니스 인사이트를 확인하세요</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:bg-slate-900/70 hover:border-slate-700/50 transition-all group overflow-hidden"
            >
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {isPositive ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">매출 분석</h2>
                <p className="text-sm text-slate-400 mt-1">월간 매출 추이 및 예측</p>
              </div>
            </div>

            <div className="h-80 bg-slate-800/30 rounded-xl flex items-center justify-center border border-slate-700/30">
              <div className="text-center">
                <Activity className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">차트 영역</p>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 h-full">
            <h2 className="text-lg font-semibold text-white mb-6">시스템 상태</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">서버 상태</span>
                  <span className="text-xs text-green-400">정상</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
                <p className="text-xs text-slate-500 mt-1">CPU 사용률: 45%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;