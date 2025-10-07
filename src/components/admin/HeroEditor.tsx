import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Save,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Upload,
  Type,
  Image as ImageIcon,
  Video,
  Megaphone,
  MousePointer,
  Palette,
  X
} from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';

interface HeroContent {
  announcement: {
    text: string;
    href: string;
  };
  heading: string;
  subheading: string;
  tagline: string;
  cta: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
  backgroundImage?: string;
  backgroundVideo?: string;
}

interface HeroEditorProps {
  onClose?: () => void;
  showPreview?: boolean;
}

const HeroEditor: React.FC<HeroEditorProps> = ({ onClose, showPreview = false }) => {
  const { getHeroContent, updateSectionContent, isLoading } = useContentStore();
  const [heroContent, setHeroContent] = useState<HeroContent>({
    announcement: { text: '', href: '' },
    heading: '',
    subheading: '',
    tagline: '',
    cta: [
      { text: '무료 체험 시작', href: '/contact', variant: 'primary' },
      { text: '온라인 데모 예약', href: '/demo', variant: 'secondary' }
    ]
  });
  const [isPreviewMode, setIsPreviewMode] = useState(showPreview);
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'cta'>('content');

  useEffect(() => {
    const content = getHeroContent();
    if (content) {
      setHeroContent(content);
    }
  }, [getHeroContent]);

  const handleSave = () => {
    updateSectionContent('hero', heroContent);
  };

  const handleCtaAdd = () => {
    setHeroContent(prev => ({
      ...prev,
      cta: [
        ...prev.cta,
        { text: '새 버튼', href: '#', variant: 'secondary' }
      ]
    }));
  };

  const handleCtaRemove = (index: number) => {
    setHeroContent(prev => ({
      ...prev,
      cta: prev.cta.filter((_, i) => i !== index)
    }));
  };

  const handleCtaUpdate = (index: number, field: string, value: string) => {
    setHeroContent(prev => ({
      ...prev,
      cta: prev.cta.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleImageUpload = (field: 'backgroundImage' | 'backgroundVideo') => {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = field === 'backgroundVideo' ? 'video/*' : 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // In a real app, upload to server and get URL
        const url = URL.createObjectURL(file);
        setHeroContent(prev => ({ ...prev, [field]: url }));
      }
    };
    input.click();
  };

  return (
    <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-800/50 rounded-2xl overflow-hidden" data-testid="hero-editor">
      {/* Header */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Type className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Hero Section Editor</h3>
              <p className="text-slate-400 text-sm">메인 히어로 섹션 콘텐츠를 편집합니다</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`p-2 rounded-lg transition-colors ${
                isPreviewMode
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {isPreviewMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              저장
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 bg-slate-800/50 p-1 rounded-lg">
          {[
            { id: 'content', label: '콘텐츠', icon: Type },
            { id: 'design', label: '디자인', icon: Palette },
            { id: 'cta', label: 'CTA 버튼', icon: MousePointer }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Announcement */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <Megaphone className="w-4 h-4" />
                공지사항 배너
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  value={heroContent.announcement.text}
                  onChange={(e) => setHeroContent(prev => ({
                    ...prev,
                    announcement: { ...prev.announcement, text: e.target.value }
                  }))}
                  placeholder="공지사항 텍스트"
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
                <input
                  type="text"
                  value={heroContent.announcement.href}
                  onChange={(e) => setHeroContent(prev => ({
                    ...prev,
                    announcement: { ...prev.announcement, href: e.target.value }
                  }))}
                  placeholder="링크 URL"
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-300">메인 헤딩</label>
              <input
                type="text"
                value={heroContent.heading}
                onChange={(e) => setHeroContent(prev => ({ ...prev, heading: e.target.value }))}
                placeholder="메인 제목"
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>

            {/* Subheading */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-300">서브 헤딩</label>
              <textarea
                value={heroContent.subheading}
                onChange={(e) => setHeroContent(prev => ({ ...prev, subheading: e.target.value }))}
                placeholder="부제목 및 설명"
                rows={3}
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
              />
            </div>

            {/* Tagline */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-300">태그라인</label>
              <input
                type="text"
                value={heroContent.tagline}
                onChange={(e) => setHeroContent(prev => ({ ...prev, tagline: e.target.value }))}
                placeholder="강조 메시지"
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>
        )}

        {/* Design Tab */}
        {activeTab === 'design' && (
          <div className="space-y-6">
            {/* Background Image */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <ImageIcon className="w-4 h-4" />
                배경 이미지
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={heroContent.backgroundImage || ''}
                  onChange={(e) => setHeroContent(prev => ({ ...prev, backgroundImage: e.target.value }))}
                  placeholder="이미지 URL 또는 파일 업로드"
                  className="flex-1 px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
                <button
                  onClick={() => handleImageUpload('backgroundImage')}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  업로드
                </button>
              </div>
              {heroContent.backgroundImage && (
                <div className="relative">
                  <img
                    src={heroContent.backgroundImage}
                    alt="Background preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setHeroContent(prev => ({ ...prev, backgroundImage: undefined }))}
                    className="absolute top-2 right-2 p-1 bg-red-500/80 text-white rounded-full hover:bg-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Background Video */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <Video className="w-4 h-4" />
                배경 비디오
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={heroContent.backgroundVideo || ''}
                  onChange={(e) => setHeroContent(prev => ({ ...prev, backgroundVideo: e.target.value }))}
                  placeholder="비디오 URL 또는 파일 업로드"
                  className="flex-1 px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
                <button
                  onClick={() => handleImageUpload('backgroundVideo')}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  업로드
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CTA Tab */}
        {activeTab === 'cta' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Call to Action 버튼</label>
              <button
                onClick={handleCtaAdd}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                버튼 추가
              </button>
            </div>

            <div className="space-y-4">
              {heroContent.cta.map((button, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-300">버튼 {index + 1}</span>
                    {heroContent.cta.length > 1 && (
                      <button
                        onClick={() => handleCtaRemove(index)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      value={button.text}
                      onChange={(e) => handleCtaUpdate(index, 'text', e.target.value)}
                      placeholder="버튼 텍스트"
                      className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                    <input
                      type="text"
                      value={button.href}
                      onChange={(e) => handleCtaUpdate(index, 'href', e.target.value)}
                      placeholder="링크 URL"
                      className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCtaUpdate(index, 'variant', 'primary')}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        button.variant === 'primary'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      Primary
                    </button>
                    <button
                      onClick={() => handleCtaUpdate(index, 'variant', 'secondary')}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        button.variant === 'secondary'
                          ? 'bg-slate-600 text-white'
                          : 'bg-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      Secondary
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Preview Mode */}
      {isPreviewMode && (
        <div className="border-t border-slate-800/50 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">미리보기</h4>
          <div className="bg-black rounded-lg p-6 space-y-4">
            {/* Announcement */}
            {heroContent.announcement.text && (
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse" />
                {heroContent.announcement.text}
              </div>
            )}

            {/* Heading */}
            {heroContent.heading && (
              <h1 className="text-2xl md:text-4xl font-bold text-white">
                {heroContent.heading}
              </h1>
            )}

            {/* Subheading */}
            {heroContent.subheading && (
              <p className="text-white/80 text-lg">{heroContent.subheading}</p>
            )}

            {/* Tagline */}
            {heroContent.tagline && (
              <p className="text-blue-400 text-xl font-semibold">{heroContent.tagline}</p>
            )}

            {/* CTA Buttons */}
            {heroContent.cta.length > 0 && (
              <div className="flex gap-3 pt-4">
                {heroContent.cta.map((button, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      button.variant === 'primary'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
                    }`}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroEditor;