// Simple API client for minimal CMS backend
import axios, { AxiosError } from 'axios';
import type {
  LoginResponse,
  HeroData,
  SectionData,
  ApiResponse,
} from '@/types/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10초 타임아웃
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // 에러 상태에 따른 처리
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          // 인증 실패 - 로그인 페이지로 리다이렉트
          console.warn('⚠️ 인증이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('token');

          // 현재 관리자 페이지에 있다면 로그인 페이지로
          if (window.location.pathname.startsWith('/admin')) {
            window.location.href = '/admin/login';
          }
          break;

        case 403:
          console.error('❌ 접근 권한이 없습니다.');
          break;

        case 404:
          console.error('❌ 요청한 리소스를 찾을 수 없습니다.');
          break;

        case 500:
          console.error('❌ 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          break;

        default:
          console.error(`❌ 오류 발생 (${status}):`, error.response.data);
      }
    } else if (error.request) {
      // 요청은 전송되었으나 응답을 받지 못함 (네트워크 오류)
      console.error('❌ 네트워크 오류: 서버에 연결할 수 없습니다.');
    } else {
      // 요청 설정 중 오류 발생
      console.error('❌ 요청 설정 오류:', error.message);
    }

    return Promise.reject(error);
  }
);

// ===== Auth =====
export const auth = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/admin/login', { email, password });
    localStorage.setItem('token', data.token);
    return data;
  },
  logout: (): void => {
    localStorage.removeItem('token');
  },
};

// ===== Public Content =====
export const publicContent = {
  getHero: () => api.get<HeroData>('/public/hero'),
  getSections: () => api.get<SectionData[]>('/public/sections'),
};

// ===== Admin Content =====
export const adminContent = {
  getHero: () => api.get<HeroData>('/admin/hero'),
  updateHero: (data: Partial<HeroData>) => api.put<ApiResponse<HeroData>>('/admin/hero', data),
  getSections: () => api.get<SectionData[]>('/admin/sections'),
  updateSections: (data: SectionData[]) => api.put<ApiResponse<SectionData[]>>('/admin/sections', data),
  addSection: (data: Omit<SectionData, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post<ApiResponse<SectionData>>('/admin/sections', data),
  deleteSection: (id: string) => api.delete<ApiResponse>(`/admin/sections/${id}`),
};

export default api;