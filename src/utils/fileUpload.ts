// File upload utilities for admin content management

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml'
];

export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/ogg'
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const validateFile = (file: File, allowedTypes: string[]): { valid: boolean; error?: string } => {
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `지원되지 않는 파일 형식입니다. 허용된 형식: ${allowedTypes.join(', ')}`
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `파일 크기가 너무 큽니다. 최대 크기: ${MAX_FILE_SIZE / 1024 / 1024}MB`
    };
  }

  return { valid: true };
};

export const uploadFile = async (
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> => {
  try {
    // For demo purposes, we'll create a local URL
    // In a real app, you would upload to a server or cloud storage
    const url = URL.createObjectURL(file);

    // Simulate upload progress
    if (onProgress) {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        onProgress({
          loaded: i,
          total: 100,
          percentage: i
        });
      }
    }

    return {
      success: true,
      url
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

export const uploadImageFile = async (
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> => {
  const validation = validateFile(file, ALLOWED_IMAGE_TYPES);
  if (!validation.valid) {
    return {
      success: false,
      error: validation.error
    };
  }

  return uploadFile(file, onProgress);
};

export const uploadVideoFile = async (
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> => {
  const validation = validateFile(file, ALLOWED_VIDEO_TYPES);
  if (!validation.valid) {
    return {
      success: false,
      error: validation.error
    };
  }

  return uploadFile(file, onProgress);
};

export const createFileInput = (
  accept: string,
  multiple = false,
  onSelect: (files: FileList) => void
): void => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = accept;
  input.multiple = multiple;

  input.onchange = (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      onSelect(files);
    }
  };

  input.click();
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
};

// Media store for managing uploaded files
export class MediaStore {
  private static instance: MediaStore;
  private uploads: Map<string, UploadResult> = new Map();

  static getInstance(): MediaStore {
    if (!MediaStore.instance) {
      MediaStore.instance = new MediaStore();
    }
    return MediaStore.instance;
  }

  addUpload(id: string, result: UploadResult): void {
    this.uploads.set(id, result);
  }

  getUpload(id: string): UploadResult | undefined {
    return this.uploads.get(id);
  }

  getAllUploads(): UploadResult[] {
    return Array.from(this.uploads.values());
  }

  removeUpload(id: string): void {
    this.uploads.delete(id);
  }

  clear(): void {
    this.uploads.clear();
  }
}