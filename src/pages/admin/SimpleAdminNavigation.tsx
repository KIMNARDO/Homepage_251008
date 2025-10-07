import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Navigation,
  Image,
  Users,
  Settings,
  BarChart3
} from 'lucide-react';

const SimpleAdminNavigation: React.FC = () => {
  const menuItems = [
    { path: '/admin', label: '대시보드', icon: LayoutDashboard },
    { path: '/admin/content', label: '콘텐츠 관리', icon: FileText },
    { path: '/admin/navigation', label: '메뉴 관리', icon: Navigation },
    { path: '/admin/media', label: '미디어', icon: Image },
    { path: '/admin/users', label: '사용자', icon: Users },
    { path: '/admin/analytics', label: '분석', icon: BarChart3 },
    { path: '/admin/settings', label: '설정', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">메뉴 관리</h1>

        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">관리자 메뉴</h2>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 p-3 rounded hover:bg-slate-700 transition-colors"
                >
                  <Icon className="w-5 h-5 text-blue-400" />
                  <span>{item.label}</span>
                  <span className="text-slate-500 text-sm ml-auto">{item.path}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">사이트 메뉴 구조</h2>
          <p className="text-slate-400">
            사이트의 메뉴 구조는 현재 하드코딩되어 있습니다.<br />
            메뉴를 수정하려면 Header 컴포넌트를 직접 수정해주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleAdminNavigation;