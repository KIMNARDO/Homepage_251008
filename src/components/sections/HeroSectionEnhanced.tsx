import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

interface AnimatedElement {
  id: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const HeroSectionEnhanced: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<AnimatedElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Initialize particle system
  useEffect(() => {
    const generateParticles = () => {
      const newParticles: AnimatedElement[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: `particle-${i}`,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 5,
          duration: Math.random() * 10 + 10,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  // Canvas animation for PLM visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationId: number;
    let time = 0;

    const drawPLMFlow = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw animated connections
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 150;

      // Central hub
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.fill();

      // Orbiting nodes
      const nodes = 6;
      for (let i = 0; i < nodes; i++) {
        const angle = (i / nodes) * Math.PI * 2 + time * 0.01;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Draw connection lines
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.3 + Math.sin(time * 0.05 + i) * 0.2})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw nodes
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${0.6 + Math.sin(time * 0.05 + i) * 0.4})`;
        ctx.fill();

        // Draw data flow particles
        const particleAngle = angle - time * 0.02;
        const particleRadius = radius * (0.3 + (time * 0.01 + i) % 0.7);
        const px = centerX + Math.cos(particleAngle) * particleRadius;
        const py = centerY + Math.sin(particleAngle) * particleRadius;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(251, 191, 36, 0.8)';
        ctx.fill();
      }

      time++;
      if (isPlaying) {
        animationId = requestAnimationFrame(drawPLMFlow);
      }
    };

    if (isPlaying) {
      drawPLMFlow();
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 hero-gradient-mesh" />

      {/* Particle system */}
      <div className="particle-container">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            initial={{ x: particle.x, y: particle.y, opacity: 0 }}
            animate={{
              y: [particle.y, particle.y - 500],
              opacity: [0, 1, 0],
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
            }}
          />
        ))}
      </div>

      {/* Morphing shapes */}
      <div className="absolute top-20 left-20 w-96 h-96 morph-shape" />
      <div className="absolute bottom-20 right-20 w-64 h-64 morph-shape" />

      {/* Canvas for PLM visualization */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.3 }}
      />

      <Container className="relative z-10 flex min-h-screen items-center">
        <motion.div style={{ y, opacity }} className="w-full">
          <div className="mx-auto max-w-4xl text-center">
            {/* Announcement banner */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <a
                href="/blog/clip-plm-ai"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <span className="flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <span>NEW: CLIP PLM AI 기능 출시!</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>

            {/* Main heading with gradient text */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-text-reveal mb-6 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
            >
              <span className="gradient-text">AI-Powered PLM</span>
              <br />
              <span>for Smart Factory</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hero-text-reveal-delay-1 mb-10 text-xl text-gray-200 sm:text-2xl"
            >
              PAPSNET이 제공하는 차세대 PLM 솔루션으로
              <br />
              제품 라이프사이클을 혁신하세요
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hero-text-reveal-delay-2 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="pulse-glow group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              >
                <span className="relative z-10">무료 체험 시작하기</span>
                <div className="absolute inset-0 -z-0 bg-white opacity-0 transition-opacity group-hover:opacity-20" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                데모 영상 보기
              </Button>
            </motion.div>

            {/* Company logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16"
            >
              <p className="mb-8 text-sm font-medium uppercase tracking-wider text-gray-400">
                Leading companies trust PAPSNET
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
                {['Samsung', 'LG', 'Hyundai', 'SK', 'POSCO'].map((company, index) => (
                  <motion.div
                    key={company}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="floating-element"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <div className="glass-card rounded-lg px-6 py-3">
                      <span className="text-lg font-semibold text-white">{company}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Interactive feature preview cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {[
              {
                icon: '🤖',
                title: 'AI 자동 분석',
                description: '도면과 BOM을 AI가 자동으로 분석하고 최적화',
              },
              {
                icon: '🔄',
                title: '실시간 협업',
                description: '설계부터 생산까지 모든 단계에서 실시간 협업',
              },
              {
                icon: '📊',
                title: '스마트 대시보드',
                description: '한눈에 보는 프로젝트 현황과 인사이트',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass-card interactive-hover rounded-xl p-6 text-left"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-gray-400">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-8 w-5 rounded-full border border-white/30 p-1"
          >
            <div className="h-2 w-full rounded-full bg-white/60" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSectionEnhanced;