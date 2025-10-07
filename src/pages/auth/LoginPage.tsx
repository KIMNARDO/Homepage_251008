import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Get redirect URL from query params or default to home
  const from = location.state?.from?.pathname || '/';
  const isAdminLogin = location.pathname === '/admin/login';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[LoginPage] Form submitted', {
      email: formData.email,
      password: '***',
      isAdminLogin,
      currentPath: location.pathname,
      from
    });
    setError('');
    setIsLoading(true);

    try {
      console.log('[LoginPage] Calling login...');
      // Use authStore's login method which now supports Mock API
      await login(formData.email, formData.password);
      console.log('[LoginPage] Login successful');

      // Check if user is authenticated after login
      const authState = useAuthStore.getState();
      console.log('[LoginPage] Auth state after login:', {
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        hasToken: !!localStorage.getItem('access_token')
      });

      // Navigate after successful login
      // Check if user has admin role
      const userRole = authState.user?.role;
      const isAdminRole =
        userRole === 'SUPER_ADMIN' ||
        userRole === 'CONTENT_ADMIN' ||
        userRole === 'ANALYTICS_ADMIN';
      if (isAdminRole) {
        console.log('[LoginPage] Admin user detected, navigating to /admin');
        navigate('/admin');
      } else if (isAdminLogin) {
        console.log('[LoginPage] Admin login page, navigating to /admin');
        navigate('/admin');
      } else {
        console.log('[LoginPage] Regular user, navigating to', from);
        navigate(from);
      }
    } catch (err) {
      console.error('[LoginPage] Login failed', err);
      const errorMessage = err instanceof Error ? err.message : '로그인 중 오류가 발생했습니다.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  return (
    <>
      <Helmet>
        <title>{isAdminLogin ? '관리자 로그인' : '로그인'} | PAPSNET</title>
        <meta name="description" content="PAPSNET 계정으로 로그인하세요" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Container className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-block mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-2xl">P</span>
                </div>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                {isAdminLogin ? '관리자 로그인' : '로그인'}
              </h1>
              <p className="mt-2 text-gray-600">
                {isAdminLogin
                  ? '관리자 계정으로 로그인하세요'
                  : 'PAPSNET 계정으로 로그인하세요'}
              </p>
            </div>

            {/* Login Form */}
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start"
                  >
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    이메일
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="you@example.com"
                    />
                  </div>
                  {isAdminLogin && (
                    <p className="mt-1 text-xs text-gray-500">Demo: admin@papsnet.net</p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    비밀번호
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="appearance-none block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {isAdminLogin && (
                    <p className="mt-1 text-xs text-gray-500">Demo: admin123</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      로그인 상태 유지
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    비밀번호 찾기
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? '로그인 중...' : '로그인'}
                  {!isLoading && <ArrowRight className="w-5 h-5" />}
                </Button>

                {/* Alternative Actions */}
                {!isAdminLogin && (
                  <>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">또는</span>
                      </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                      <span className="text-sm text-gray-600">
                        계정이 없으신가요?{' '}
                        <Link
                          to="/signup"
                          className="font-medium text-blue-600 hover:text-blue-700"
                        >
                          회원가입
                        </Link>
                      </span>
                    </div>
                  </>
                )}

                {/* Admin/User Toggle */}
                <div className="text-center pt-4 border-t border-gray-200">
                  {isAdminLogin ? (
                    <Link
                      to="/login"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      일반 사용자 로그인으로 돌아가기
                    </Link>
                  ) : (
                    <Link
                      to="/admin/login"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      관리자 로그인
                    </Link>
                  )}
                </div>
              </form>
            </Card>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                © 2024 PAPSNET Co., Ltd. All rights reserved.
              </p>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  );
};

export default LoginPage;
