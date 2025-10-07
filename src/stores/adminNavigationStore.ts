import { create } from 'zustand';
import { adminNavigationAPI } from '@/services/api';

export type NavigationType = 'MAIN' | 'FOOTER' | 'CTA';

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: { message?: string };
};

type PageResponse<T> = {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export interface NavigationItem {
  id: number;
  text: string;
  href: string;
  displayOrder: number;
  isExternal: boolean;
  isPublished: boolean;
  navigationType: NavigationType;
  target?: string;
  description?: string;
  iconClass?: string;
  badgeText?: string;
  languageCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface NavigationFilters {
  navigationType?: NavigationType;
  languageCode?: string;
}

interface NavigationState {
  items: NavigationItem[];
  isLoading: boolean;
  error: string | null;
  filters: NavigationFilters;
  pagination: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
  selectedItem: NavigationItem | null;

  loadNavigation: () => Promise<void>;
  createItem: (payload: Partial<NavigationItem>) => Promise<void>;
  updateItem: (id: number, payload: Partial<NavigationItem>) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  togglePublish: (id: number) => Promise<void>;
  reorder: (orderedIds: number[]) => Promise<void>;

  setFilters: (filters: Partial<NavigationFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSelectedItem: (item: NavigationItem | null) => void;
}

export const useAdminNavigationStore = create<NavigationState>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,
  filters: {
    navigationType: 'MAIN',
    languageCode: 'ko'
  },
  pagination: {
    page: 0,
    size: 10,
    total: 0,
    totalPages: 0
  },
  selectedItem: null,

  loadNavigation: async () => {
    const { filters, pagination } = get();
    set({ isLoading: true, error: null });

    try {
      const response = await adminNavigationAPI.list({
        navigationType: filters.navigationType,
        languageCode: filters.languageCode,
        page: pagination.page,
        size: pagination.size
      }) as ApiResponse<PageResponse<NavigationItem> | NavigationItem[]>;

      if (!response.success || !response.data) {
        throw new Error(response.error?.message || response.message || '네비게이션을 불러오지 못했습니다.');
      }

      const data = Array.isArray(response.data)
        ? {
            content: response.data,
            number: 0,
            size: response.data.length || pagination.size,
            totalElements: response.data.length,
            totalPages: 1
          }
        : response.data;

      const nextItems = Array.isArray(data?.content) ? data.content : [];

      set({
        items: nextItems,
        pagination: {
          page: data?.number ?? 0,
          size: data?.size ?? pagination.size,
          total: data?.totalElements ?? 0,
          totalPages: data?.totalPages ?? 0
        },
        isLoading: false
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : '네비게이션을 불러오지 못했습니다.';
      set({ error: message, isLoading: false });
    }
  },

  createItem: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      await adminNavigationAPI.create(payload);
      await get().loadNavigation();
    } catch (error) {
      const message = error instanceof Error ? error.message : '네비게이션 생성에 실패했습니다.';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  updateItem: async (id, payload) => {
    set({ isLoading: true, error: null });
    try {
      await adminNavigationAPI.update(id, payload);
      await get().loadNavigation();
    } catch (error) {
      const message = error instanceof Error ? error.message : '네비게이션 수정에 실패했습니다.';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  deleteItem: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await adminNavigationAPI.delete(id);
      await get().loadNavigation();
    } catch (error) {
      const message = error instanceof Error ? error.message : '네비게이션 삭제에 실패했습니다.';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  togglePublish: async (id) => {
    try {
      await adminNavigationAPI.togglePublish(id);
      await get().loadNavigation();
    } catch (error) {
      const message = error instanceof Error ? error.message : '공개 상태 변경에 실패했습니다.';
      set({ error: message });
      throw error;
    }
  },

  reorder: async (orderedIds) => {
    const { filters } = get();
    if (!filters.navigationType) {
      set({ error: '네비게이션 유형을 먼저 선택하세요.' });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      await adminNavigationAPI.reorder(filters.navigationType, orderedIds);
      await get().loadNavigation();
    } catch (error) {
      const message = error instanceof Error ? error.message : '정렬 변경에 실패했습니다.';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  setFilters: (updates) => {
    set({
      filters: { ...get().filters, ...updates },
      pagination: { ...get().pagination, page: 0 }
    });
    void get().loadNavigation();
  },

  setPage: (page) => {
    set({ pagination: { ...get().pagination, page } });
    void get().loadNavigation();
  },

  setPageSize: (size) => {
    set({ pagination: { ...get().pagination, size, page: 0 } });
    void get().loadNavigation();
  },

  setSelectedItem: (item) => {
    set({ selectedItem: item });
  }
}));
