import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  Settings,
  BarChart3,
  Layers,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  Sun,
  Moon,
  Command,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Globe
} from 'lucide-react';

import { useSimpleAuthStore } from '@/stores/simpleAuthStore';

const AdminLayout: React.FC = () => {
  const { isAuthenticated, isLoading, user, logout } = useSimpleAuthStore();
  const [authChecked, setAuthChecked] = useState(false);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({ pages: true });

  useEffect(() => {
    setAuthChecked(true);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (!authChecked || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const navigation = [
    { name: '대시보드', href: '/admin', icon: LayoutDashboard },
    {
      name: '페이지 관리',
      icon: Globe,
      children: [
        { name: '히어로 섹션', href: '/admin/hero', icon: Sparkles },
        { name: '바디 섹션', href: '/admin/body', icon: FileText },
      ]
    },
    { name: '메뉴 관리', href: '/admin/navigation', icon: Layers },
    { name: '설정', href: '/admin/settings', icon: Settings },
  ];

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const isParentActive = (children: any[]) => {
    return children.some(child => location.pathname === child.href);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Layout Container */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:relative lg:flex lg:flex-shrink-0 top-0 left-0 z-50 h-full w-[280px] bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50 shadow-2xl transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-[72px] px-5 border-b border-slate-800/50">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">PAPSNET</span>
                <span className="block text-xs text-slate-400 font-medium">관리자 대시보드</span>
              </div>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-6">
            {/* Quick Actions */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">빠른 실행</p>
              <button
                onClick={() => setIsCommandOpen(true)}
                className="w-full flex items-center justify-between px-3 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-all group"
              >
                <div className="flex items-center space-x-2">
                  <Command className="w-4 h-4" />
                  <span className="text-sm">빠른 명령</span>
                </div>
                <kbd className="text-xs bg-slate-700/50 px-1.5 py-0.5 rounded border border-slate-600/50">⌘K</kbd>
              </button>
            </div>

            {/* Main Navigation */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">메인 메뉴</p>
              <ul className="space-y-1">
                {navigation.map((item: any) => {
                  const Icon = item.icon;
                  const hasChildren = item.children && item.children.length > 0;
                  const active = item.href ? isActive(item.href) : false;
                  const parentActive = hasChildren ? isParentActive(item.children) : false;
                  const isExpanded = expandedMenus[item.name.toLowerCase().replace(' ', '')];

                  return (
                    <li key={item.name}>
                      {hasChildren ? (
                        <>
                          {/* Parent Menu Item */}
                          <button
                            onClick={() => toggleMenu(item.name.toLowerCase().replace(' ', ''))}
                            className={`
                              w-full relative flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                              ${parentActive
                                ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white shadow-lg shadow-blue-500/10'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                              }
                            `}
                          >
                            {parentActive && (
                              <motion.div
                                layoutId="activeNav"
                                className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl border border-blue-500/30"
                              />
                            )}
                            <div className={`relative z-10 p-2 rounded-lg ${parentActive ? 'bg-blue-500/20' : 'bg-slate-800/50 group-hover:bg-slate-700/50'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="relative z-10 font-medium flex-1 text-left">{item.name}</span>
                            <ChevronDown className={`relative z-10 w-4 h-4 ml-auto transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>

                          {/* Children Menu Items */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-1 ml-4 space-y-1 overflow-hidden"
                              >
                                {item.children.map((child: any) => {
                                  const ChildIcon = child.icon;
                                  const childActive = isActive(child.href);
                                  return (
                                    <li key={child.href}>
                                      <Link
                                        to={child.href}
                                        className={`
                                          relative flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group
                                          ${childActive
                                            ? 'bg-blue-600/20 text-white'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                          }
                                        `}
                                      >
                                        <div className={`relative z-10 p-1.5 rounded-lg ${childActive ? 'bg-blue-500/20' : 'bg-slate-800/50 group-hover:bg-slate-700/50'}`}>
                                          <ChildIcon className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="relative z-10 text-sm font-medium">{child.name}</span>
                                        {childActive && (
                                          <ChevronRight className="relative z-10 w-3.5 h-3.5 ml-auto opacity-50" />
                                        )}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        /* Simple Menu Item (without children) */
                        <Link
                          to={item.href}
                          className={`
                            relative flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                            ${active
                              ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white shadow-lg shadow-blue-500/10'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                            }
                          `}
                        >
                          {active && (
                            <motion.div
                              layoutId="activeNav"
                              className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl border border-blue-500/30"
                            />
                          )}
                          <div className={`relative z-10 p-2 rounded-lg ${active ? 'bg-blue-500/20' : 'bg-slate-800/50 group-hover:bg-slate-700/50'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="relative z-10 font-medium flex-1">{item.name}</span>
                          {active && (
                            <ChevronRight className="relative z-10 w-4 h-4 ml-auto opacity-50" />
                          )}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-slate-800/50">
            {/* Help & Support */}
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all mb-3">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm">도움말 센터</span>
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-full flex items-center space-x-3 p-3 hover:bg-slate-800/50 rounded-xl transition-all"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-white">{user?.fullName || user?.email}</p>
                  <p className="text-xs text-slate-400">{user?.role || '관리자'}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-slate-800 rounded-xl border border-slate-700 shadow-xl"
                  >
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">계정 설정</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">로그아웃</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        </aside>

        {/* Main content wrapper */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {/* Top bar */}
          <header className="flex-shrink-0 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg">
            <div className="flex items-center justify-between h-[72px] px-6">
              <div className="flex items-center flex-1 gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all lg:hidden"
                >
                  <Menu className="w-5 h-5" />
                </button>

                {/* Search */}
                <div className="flex-1 max-w-xl">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="search"
                      placeholder="검색 (⌘K)"
                      className="w-full pl-11 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-slate-800 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              <button className="relative p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </button>

                {/* Create Button */}
                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
                  새로 만들기
                </button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-slate-950/50">
            <div className="container mx-auto px-6 py-8 max-w-[1920px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
