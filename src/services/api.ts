// API Service for backend communication
const API_BASE_URL = ((import.meta as any).env?.VITE_API_URL as string | undefined) || 'http://localhost:8080/api';
const USE_MOCK_API = false; // Disable mock mode - use real backend

const ACCESS_TOKEN_KEY = 'auth-access-token';
const REFRESH_TOKEN_KEY = 'auth-refresh-token';
const AUTH_USER_KEY = 'auth-user';

export interface ApiError {
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
}

export interface ContentApiRecord {
  id: number;
  contentType: string;
  title: string;
  content?: string;
  contentKey?: string;
  contentValue?: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaPrimary?: boolean;
  displayOrder: number;
  isPublished: boolean;
  languageCode?: string;
  sectionIdentifier?: string;
  cssClass?: string;
  iconClass?: string;
  metadata?: string;
  updatedAt?: string;
}

export interface HomepageContentPayload {
  heroContent?: ContentApiRecord[];
  featureContent?: ContentApiRecord[];
  testimonialContent?: ContentApiRecord[];
  ctaContent?: ContentApiRecord[];
}

// Mock data for demo purposes
const MOCK_ADMIN_USER = {
  id: 'admin-001',
  email: 'admin@papsnet.net',
  firstName: 'Admin',
  lastName: 'User',
  fullName: 'Admin User',
  role: 'SUPER_ADMIN' as const,
  avatar: '',
  isActive: true,
  lastLogin: new Date().toISOString()
};

const MOCK_TOKENS = {
  accessToken: 'mock-access-token-' + Date.now(),
  refreshToken: 'mock-refresh-token-' + Date.now(),
  tokenType: 'Bearer',
  expiresIn: 3600
};

function isFormData(body: BodyInit | null | undefined): body is FormData {
  return typeof FormData !== 'undefined' && body instanceof FormData;
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/auth/refresh?refreshToken=${encodeURIComponent(refreshToken)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }
    );

    if (!response.ok) {
      clearAuthStorage();
      return null;
    }

    const payload = await response.json().catch(() => null);
    const accessToken = payload?.data?.accessToken;
    if (!accessToken) {
      clearAuthStorage();
      return null;
    }

    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (payload?.data?.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, payload.data.refreshToken);
    }
    if (payload?.data?.user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(payload.data.user));
    }

    return accessToken;
  } catch (error) {
    clearAuthStorage();
    console.error('Failed to refresh access token', error);
    return null;
  }
}

function clearAuthStorage() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

// Generic API request handler with automatic token refresh support
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !isFormData(options.body)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (response.status === 204) {
    return undefined as T;
  }

  if (response.status === 401 && retry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiRequest<T>(endpoint, options, false);
    }
  }

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorPayload = await response.json();
      errorMessage = errorPayload?.error?.message || errorPayload?.message || errorMessage;
    } catch (err) {
      // ignore JSON parsing errors and use default message
    }
    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch (err) {
    // No JSON body
    return undefined as T;
  }
}

const buildQuery = (params: Record<string, unknown> = {}): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, String(value));
    }
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
};

// Mock content data - Array of ContentApiRecord objects
const MOCK_HERO_CONTENT = {
  success: true,
  data: [
    {
      id: 1,
      contentType: 'HERO_HEADING',
      title: 'PLM 혁신을 선도하는',
      content: 'PAPSNET',
      displayOrder: 1,
      isPublished: true,
      languageCode: 'ko',
      sectionIdentifier: 'home-hero'
    },
    {
      id: 2,
      contentType: 'HERO_SUBHEADING',
      title: '자동차, 반도체, 의료기기 산업을 위한 통합 PLM 솔루션',
      content: '30년 이상의 경험과 혁신으로 제조 혁신을 선도합니다',
      displayOrder: 2,
      isPublished: true,
      languageCode: 'ko',
      sectionIdentifier: 'home-hero'
    },
    {
      id: 3,
      contentType: 'HERO_BANNER',
      title: 'Enterprise PLM Solutions',
      content: '글로벌 기업이 신뢰하는 PLM 파트너',
      imageUrl: '/images/hero-bg.jpg',
      displayOrder: 3,
      isPublished: true,
      languageCode: 'ko',
      sectionIdentifier: 'home-hero'
    },
    {
      id: 4,
      contentType: 'HERO_CTA',
      title: '솔루션 보기',
      ctaText: '솔루션 보기',
      ctaHref: '/solutions',
      ctaPrimary: true,
      displayOrder: 4,
      isPublished: true,
      languageCode: 'ko',
      sectionIdentifier: 'home-hero'
    },
    {
      id: 5,
      contentType: 'HERO_CTA',
      title: '문의하기',
      ctaText: '문의하기',
      ctaHref: '/contact',
      ctaPrimary: false,
      displayOrder: 5,
      isPublished: true,
      languageCode: 'ko',
      sectionIdentifier: 'home-hero'
    }
  ]
};

