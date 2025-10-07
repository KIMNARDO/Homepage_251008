import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  authAPI,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  AUTH_USER_KEY
} from '@/services/api';

interface AdminUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  role: 'VIEWER' | 'ANALYTICS_ADMIN' | 'CONTENT_ADMIN' | 'SUPER_ADMIN';
  avatar?: string;
  isActive?: boolean;
  lastLogin?: string;
}

interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  setUser: (user: AdminUser) => void;
  clearError: () => void;
}

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: { message?: string };
};

type AdminLoginResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: AdminUser;
  requiresTwoFactor: boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authAPI.login(email, password) as ApiResponse<AdminLoginResponse>;

          if (!response.success || !response.data) {
            throw new Error(response.error?.message || response.message || '로그인에 실패했습니다.');
          }

          if (response.data.requiresTwoFactor) {
            throw new Error('2단계 인증이 활성화되어 있습니다. 현재는 코드 입력을 지원하지 않습니다.');
          }

          const { accessToken, refreshToken, user } = response.data;

          localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
          localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : '로그인에 실패했습니다.';
          set({ error: message, isLoading: false, isAuthenticated: false, user: null });
          throw error;
        }
      },

      logout: async () => {
        try {
          await authAPI.logout();
        } catch (error) {
          console.warn('Failed to call logout API', error);
        } finally {
          authAPI.clearAuthStorage();
          set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        }
      },

      initialize: async () => {
        set({ isLoading: true });
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        const storedUser = localStorage.getItem(AUTH_USER_KEY);

        if (!accessToken) {
          authAPI.clearAuthStorage();
          set({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }

        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser) as AdminUser;
            set({ user: parsedUser, isAuthenticated: true, isLoading: false });
            return;
          } catch (error) {
            console.warn('Failed to parse stored user', error);
          }
        }

        try {
          const response = await authAPI.getMe() as ApiResponse<AdminUser>;
          if (response.success && response.data) {
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.data));
            set({ user: response.data, isAuthenticated: true, isLoading: false });
          } else {
            throw new Error('세션이 만료되었습니다.');
          }
        } catch (error) {
          console.warn('Failed to rehydrate admin session', error);
          authAPI.clearAuthStorage();
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      setUser: (user: AdminUser) => {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        set({ user, isAuthenticated: true });
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'admin-auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
