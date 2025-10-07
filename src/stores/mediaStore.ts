import { create } from 'zustand';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  alt?: string;
}

interface MediaState {
  files: MediaFile[];
  selectedFiles: string[];
  isLoading: boolean;
  uploadProgress: number;
  error: string | null;
  searchQuery: string;
  filterType: 'all' | 'image' | 'video' | 'document';

  // Actions
  loadFiles: () => Promise<void>;
  uploadFiles: (files: File[]) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  updateFile: (id: string, updates: Partial<MediaFile>) => Promise<void>;
  selectFile: (id: string) => void;
  selectMultipleFiles: (ids: string[]) => void;
  clearSelection: () => void;
  setSearchQuery: (query: string) => void;
  setFilterType: (type: 'all' | 'image' | 'video' | 'document') => void;
  setError: (error: string | null) => void;
}

const mockFiles: MediaFile[] = [
  {
    id: '1',
    name: 'hero-background.jpg',
    url: '/images/hero-background.jpg',
    type: 'image',
    size: 2048000,
    mimeType: 'image/jpeg',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    tags: ['hero', 'background'],
    alt: 'Hero section background'
  },
  {
    id: '2',
    name: 'product-demo.mp4',
    url: '/videos/product-demo.mp4',
    type: 'video',
    size: 15728640,
    mimeType: 'video/mp4',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
    tags: ['demo', 'product'],
    alt: 'Product demonstration video'
  },
  {
    id: '3',
    name: 'company-logo.svg',
    url: '/images/company-logo.svg',
    type: 'image',
    size: 8192,
    mimeType: 'image/svg+xml',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    tags: ['logo', 'branding'],
    alt: 'Company logo'
  }
];

export const useMediaStore = create<MediaState>((set, get) => ({
  files: [],
  selectedFiles: [],
  isLoading: false,
  uploadProgress: 0,
  error: null,
  searchQuery: '',
  filterType: 'all',

  loadFiles: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Load from localStorage or use mock data
      const savedFiles = localStorage.getItem('media-files');
      const files = savedFiles ? JSON.parse(savedFiles) : mockFiles;

      set({
        files,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load files',
        isLoading: false
      });
    }
  },

  uploadFiles: async (files: File[]) => {
    set({ isLoading: true, uploadProgress: 0, error: null });

    try {
      const { files: currentFiles } = get();
      const newFiles: MediaFile[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Simulate upload progress
        set({ uploadProgress: ((i + 1) / files.length) * 100 });
        await new Promise(resolve => setTimeout(resolve, 500));

        // Create media file object
        const mediaFile: MediaFile = {
          id: Date.now().toString() + i,
          name: file.name,
          url: URL.createObjectURL(file), // In real app, this would be server URL
          type: file.type.startsWith('image/') ? 'image' :
                file.type.startsWith('video/') ? 'video' : 'document',
          size: file.size,
          mimeType: file.type,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: [],
          alt: file.name
        };

        newFiles.push(mediaFile);
      }

      const updatedFiles = [...currentFiles, ...newFiles];

      // Save to localStorage
      localStorage.setItem('media-files', JSON.stringify(updatedFiles));

      set({
        files: updatedFiles,
        isLoading: false,
        uploadProgress: 100
      });

      // Reset progress after a delay
      setTimeout(() => set({ uploadProgress: 0 }), 1000);

    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Upload failed',
        isLoading: false,
        uploadProgress: 0
      });
    }
  },

  deleteFile: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const { files } = get();
      const updatedFiles = files.filter(file => file.id !== id);

      // Save to localStorage
      localStorage.setItem('media-files', JSON.stringify(updatedFiles));

      set({
        files: updatedFiles,
        selectedFiles: get().selectedFiles.filter(selectedId => selectedId !== id),
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete file',
        isLoading: false
      });
    }
  },

  updateFile: async (id: string, updates: Partial<MediaFile>) => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const { files } = get();
      const updatedFiles = files.map(file =>
        file.id === id
          ? { ...file, ...updates, updatedAt: new Date().toISOString() }
          : file
      );

      // Save to localStorage
      localStorage.setItem('media-files', JSON.stringify(updatedFiles));

      set({
        files: updatedFiles,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update file',
        isLoading: false
      });
    }
  },

  selectFile: (id: string) => {
    const { selectedFiles } = get();
    const isSelected = selectedFiles.includes(id);

    set({
      selectedFiles: isSelected
        ? selectedFiles.filter(selectedId => selectedId !== id)
        : [...selectedFiles, id]
    });
  },

  selectMultipleFiles: (ids: string[]) => {
    set({ selectedFiles: ids });
  },

  clearSelection: () => {
    set({ selectedFiles: [] });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setFilterType: (type: 'all' | 'image' | 'video' | 'document') => {
    set({ filterType: type });
  },

  setError: (error: string | null) => {
    set({ error });
  }
}));