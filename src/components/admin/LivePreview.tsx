import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Maximize2, Minimize2, Monitor, Smartphone, Tablet } from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import HeroSection from '@/components/sections/HeroSection';
import ProductShowcase from '@/components/sections/ProductShowcase';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const LivePreview: React.FC = () => {
  const { getHeroContent, getProductSectionContent, sections } = useContentStore();
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const heroContent = getHeroContent();
  const productContent = getProductSectionContent();

  // Auto-refresh preview when content changes
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 1000); // Refresh every second

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const getDeviceClasses = () => {
    switch (device) {
      case 'mobile':
        return 'w-[375px] h-[667px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      default:
        return 'w-full h-full';
    }
  };

  const getDeviceIcon = (deviceType: DeviceType) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full bg-slate-900 flex flex-col" data-testid="live-preview">
      {/* Preview Controls */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-white">실시간 미리보기</h3>
          <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">
            LIVE
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Device Selection */}
          <div className="flex bg-slate-800 rounded-lg p-1">
            {(['desktop', 'tablet', 'mobile'] as DeviceType[]).map((deviceType) => (
              <button
                key={deviceType}
                onClick={() => setDevice(deviceType)}
                className={`p-2 rounded-md transition-colors ${
                  device === deviceType
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={deviceType}
              >
                {getDeviceIcon(deviceType)}
              </button>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={handleRefresh}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            title="새로고침"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            title={isFullscreen ? '축소' : '확대'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex justify-center">
          <motion.div
            key={refreshKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`${getDeviceClasses()} ${
              isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'border border-slate-700 rounded-lg overflow-hidden bg-white'
            }`}
            data-testid="device-preview"
          >
            <div className="w-full h-full overflow-y-auto">
              {/* Preview iframe alternative - Direct component rendering */}
              <div className="min-h-screen bg-black">
                {/* Hero Section Preview */}
                {heroContent && (
                  <div className="relative">
                    <HeroSection content={heroContent} />
                    <div className="absolute top-4 right-4 z-50">
                      <div className="px-3 py-1 bg-blue-500/80 text-white text-xs rounded-full">
                        Hero Section
                      </div>
                    </div>
                  </div>
                )}

                {/* Product Section Preview */}
                {productContent && (
                  <div className="relative">
                    <ProductShowcase content={productContent} />
                    <div className="absolute top-4 right-4 z-50">
                      <div className="px-3 py-1 bg-purple-500/80 text-white text-xs rounded-full">
                        Product Section
                      </div>
                    </div>
                  </div>
                )}

                {/* No Content State */}
                {!heroContent && !productContent && (
                  <div className="flex items-center justify-center min-h-screen text-white">
                    <div className="text-center">
                      <div className="text-6xl mb-4">👋</div>
                      <h2 className="text-2xl font-bold mb-2">미리보기 준비 중</h2>
                      <p className="text-slate-400">콘텐츠를 편집하면 여기에 실시간으로 표시됩니다</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Preview Info */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-slate-400">
            <span>디바이스: {device}</span>
            <span>해상도: {getDeviceClasses()}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>활성 섹션: {sections.filter(s => s.isVisible).length}개</span>
            <span>마지막 업데이트: {new Date().toLocaleTimeString('ko-KR')}</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsFullscreen(false)}
        />
      )}
    </div>
  );
};

export default LivePreview;