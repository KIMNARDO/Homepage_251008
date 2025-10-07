import { create } from 'zustand';
import { adminContentAPI } from '@/services/api';
import { useContentStore } from '@/stores/contentStore';

export type ContentTypeOption =
  | 'HERO_BANNER'
  | 'HERO_HEADING'
  | 'HERO_SUBHEADING'
  | 'HERO_CTA'
  | 'HERO_VIDEO'
  | 'FEATURE_TAB'
  | 'FEATURE_SECTION'
  | 'AI_FEATURE'
  | 'TESTIMONIAL'
  | 'COMPANY_LOGO'
  | 'INTEGRATION_BENEFIT'
  | 'CTA_SECTION'
  | 'FOOTER_CONTENT'
  | 'ANNOUNCEMENT'
  | 'CUSTOM';

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

export interface AdminContentItem {
  id: number;
  contentType: ContentTypeOption;
  title: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaPrimary?: boolean;
  displayOrder: number;
  isPublished: boolean;
  languageCode?: string;
  sectionIdentifier: string;
  cssClass?: string;
  iconClass?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: string;
}

interface PaginationState {
  page: number;
  size: number;
  total: number;
  totalPages: number;
}

interface ContentFilters {
  contentType?: ContentTypeOption | '';
  sectionIdentifier?: string;
  languageCode?: string;
  isPublished?: boolean | '';
}

interface AdminContentState {
  items: AdminContentItem[];
  isLoading: boolean;
  error: string | null;
  filters: ContentFilters;
  pagination: PaginationState;
  selectedItem: AdminContentItem | null;

  loadContent: () => Promise<void>;
  createContent: (payload: Partial<AdminContentItem>) => Promise<void>;
  updateContent: (id: number, payload: Partial<AdminContentItem>) => Promise<void>;
  deleteContent: (id: number) => Promise<void>;
  togglePublish: (id: number) => Promise<void>;
  reorderSection: (sectionIdentifier: string, orderedIds: number[]) => Promise<void>;

  setFilters: (filters: Partial<ContentFilters>) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSelectedItem: (item: AdminContentItem | null) => void;
}

const isNotFoundError = (error: unknown): error is Error =>
  error instanceof Error && /status:\s*404/i.test(error.message || '');

export const useAdminContentStore = create<AdminContentState>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,
  filters: {
    sectionIdentifier: 'home-hero',
    languageCode: 'ko'
  },
  pagination: {
    page: 0,
    size: 10,
    total: 0,
    totalPages: 0
  },
  selectedItem: null,

  // Helpers
  isNotFoundError: (error: unknown): error is Error =>
    error instanceof Error && /status:\s*404/i.test(error.message || ''),

  loadContent: async () => {
    const { filters, pagination } = get();
    set({ isLoading: true, error: null });

    try {
      const response = await adminContentAPI.list({
        contentType: filters.contentType || undefined,
        sectionIdentifier: filters.sectionIdentifier?.trim() || undefined,
        languageCode: filters.languageCode || undefined,
        isPublished: typeof filters.isPublished === 'boolean' ? filters.isPublished : undefined,
        page: pagination.page,
        size: pagination.size
      }) as ApiResponse<PageResponse<AdminContentItem>>;

      if (!response.success || !response.data) {
        throw new Error(response.error?.message || response.message || '콘텐츠를 불러오지 못했습니다.');
      }

      const nextItems = Array.isArray(response.data?.content) ? response.data.content : [];

      set({
        items: nextItems,
        pagination: {
          page: response.data?.number ?? 0,
          size: response.data?.size ?? pagination.size,
          total: response.data?.totalElements ?? 0,
          totalPages: response.data?.totalPages ?? 0
        },
        isLoading: false
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : '콘텐츠를 불러오지 못했습니다.';
      set({ error: message, isLoading: false });
    }
  },

  createContent: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      await adminContentAPI.create(payload);
      await get().loadContent();

      // Trigger refresh in contentStore to update homepage immediately
      const { loadContent: refreshHomepage } = useContentStore.getState();
      await refreshHomepage();
    } catch (error) {
      const message = error instanceof Error ? error.message : '콘텐츠 생성에 실패했습니다.';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  updateContent: async (id, payload) => {
    set({ isLoading: true, error: null });
    try {
      await adminContentAPI.update(id, payload);
      await get().loadContent();

      // Trigger refresh in contentStore to update homepage immediately
      const { loadContent: refreshHomepage } = useContentStore.getState();
      await refreshHomepage();
    } catch (error) {
      const message = error instanceof Error ? error.message : '콘텐츠 수정에 실패했습니다.';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  deleteContent: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await adminContentAPI.delete(id);
      await get().loadContent();
    } catch (error) {
      const message = error instanceof Error ? error.message : '콘텐츠 삭제에 실패했습니다.';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  togglePublish: async (id) => {
    try {
      await adminContentAPI.togglePublish(id);
      await get().loadContent();

      // Trigger refresh in contentStore to update homepage immediately
      const { loadContent: refreshHomepage } = useContentStore.getState();
      await refreshHomepage();
    } catch (error) {
      const message = error instanceof Error ? error.message : '공개 상태 변경에 실패했습니다.';
      set({ error: message });
      throw error;
    }
  },

  reorderSection: async (sectionIdentifier, orderedIds) => {
    set({ isLoading: true, error: null });
    try {
      await adminContentAPI.reorder(sectionIdentifier, orderedIds);
      await get().loadContent();
    } catch (error) {
      if (isNotFoundError(error)) {
        const currentItems = get().items;
        const orderMap = new Map<number, number>();
        orderedIds.forEach((id, index) => orderMap.set(id, index + 1));

        const updatedItems = currentItems.map((item) =>
          item.sectionIdentifier === sectionIdentifier
            ? {
                ...item,
                displayOrder: orderMap.get(item.id) ?? item.displayOrder
              }
            : item
        );

        set({
          items: updatedItems,
          isLoading: false,
          error: null
        });
        return;
      }

      const message = error instanceof Error ? error.message : '정렬 변경에 실패했습니다.';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  setFilters: (updates) => {
    const current = get().filters;
    set({
      filters: { ...current, ...updates },
      pagination: { ...get().pagination, page: 0 }
    });
    void get().loadContent();
  },

  setPage: (page) => {
    set({ pagination: { ...get().pagination, page } });
    void get().loadContent();
  },

  setPageSize: (size) => {
    set({ pagination: { ...get().pagination, size, page: 0 } });
    void get().loadContent();
  },

  setSelectedItem: (item) => {
    set({ selectedItem: item });
  }
}));
