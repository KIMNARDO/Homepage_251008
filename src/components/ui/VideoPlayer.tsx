import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoPlay = false,
  muted = true,
  controls = true,
  loop = false,
  className,
  onPlay,
  onPause,
  onEnded,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(!autoPlay);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if it's a YouTube URL
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');

  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    setIsLoading(true);

    try {
      if (isPlaying) {
        await videoRef.current.pause();
        setIsPlaying(false);
        onPause?.();
      } else {
        await videoRef.current.play();
        setIsPlaying(true);
        setShowControls(false);
        onPlay?.();
      }
    } catch (error) {
      console.error('Video playback error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowControls(true);
    onEnded?.();
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handlePlayPause();
  };

  // Auto-hide controls during playback
  useEffect(() => {
    if (isPlaying && !controls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, controls]);

  const containerClasses = clsx(
    'relative overflow-hidden bg-gray-900 group cursor-pointer',
    className
  );

  // YouTube Embed
  if (isYouTube) {
    const videoId = getYouTubeId(src);
    return (
      <div ref={containerRef} className={containerClasses}>
        <div className="relative pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&mute=${muted ? 1 : 0}&controls=1&rel=0&modestbranding=1`}
            title="PAPSNET PLM 솔루션 데모"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  // Fallback for error
  if (hasError) {
    return (
      <div className={containerClasses}>
        <div className="relative pb-[56.25%] bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-medium mb-2">동영상을 재생할 수 없습니다</p>
            <p className="text-sm text-white/60">PLM 데모 영상을 준비 중입니다</p>
            <a
              href="https://www.youtube.com/watch?v=demo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-lg transition-colors"
            >
              YouTube에서 보기
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={containerClasses} onClick={handleVideoClick}>
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        preload="metadata"
        onEnded={handleVideoEnd}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover"
        aria-label="PAPSNET 제품 데모 비디오"
      />

      {/* Overlay Controls */}
      <AnimatePresence>
        {(showControls || !isPlaying) && !controls && (
          <motion.div
            className="absolute inset-0 bg-black/30 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Play/Pause Button */}
            <motion.button
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause();
              }}
              disabled={isLoading}
              aria-label={isPlaying ? "비디오 일시정지" : "비디오 재생"}
            >
              {isLoading ? (
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>

            {/* Video Title */}
            {poster && !isPlaying && (
              <motion.div
                className="absolute bottom-6 left-6 right-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
                  PAPSNET PLM 솔루션 데모
                </h3>
                <p className="text-white/80 text-sm md:text-base">
                  제품 라이프사이클 관리의 혁신을 경험해보세요
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Gradient overlay for better text readability */}
      {poster && !isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  );
};

export default VideoPlayer;