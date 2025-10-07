// API 타입 정의
// 백엔드 API 스키마와 동기화

/**
 * 기본 API 응답 타입
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * 히어로 섹션 데이터
 */
export interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl?: string;
}

/**
 * 섹션 데이터
 */
export interface SectionData {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 사용자 데이터
 */
export interface UserData {
  email: string;
  name?: string;
  role?: string;
}

/**
 * 로그인 응답
 */
export interface LoginResponse {
  token: string;
  user: UserData;
}

/**
 * 인증 토큰
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

/**
 * 페이지네이션 파라미터
 */
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}

/**
 * 페이지네이션 응답
 */
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

/**
 * 에러 응답
 */
export interface ErrorResponse {
  error: string;
  message?: string;
  statusCode?: number;
}
