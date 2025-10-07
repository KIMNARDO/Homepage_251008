import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { visualAssets } from '@/assets/visual-assets-config';

interface AnimatedElement {
  id: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const HeroSectionWithAssets: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<AnimatedElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  // Initialize particle system
  useEffect(() => {
    const generateParticles = () => {
      const newParticles: AnimatedElement[] = [];
      for (let i = 0; i < 60; i++) {
        newParticles.push({
          id: `particle-${i}`,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 5,
          duration: Math.random() * 15 + 10,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  // Enhanced PLM visualization with PAPSNET branding
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationId: number;
    let time = 0;

    const drawPAPSNETFlow = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.35;

      // PAPSNET Central Hub with pulsing effect
      const pulseScale = 1 + Math.sin(time * 0.05) * 0.1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25 * pulseScale, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 25);
      gradient.addColorStop(0, visualAssets.brand.colors.primary);
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Product nodes representing CLIP PLM, DDMS, EPL, ICMS, CADWin AI
      const products = ['PLM', 'DDMS', 'EPL', 'ICMS', 'AI'];
      const nodes = products.length;

      for (let i = 0; i < nodes; i++) {
        const angle = (i / nodes) * Math.PI * 2 + time * 0.01;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Connection lines with gradient
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        const lineGradient = ctx.createLinearGradient(centerX, centerY, x, y);
        lineGradient.addColorStop(0, visualAssets.brand.colors.primary);
        lineGradient.addColorStop(1, visualAssets.brand.colors.secondary);
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 2 + Math.sin(time * 0.05 + i) * 0.5;
        ctx.globalAlpha = 0.4 + Math.sin(time * 0.05 + i) * 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Product nodes with labels
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        const nodeGradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
        nodeGradient.addColorStop(0, `rgba(139, 92, 246, ${0.8 + Math.sin(time * 0.05 + i) * 0.2})`);
        nodeGradient.addColorStop(1, 'rgba(139, 92, 246, 0.2)');
        ctx.fillStyle = nodeGradient;
        ctx.fill();

        // Product labels
        ctx.font = '10px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(products[i], x, y);

        // Data flow particles
        const particleCount = 3;
        for (let j = 0; j < particleCount; j++) {
          const particleProgress = ((time * 0.02 + j * 0.3) % 1);
          const px = centerX + (x - centerX) * particleProgress;
          const py = centerY + (y - centerY) * particleProgress;

          ctx.beginPath();
          ctx.arc(px, py, 3 - particleProgress * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 191, 36, ${0.8 - particleProgress * 0.5})`;
          ctx.fill();
        }

        // Orbiting satellites (representing features)
        const satelliteAngle = angle + time * 0.03;
        const sx = x + Math.cos(satelliteAngle * 3) * 30;
        const sy = y + Math.sin(satelliteAngle * 3) * 30;
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = visualAssets.brand.colors.accent;
        ctx.fill();
      }

      // Network mesh connections
      for (let i = 0; i < nodes; i++) {
        for (let j = i + 1; j < nodes; j++) {
          const angle1 = (i / nodes) * Math.PI * 2 + time * 0.01;
          const angle2 = (j / nodes) * Math.PI * 2 + time * 0.01;
          const x1 = centerX + Math.cos(angle1) * radius;
          const y1 = centerY + Math.sin(angle1) * radius;
          const x2 = centerX + Math.cos(angle2) * radius;
          const y2 = centerY + Math.sin(angle2) * radius;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.05 + Math.sin(time * 0.1 + i + j) * 0.05})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      time++;
      if (isPlaying) {
        animationId = requestAnimationFrame(drawPAPSNETFlow);
      }
    };

    if (isPlaying) {
      drawPAPSNETFlow();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlaying]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${visualAssets.brand.colors.dark}, #1a1f3a, #2a1a4a)`,
      }}
    >
      {/* Animated gradient mesh background with PAPSNET brand colors */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(59, 130, 246, 0.15), transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.15), transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.05), transparent 70%)
          `,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Enhanced particle system with glow effect */}
      <div className="particle-container">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            initial={{ x: particle.x, y: particle.y, opacity: 0 }}
            animate={{
              y: [particle.y, particle.y - 500],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: particle.x,
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, ${visualAssets.brand.colors.primary}, transparent)`,
              boxShadow: `0 0 ${particle.size * 2}px ${visualAssets.brand.colors.primary}`,
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes with PAPSNET brand colors */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          background: `linear-gradient(135deg, ${visualAssets.brand.colors.primary}20, ${visualAssets.brand.colors.secondary}20)`,
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          filter: 'blur(40px)',
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96"
        animate={{
          rotate: -360,
          scale: [1, 0.9, 1],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          background: `linear-gradient(45deg, ${visualAssets.brand.colors.secondary}20, ${visualAssets.brand.colors.accent}10)`,
          borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
          filter: 'blur(50px)',
        }}
      />

      {/* Canvas for PAPSNET PLM visualization */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.4 }}
      />

      <Container className="relative z-10 flex min-h-screen items-center">
        <motion.div style={{ y, opacity }} className="w-full">
          <div className="mx-auto max-w-5xl text-center">
            {/* New feature announcement with PAPSNET branding */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <a
                href="/products/cadwin-ai"
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white transition-all ${visualAssets.effects.glassButton}`}
              >
                <span className="flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className={`relative inline-flex h-2 w-2 rounded-full`} style={{ backgroundColor: visualAssets.brand.colors.accent }}></span>
                </span>
                <span className="font-medium">NEW: CADWin AI - 3D/2D 도면 통합 관리 시스템 출시!</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>

            {/* PAPSNET branded heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              <span
                className="block text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${visualAssets.brand.colors.primary}, ${visualAssets.brand.colors.secondary})`,
                }}
              >
                People and People
              </span>
              <span className="block mt-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                Solution Networks
              </span>
            </motion.h1>

            {/* Tagline with enhanced typography */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-10 text-xl text-gray-300 sm:text-2xl font-light leading-relaxed"
            >
              PAPSNET의 혁신적인 PLM 솔루션으로
              <br />
              <span className="font-medium text-white">스마트 팩토리의 미래</span>를 실현하세요
            </motion.p>

            {/* Product highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-12 flex flex-wrap justify-center gap-4 text-sm"
            >
              {[
                { name: 'CLIP PLM', icon: '🎯' },
                { name: 'DDMS', icon: '📊' },
                { name: 'EPL', icon: '🔄' },
                { name: 'ICMS', icon: '💰' },
                { name: 'CADWin AI', icon: '🤖' },
              ].map((product) => (
                <span
                  key={product.name}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${visualAssets.effects.glassCard} text-white/80`}
                >
                  <span className="text-lg">{product.icon}</span>
                  <span className="font-medium">{product.name}</span>
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons with enhanced design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${visualAssets.brand.colors.primary}, ${visualAssets.brand.colors.secondary})`,
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>무료 데모 체험하기</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 -z-0 bg-white opacity-0 transition-opacity group-hover:opacity-20" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                솔루션 소개 영상
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                회사소개서 다운로드
              </Button>
            </motion.div>

            {/* Client logos with enhanced presentation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16"
            >
              <p className="mb-8 text-sm font-medium uppercase tracking-wider text-gray-400">
                국내 주요 기업들이 신뢰하는 PAPSNET
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {visualAssets.clients.logos.slice(0, 6).map((client, index) => (
                  <motion.div
                    key={client.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`${visualAssets.effects.glassCard} rounded-xl px-6 py-3`}
                  >
                    <span className="text-lg font-semibold text-white/80">{client.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4"
            >
              {[
                { value: '150+', label: '도입 기업', icon: '🏢' },
                { value: '99.9%', label: '시스템 가동률', icon: '⚡' },
                { value: '24/7', label: '기술 지원', icon: '🛠️' },
                { value: '40%', label: '업무 효율 향상', icon: '📈' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`${visualAssets.effects.glassCard} rounded-xl p-6 text-center`}
                >
                  <div className="mb-2 text-3xl">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-gray-400">Discover More</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-12 w-6 rounded-full border-2 border-white/30 p-1"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-full rounded-full bg-white/60"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSectionWithAssets;