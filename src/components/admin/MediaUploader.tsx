import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaUploaderProps {
  onMediaUploaded: (media: any) => void;
  accept?: string;
  maxSize?: number; // in MB
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  onMediaUploaded,
  accept = 'image/*,video/*',
  maxSize = 100
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedMedia, setUploadedMedia] = useState<any>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File) => {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      throw new Error(`File size exceeds ${maxSize}MB limit`);
    }

    // Check file type
    const allowedTypes = accept.split(',').map(t => t.trim());
    const fileType = file.type;

    const isAllowed = allowedTypes.some(allowedType => {
      if (allowedType === 'image/*') return fileType.startsWith('image/');
      if (allowedType === 'video/*') return fileType.startsWith('video/');
      return fileType === allowedType;
    });

    if (!isAllowed) {
      throw new Error(`File type ${fileType} is not allowed`);
    }

    return true;
  };

  const uploadFile = async (file: File) => {
    try {
      validateFile(file);

      setIsUploading(true);
      setError('');
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/api/admin/media/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(progress);
          }
        }
      );

      setUploadedMedia(response.data.media);
      onMediaUploaded(response.data.media);
    } catch (error: any) {
      setError(error.response?.data?.error || error.message || 'Upload failed');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📤 Upload Media</h3>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />

        {isUploading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <div className="text-lg font-medium text-gray-700">
              Uploading... {uploadProgress}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drag and drop files here
            </p>
            <p className="text-sm text-gray-500 mb-4">
              or click to browse
            </p>
            <p className="text-xs text-gray-400">
              Supported: Images (JPG, PNG, GIF, WebP) and Videos (MP4, WebM, MOV)
              <br />
              Max size: {maxSize}MB
            </p>
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Uploaded Media Preview */}
      <AnimatePresence>
        {uploadedMedia && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6"
          >
            <h4 className="font-medium text-green-900 mb-3">✅ Upload Successful!</h4>

            {/* Media Preview */}
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              {uploadedMedia.type === 'image' ? (
                <img
                  src={`http://localhost:8080${uploadedMedia.url}`}
                  alt="Uploaded"
                  className="w-full h-auto max-h-96 object-contain"
                />
              ) : uploadedMedia.type === 'video' ? (
                <video
                  src={`http://localhost:8080${uploadedMedia.url}`}
                  controls
                  className="w-full h-auto max-h-96"
                />
              ) : null}
            </div>

            {/* Media Info */}
            <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">File:</span>
                <span className="font-medium">{uploadedMedia.originalName || uploadedMedia.filename}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium capitalize">{uploadedMedia.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-medium">{formatFileSize(uploadedMedia.size)}</span>
              </div>
              {uploadedMedia.dimensions && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensions:</span>
                  <span className="font-medium">
                    {uploadedMedia.dimensions.width} × {uploadedMedia.dimensions.height}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
              ✅ Media saved and optimized, ready to use!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaUploader;
