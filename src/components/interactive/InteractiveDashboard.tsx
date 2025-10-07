import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  TrendingUp,
  Package,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Users,
  Activity,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { cn } from '../../lib/utils';

// Sample data for charts
const performanceData = [
  { month: 'Jan', efficiency: 85, cost: 120000, timeline: 95 },
  { month: 'Feb', efficiency: 88, cost: 115000, timeline: 92 },
  { month: 'Mar', efficiency: 92, cost: 110000, timeline: 98 },
  { month: 'Apr', efficiency: 89, cost: 118000, timeline: 94 },
  { month: 'May', efficiency: 95, cost: 105000, timeline: 99 },
  { month: 'Jun', efficiency: 97, cost: 102000, timeline: 100 },
];

const projectStatusData = [
  { name: 'Completed', value: 45, color: '#10b981' },
  { name: 'In Progress', value: 30, color: '#3b82f6' },
  { name: 'Planning', value: 15, color: '#f59e0b' },
  { name: 'On Hold', value: 10, color: '#ef4444' },
];

const recentActivities = [
  { id: 1, action: 'Product A moved to Testing', timestamp: '2 minutes ago', type: 'success' },
  { id: 2, action: 'New milestone reached for Project X', timestamp: '15 minutes ago', type: 'info' },
  { id: 3, action: 'Quality issue detected in Product B', timestamp: '1 hour ago', type: 'warning' },
  { id: 4, action: 'Design review completed', timestamp: '2 hours ago', type: 'success' },
  { id: 5, action: 'Budget threshold exceeded', timestamp: '3 hours ago', type: 'error' },
];

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

function MetricCard({ title, value, change, changeType, icon, color }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          <p className={cn(
            'text-sm mt-2 flex items-center gap-1',
            changeType === 'positive' ? 'text-emerald-600' :
            changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
          )}>
            {changeType === 'positive' && <TrendingUp size={16} />}
            {change}
          </p>
        </div>
        <div className={cn('p-3 rounded-lg', `bg-${color}-100`)}>
          <div className={cn(`text-${color}-600`)}>
            {icon}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ActivityFeed() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className="text-emerald-600" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-600" />;
      case 'error':
        return <AlertTriangle size={16} className="text-red-600" />;
      default:
        return <Activity size={16} className="text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
      <div className="space-y-4">
        <AnimatePresence>
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function InteractiveDashboard({ className }: { className?: string }) {
  const [selectedMetric, setSelectedMetric] = useState<'efficiency' | 'cost' | 'timeline'>('efficiency');
  const [isRealTime, setIsRealTime] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      // Simulate data refresh
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getLineColor = () => {
    switch (selectedMetric) {
      case 'efficiency':
        return '#10b981';
      case 'cost':
        return '#3b82f6';
      case 'timeline':
        return '#f59e0b';
      default:
        return '#10b981';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn('space-y-6', className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">PLM Dashboard</h2>
          <p className="text-gray-600 mt-1">Real-time insights into your product lifecycle</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => setIsRealTime(!isRealTime)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'px-4 py-2 rounded-lg font-medium transition-all',
              isRealTime
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {isRealTime ? 'Live' : 'Static'}
          </motion.button>
          <motion.button
            onClick={handleRefresh}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={refreshing}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <motion.div
              animate={{ rotate: refreshing ? 360 : 0 }}
              transition={{ duration: 1, repeat: refreshing ? Infinity : 0, ease: 'linear' }}
            >
              <RefreshCw size={20} className="text-gray-600" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Products"
          value="1,247"
          change="+12% this month"
          changeType="positive"
          icon={<Package size={24} />}
          color="blue"
        />
        <MetricCard
          title="Avg. Time to Market"
          value="8.2 months"
          change="-15% improvement"
          changeType="positive"
          icon={<Clock size={24} />}
          color="emerald"
        />
        <MetricCard
          title="Cost Efficiency"
          value="97.5%"
          change="+3.2% this quarter"
          changeType="positive"
          icon={<DollarSign size={24} />}
          color="amber"
        />
        <MetricCard
          title="Active Teams"
          value="23"
          change="2 new teams"
          changeType="positive"
          icon={<Users size={24} />}
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
            <div className="flex gap-2">
              {(['efficiency', 'cost', 'timeline'] as const).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={cn(
                    'px-3 py-1 rounded-lg text-sm font-medium transition-all',
                    selectedMetric === metric
                      ? 'bg-electric-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={getLineColor()}
                strokeWidth={3}
                dot={{ fill: getLineColor(), strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={projectStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {projectStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {projectStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-3 bg-electric-50 border border-electric-200 rounded-lg text-left hover:bg-electric-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Package className="text-electric-600" size={20} />
                <span className="text-electric-800 font-medium">Create New Product</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-left hover:bg-emerald-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="text-emerald-600" size={20} />
                <span className="text-emerald-800 font-medium">Generate Report</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-3 bg-amber-50 border border-amber-200 rounded-lg text-left hover:bg-amber-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="text-amber-600" size={20} />
                <span className="text-amber-800 font-medium">Manage Teams</span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
      >
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <div className="flex items-center gap-2">
            <div className={cn(
              'w-2 h-2 rounded-full',
              isRealTime ? 'bg-emerald-500' : 'bg-gray-400'
            )} />
            <span>{isRealTime ? 'Live data' : 'Static data'}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}