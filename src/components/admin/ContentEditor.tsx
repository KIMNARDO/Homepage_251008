import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Type,
  Grid,
  Eye,
  Layers,
  Save,
  RefreshCw,
  ExternalLink,
  Check,
  AlertCircle
} from 'lucide-react';
import HeroEditor from './HeroEditor';
import ProductEditor from './ProductEditor';
import LivePreview from './LivePreview';
import { useContentStore } from '@/stores/contentStore';

type EditorMode = 'hero' | 'products' | 'preview';

const ContentEditor: React.FC = () => {
  const [activeEditor, setActiveEditor] = useState<EditorMode>('hero');
  const [isAutoSave, setIsAutoSave] = useState(true);
  const { sections, isLoading, isDirty, saveChanges, loadContent, error } = useContentStore();

  const handleSaveAll = async () => {
    await saveChanges();
  };

  const handleRefresh = async () => {
    await loadContent();
  };

  const editorTabs = [
    {
      id: 'hero' as EditorMode,
      label: 'Hero Section',
      icon: Type,
      description: '메인 히어로 섹션 편집',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'products' as EditorMode,
      label: 'Product Section',
      icon: Grid,
      description: '제품 쇼케이스 편집',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'preview' as EditorMode,
      label: 'Live Preview',
      icon: Eye,
      description: '실시간 미리보기',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    }
  ];

  return (
    <div className="h-full bg-slate-950 text-white" data-testid="content-editor">
      {/* Header */}
      <div className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Content Management System</h1>
                <p className="text-slate-400 text-sm">웹사이트 콘텐츠 편집 및 관리</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Auto-save toggle */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-400">자동 저장</label>
                <button
                  onClick={() => setIsAutoSave(!isAutoSave)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    isAutoSave ? 'bg-green-600' : 'bg-slate-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                      isAutoSave ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-blue-400">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm">저장 중...</span>
                  </div>
                ) : isDirty ? (
                  <div className="flex items-center gap-2 text-amber-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">저장되지 않은 변경사항</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-400">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">저장됨</span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
                  title="새로고침"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <button
                  onClick={handleSaveAll}
                  disabled={isLoading || !isDirty}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  저장
                </button>

                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  title="홈페이지 보기"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}
        </div>

        {/* Editor Tabs */}
        <div className="px-6">
          <div className="flex gap-1 bg-slate-800/50 p-1 rounded-lg w-fit">
            {editorTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveEditor(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    activeEditor === tab.id
                      ? `${tab.bgColor} ${tab.color} border border-current/20`
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEditor}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {activeEditor === 'hero' && (
              <div className="p-6 h-full overflow-y-auto">
                <HeroEditor />
              </div>
            )}

            {activeEditor === 'products' && (
              <div className="p-6 h-full overflow-y-auto">
                <ProductEditor />
              </div>
            )}

            {activeEditor === 'preview' && (
              <div className="h-full">
                <LivePreview />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Section Status Bar */}
      <div className="border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">섹션 상태:</span>
            <div className="flex gap-3">
              {sections.map((section) => (
                <div key={section.id} className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      section.isVisible ? 'bg-green-400' : 'bg-slate-600'
                    }`}
                  />
                  <span className="text-sm text-slate-300">{section.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-slate-500">
            마지막 업데이트: {new Date().toLocaleString('ko-KR')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;