// Public Content API endpoints (unauthenticated)
export const publicContentAPI = {
  list: () => {
    if (USE_MOCK_API) {
      return Promise.resolve({ success: true, data: MOCK_HERO_CONTENT.data });
    }
    return apiRequest<ApiResponse<ContentApiRecord[]>>('/public/content');
  },
  homepage: () => {
    if (USE_MOCK_API) {
      return Promise.resolve({
        success: true,
        data: {
          heroContent: MOCK_HERO_CONTENT.data,
          featureContent: [],
          testimonialContent: [],
          ctaContent: []
        }
      });
    }
    return apiRequest<ApiResponse<HomepageContentPayload>>('/v1/content/homepage');
  },
  getSection: (sectionIdentifier: string, languageCode?: string) => {
    if (USE_MOCK_API) {
      return Promise.resolve(MOCK_HERO_CONTENT);
    }
    return apiRequest(`/v1/content/section/${sectionIdentifier}${buildQuery({ lang: languageCode })}`);
  },
  getByType: (contentType: string, languageCode?: string) => {
    if (USE_MOCK_API) {
      return Promise.resolve(MOCK_HERO_CONTENT);
    }
    return apiRequest(`/v1/content/type/${contentType}${buildQuery({ lang: languageCode })}`);
  },
  getHero: (languageCode?: string) => {
    if (USE_MOCK_API) {
      return Promise.resolve(MOCK_HERO_CONTENT);
    }
    return apiRequest(`/v1/content/hero${buildQuery({ lang: languageCode })}`);
  },
  getFeatures: (languageCode?: string) => {
    if (USE_MOCK_API) {
      return Promise.resolve({ success: true, data: [] });
    }
    return apiRequest(`/v1/content/features${buildQuery({ lang: languageCode })}`);
  }
};

// Admin Page Content API endpoints
export const adminContentAPI = {
  list: (params: {
    contentType?: string;
    sectionIdentifier?: string;
    languageCode?: string;
    isPublished?: boolean;
    page?: number;
    size?: number;
  }) => {
    if (USE_MOCK_API) {
      // Return empty content for admin mock mode
      return Promise.resolve({
        success: true,
        data: {
          content: [],
          totalElements: 0,
          totalPages: 0,
          page: params.page || 0,
          size: params.size || 10
        }
      });
    }
    return apiRequest(`/admin/page-content${buildQuery(params)}`);
  },

  get: (id: number) => apiRequest(`/admin/page-content/${id}`),

  create: (data: unknown) =>
    apiRequest('/admin/page-content', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  update: (id: number, data: unknown) =>
    apiRequest(`/admin/page-content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  delete: (id: number) =>
    apiRequest(`/admin/page-content/${id}`, {
      method: 'DELETE'
    }),

  togglePublish: (id: number) =>
    apiRequest(`/admin/page-content/${id}/publish`, {
      method: 'PATCH'
    }),

  bulkPublish: (ids: number[], isPublished: boolean) =>
    apiRequest(`/admin/page-content/bulk/publish${buildQuery({ ids: ids.join(','), isPublished })}`, {
      method: 'POST'
    }),

  reorder: (sectionIdentifier: string, orderedIds: number[]) =>
    apiRequest(`/admin/page-content/reorder${buildQuery({ sectionIdentifier })}`, {
      method: 'POST',
      body: JSON.stringify(orderedIds)
    })
};

// Admin Navigation API endpoints
export const adminNavigationAPI = {
  list: (params: {
    navigationType?: string;
    languageCode?: string;
    page?: number;
    size?: number;
  }) => {
    if (USE_MOCK_API) {
      // Return empty navigation for admin mock mode
      return Promise.resolve({
        success: true,
        data: {
          content: [],
          totalElements: 0,
          totalPages: 0,
          page: params.page || 0,
          size: params.size || 10
        }
      });
    }
    return apiRequest(`/admin/navigation${buildQuery(params)}`);
  },

  create: (data: unknown) =>
    apiRequest('/admin/navigation', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  update: (id: number, data: unknown) =>
    apiRequest(`/admin/navigation/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  delete: (id: number) =>
    apiRequest(`/admin/navigation/${id}`, {
      method: 'DELETE'
    }),

  togglePublish: (id: number) =>
    apiRequest(`/admin/navigation/${id}/publish`, {
      method: 'PATCH'
    }),

  reorder: (navigationType: string, orderedIds: number[]) =>
    apiRequest(`/admin/navigation/reorder${buildQuery({ navigationType })}`, {
      method: 'POST',
      body: JSON.stringify(orderedIds)
    })
};

// Legacy Admin Content API (simple-backend compatibility)
export const adminLegacyContentAPI = {
  list: () => apiRequest('/admin/content'),
  get: (id: number) => apiRequest(`/admin/content/${id}`),
  create: (data: unknown) =>
    apiRequest('/admin/content', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  update: (id: number, data: unknown) =>
    apiRequest(`/admin/content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  delete: (id: number) =>
    apiRequest(`/admin/content/${id}`, {
      method: 'DELETE'
    })
};

// Media API endpoints
export const mediaAPI = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}/admin/media/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    return response.json();
  },

  getAll: () => apiRequest('/admin/media'),

  delete: (id: number) =>
    apiRequest(`/admin/media/${id}`, {
      method: 'DELETE'
    })
};

// User API endpoints
export const userAPI = {
  getAll: () => apiRequest('/admin/users'),
  getById: (id: string) => apiRequest(`/admin/users/${id}`),
  create: (data: unknown) =>
    apiRequest('/admin/users', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  update: (id: string, data: unknown) =>
    apiRequest(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  delete: (id: string) =>
    apiRequest(`/admin/users/${id}`, {
      method: 'DELETE'
    }),
  updateRole: (id: string, role: string) =>
    apiRequest(`/admin/users/${id}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role })
    })
};

// Settings API endpoints
export const settingsAPI = {
  getAll: () => apiRequest('/admin/settings'),
  update: (data: unknown) =>
    apiRequest('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  getConfig: () => apiRequest('/admin/settings/config'),
  updateConfig: (data: unknown) =>
    apiRequest('/admin/settings/config', {
      method: 'PUT',
      body: JSON.stringify(data)
    })
};

// Analytics API endpoints
export const analyticsAPI = {
  getDashboard: () => {
    if (USE_MOCK_API) {
      return Promise.resolve({ success: true, data: {} });
    }
    return apiRequest('/admin/analytics/dashboard');
  },
  getPageViews: (period = '7d') => {
    if (USE_MOCK_API) {
      return Promise.resolve({ success: true, data: [] });
    }
    return apiRequest(`/admin/analytics/pageviews${buildQuery({ period })}`);
  },
  getUserActivity: (period = '7d') => {
    if (USE_MOCK_API) {
      return Promise.resolve({ success: true, data: [] });
    }
    return apiRequest(`/admin/analytics/users${buildQuery({ period })}`);
  },
  getContentPerformance: () => {
    if (USE_MOCK_API) {
      return Promise.resolve({ success: true, data: [] });
    }
    return apiRequest('/admin/analytics/content');
  }
};

// Authentication API endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    if (USE_MOCK_API) {
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

      if (email === 'admin@papsnet.net' && password === 'admin123') {
        return {
          success: true,
          data: {
            ...MOCK_TOKENS,
            user: MOCK_ADMIN_USER,
            requiresTwoFactor: false
          }
        };
      }

      throw new Error('Invalid email or password');
    }

    return apiRequest('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  logout: async () => {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return { success: true };
    }
    return apiRequest('/admin/auth/logout', { method: 'POST' });
  },

  getMe: async () => {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!token) {
        throw new Error('Unauthorized');
      }
      return {
        success: true,
        data: MOCK_ADMIN_USER
      };
    }
    return apiRequest('/admin/profile');
  },

  refreshToken: async (refreshToken: string) => {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return {
        success: true,
        data: {
          ...MOCK_TOKENS,
          user: MOCK_ADMIN_USER
        }
      };
    }
    return apiRequest(`/admin/auth/refresh${buildQuery({ refreshToken })}`, { method: 'POST' });
  },

  clearAuthStorage
};

export { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, AUTH_USER_KEY };
