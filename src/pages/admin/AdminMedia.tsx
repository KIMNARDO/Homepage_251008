import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image,
  Upload,
  Trash2,
  Download,
  Search,
  Grid,
  List,
  Filter,
  Calendar,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  X,
  CheckCircle,
  AlertCircle,
  Copy,
  Eye,
  Sparkles,
  Play
} from 'lucide-react';

import { useContentStore } from '@/stores/contentStore';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'other';
  size: number;
  url: string;
  thumbnail?: string;
  uploadedAt: string;
  uploadedBy: string;
  dimensions?: { width: number; height: number };
  duration?: number;
  used: boolean;
  dataUrl?: string;
}

const AdminMedia: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [usageFilter, setUsageFilter] = useState<'all' | 'used' | 'unused'>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { updateSectionContent, getHeroContent, loadContent } = useContentStore();

  // Mock media data
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      name: 'hero-banner.jpg',
      type: 'image',
      size: 245780,
      url: '/images/hero-banner.jpg',
      thumbnail: '/images/hero-banner-thumb.jpg',
      uploadedAt: '2024-01-15 14:30',
      uploadedBy: '관리자',
      dimensions: { width: 1920, height: 1080 },
      used: true
    },
    {
      id: '2',
      name: 'product-demo.mp4',
      type: 'video',
      size: 15678900,
      url: '/videos/product-demo.mp4',
      thumbnail: '/images/video-thumb.jpg',
      uploadedAt: '2024-01-14 10:15',
      uploadedBy: '마케팅팀',
      duration: 180,
      used: true
    },
    {
      id: '3',
      name: 'whitepaper-ai.pdf',
      type: 'document',
      size: 1234567,
      url: '/documents/whitepaper-ai.pdf',
      uploadedAt: '2024-01-13 16:45',
      uploadedBy: '콘텐츠팀',
      used: false
    },
    {
      id: '4',
      name: 'feature-icon-1.svg',
      type: 'image',
      size: 4567,
      url: '/images/feature-icon-1.svg',
      thumbnail: '/images/feature-icon-1.svg',
      uploadedAt: '2024-01-12 09:20',
      uploadedBy: '디자인팀',
      dimensions: { width: 64, height: 64 },
      used: true
    },
    {
      id: '5',
      name: 'background-music.mp3',
      type: 'audio',
      size: 5678900,
      url: '/audio/background-music.mp3',
      uploadedAt: '2024-01-10 11:30',
      uploadedBy: '콘텐츠팀',
      duration: 240,
      used: false
    }
  ]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setTimeout(() => {
        setUploadProgress(i);
      }, i * 20);
    }

    // Simulate upload completion
    setTimeout(() => {
      files.forEach(async (file) => {
        const type = getFileType(file.type);

        const toDataUrl = () =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
          });

        let sourceUrl = URL.createObjectURL(file);
        let dataUrl: string | undefined;

        if (type === 'image') {
          try {
            dataUrl = await toDataUrl();
            sourceUrl = dataUrl;
          } catch (error) {
            console.warn('Failed to convert image to data URL', error);
          }
        }

        const newItem: MediaItem = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type,
          size: file.size,
          url: sourceUrl,
          dataUrl,
          uploadedAt: new Date().toLocaleString('ko-KR'),
          uploadedBy: '관리자',
          used: false,
          thumbnail: type === 'image' ? sourceUrl : undefined
        };

        setMediaItems(prev => [newItem, ...prev]);
      });

      setIsUploading(false);
      setUploadProgress(0);
    }, 2000);
  };

  const getFileType = (mimeType: string): MediaItem['type'] => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.includes('pdf') || mimeType.includes('document')) return 'document';
    return 'other';
  };

  const getFileIcon = (type: MediaItem['type']) => {
    switch (type) {
      case 'image':
        return FileImage;
      case 'video':
        return FileVideo;
      case 'audio':
        return FileAudio;
      case 'document':
        return FileText;
      default:
        return File;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDelete = (id: string) => {
    if (window.confirm('이 미디어 파일을 삭제하시겠습니까?')) {
      setMediaItems(prev => prev.filter(item => item.id !== id));
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`선택한 ${selectedItems.length}개의 미디어 파일을 삭제하시겠습니까?`)) {
      setMediaItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    }
  };

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesUsage =
      usageFilter === 'all' ||
      (usageFilter === 'used' ? item.used : !item.used);
    return matchesSearch && matchesType && matchesUsage;
  });

  const totalSize = mediaItems.reduce((sum, item) => sum + item.size, 0);

  const applyToHero = async (item: MediaItem) => {
    let currentHero = getHeroContent();
    if (!currentHero) {
      try {
        await loadContent();
      } catch (error) {
        console.error('Failed to refresh homepage content before applying media', error);
      }
      currentHero = getHeroContent();
    }

    if (!currentHero) {
      alert('홈페이지 콘텐츠가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const updatedHero = {
      ...currentHero,
      backgroundImage: item.type === 'image' ? item.url : currentHero.backgroundImage,
      backgroundVideo: item.type === 'video' ? item.url : item.type === 'image' ? undefined : currentHero.backgroundVideo
    };

    updateSectionContent('hero', updatedHero);
    setMediaItems(prev =>
      prev.map(media =>
        media.id === item.id
          ? { ...media, used: true }
          : media
      )
    );
    alert('홈페이지 히어로 배경에 적용되었습니다. 저장 완료 후 홈페이지를 새로고침해 확인하세요.');
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">미디어 관리</h1>
        <p className="text-gray-400">이미지, 비디오, 문서 등 미디어 파일을 관리합니다</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">전체 파일</p>
              <p className="text-2xl font-bold text-white mt-1">{mediaItems.length}</p>
            </div>
            <File className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">사용된 파일</p>
              <p className="text-2xl font-bold text-white mt-1">
                {mediaItems.filter(i => i.used).length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">미사용 파일</p>
              <p className="text-2xl font-bold text-white mt-1">
                {mediaItems.filter(i => !i.used).length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">총 용량</p>
              <p className="text-2xl font-bold text-white mt-1">{formatFileSize(totalSize)}</p>
            </div>
            <Image className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`mb-6 border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {isUploading ? (
          <div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-400 animate-pulse" />
            </div>
            <p className="text-white mb-2">업로드 중...</p>
            <div className="w-full max-w-xs mx-auto bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-2">{uploadProgress}%</p>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-white mb-2">파일을 여기에 드래그하거나</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              파일 선택
            </button>
            <p className="text-gray-400 text-sm mt-2">최대 100MB까지 업로드 가능</p>
          </div>
        )}
      </div>

      {/* Actions Bar */}
      <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="미디어 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">모든 유형</option>
              <option value="image">이미지</option>
              <option value="video">비디오</option>
              <option value="audio">오디오</option>
              <option value="document">문서</option>
              <option value="other">기타</option>
            </select>

            <select
              value={usageFilter}
              onChange={(e) => setUsageFilter(e.target.value as typeof usageFilter)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체 상태</option>
              <option value="used">사용중</option>
              <option value="unused">미사용</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-800 rounded-lg border border-gray-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'text-blue-400' : 'text-gray-400'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'text-blue-400' : 'text-gray-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {selectedItems.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                삭제 ({selectedItems.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredItems.map(item => {
            const Icon = getFileIcon(item.type);
            const isSelected = selectedItems.includes(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`group relative bg-gray-900/50 border ${
                  isSelected ? 'border-blue-500' : 'border-gray-800'
                } rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-200`}
              >
                {/* Thumbnail */}
                <div className="aspect-square bg-gray-800 relative">
                  {item.type === 'image' && item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon className="w-12 h-12 text-gray-600" />
                    </div>
                  )}

                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        setSelectedItems(prev =>
                          isSelected
                            ? prev.filter(id => id !== item.id)
                            : [...prev, item.id]
                        );
                      }}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Used Badge */}
                  {item.used && (
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                        사용중
                      </span>
                    </div>
                  )}

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-wrap items-center justify-center gap-2 p-2">
                    <button className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => void applyToHero(item)}
                      className="p-2 bg-blue-500/20 text-blue-200 rounded-lg hover:bg-blue-500/30 hover:text-white transition-colors"
                      title={item.type === 'video' ? '히어로 영상으로 적용' : '히어로 배경으로 적용'}
                    >
                      {item.type === 'video' ? <Play className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-white text-sm font-medium truncate">{item.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-gray-400 text-xs">{formatFileSize(item.size)}</span>
                    {item.dimensions && (
                      <span className="text-gray-400 text-xs">
                        {item.dimensions.width}x{item.dimensions.height}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(filteredItems.map(item => item.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                </th>
                <th className="p-4 text-left text-gray-300">파일명</th>
                <th className="p-4 text-left text-gray-300">유형</th>
                <th className="p-4 text-left text-gray-300">크기</th>
                <th className="p-4 text-left text-gray-300">업로드 일시</th>
                <th className="p-4 text-left text-gray-300">업로더</th>
                <th className="p-4 text-left text-gray-300">상태</th>
                <th className="p-4 text-right text-gray-300">작업</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => {
                const Icon = getFileIcon(item.type);
                const isSelected = selectedItems.includes(item.id);

                return (
                  <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          setSelectedItems(prev =>
                            isSelected
                              ? prev.filter(id => id !== item.id)
                              : [...prev, item.id]
                          );
                        }}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-400" />
                        <span className="text-white">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-400">{item.type}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-400">{formatFileSize(item.size)}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {item.uploadedAt}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-400">{item.uploadedBy}</span>
                    </td>
                    <td className="p-4">
                      {item.used ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                          사용중
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full border border-gray-500/30">
                          미사용
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => void applyToHero(item)}
                          className="p-2 text-blue-300 hover:text-white hover:bg-blue-500/20 rounded-lg transition-colors"
                          title={item.type === 'video' ? '히어로 영상으로 적용' : '히어로 배경으로 적용'}
                        >
                          {item.type === 'video' ? <Play className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
