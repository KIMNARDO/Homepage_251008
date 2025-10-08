import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, X, Image as ImageIcon } from 'lucide-react';
import MediaUploader from './MediaUploader';
import AIImageGenerator from './AIImageGenerator';

interface IntegratedMediaManagerProps {
  currentMedia?: string;
  onMediaSelected: (mediaUrl: string) => void;
  label?: string;
}

const IntegratedMediaManager: React.FC<IntegratedMediaManagerProps> = ({
  currentMedia,
  onMediaSelected,
  label = '이미지/영상'
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'ai' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(currentMedia || '');
  const [showManager, setShowManager] = useState(false);

  const handleMediaUploaded = (media: any) => {
    const mediaUrl = `http://localhost:8080${media.url}`;
    onMediaSelected(mediaUrl);
    setUrlInput(mediaUrl);
    setShowManager(false);
  };

  const handleAIGenerated = (media: any) => {
    const mediaUrl = `http://localhost:8080${media.url}`;
    onMediaSelected(mediaUrl);
    setUrlInput(mediaUrl);
    setShowManager(false);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onMediaSelected(urlInput.trim());
      setShowManager(false);
    }
  };

  const handleRemoveMedia = () => {
    onMediaSelected('');
    setUrlInput('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-300">{label}</label>
        {currentMedia && (
          <button
            onClick={handleRemoveMedia}
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            제거
          </button>
        )}
      </div>

      {/* Current Media Preview */}
      {currentMedia && (
        <div className="relative bg-slate-900 rounded-lg overflow-hidden">
          {currentMedia.match(/\.(mp4|webm|mov)$/i) ? (
            <video
              src={currentMedia}
              controls
              className="w-full h-auto max-h-64 object-contain"
            />
          ) : (
            <img
              src={currentMedia}
              alt="Current media"
              className="w-full h-auto max-h-64 object-contain"
            />
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowManager(!showManager)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-electric-600 hover:bg-electric-700 text-white rounded-lg transition-colors"
        >
          <ImageIcon className="w-4 h-4" />
          {currentMedia ? '변경' : '추가'}
        </button>
      </div>

      {/* Media Manager Modal */}
      <AnimatePresence>
        {showManager && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-slate-800 rounded-lg p-4 space-y-4">
              {/* Tabs */}
              <div className="flex gap-2 border-b border-slate-700">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'upload'
                      ? 'text-electric-400 border-b-2 border-electric-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  업로드
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'ai'
                      ? 'text-electric-400 border-b-2 border-electric-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  AI 생성
                </button>
                <button
                  onClick={() => setActiveTab('url')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'url'
                      ? 'text-electric-400 border-b-2 border-electric-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  URL
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px]">
                {activeTab === 'upload' && (
                  <div className="bg-slate-900 rounded-lg">
                    <MediaUploader onMediaUploaded={handleMediaUploaded} />
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="bg-slate-900 rounded-lg">
                    <AIImageGenerator onImageGenerated={handleAIGenerated} />
                  </div>
                )}

                {activeTab === 'url' && (
                  <div className="space-y-3">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500"
                    />
                    <button
                      onClick={handleUrlSubmit}
                      disabled={!urlInput.trim()}
                      className="w-full px-4 py-2 bg-electric-600 hover:bg-electric-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      적용
                    </button>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowManager(false)}
                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                닫기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntegratedMediaManager;
