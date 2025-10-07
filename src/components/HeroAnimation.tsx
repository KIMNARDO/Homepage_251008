import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
// Particles imports disabled due to API incompatibility
// import { Particles } from '@tsparticles/react';
// import { loadSlim } from '@tsparticles/slim';

// Floating 3D elements component
function FloatingCube({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </Float>
  );
}

// PLM Dashboard 3D mockup
function PLMDashboard() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={[2, 0, -2]}>
      {/* Dashboard screen */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Progress bars */}
      <mesh position={[-1, 0.5, 0.01]}>
        <planeGeometry args={[1.5, 0.1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      <mesh position={[-1, 0.2, 0.01]}>
        <planeGeometry args={[1.2, 0.1]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>

      <mesh position={[-1, -0.1, 0.01]}>
        <planeGeometry args={[0.8, 0.1]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>

      {/* Text elements */}
      <Text
        position={[0, -0.8, 0.01]}
        fontSize={0.15}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        PLM Workflow Dashboard
      </Text>
    </group>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      <Environment preset="sunset" />

      {/* Floating elements */}
      <FloatingCube position={[-4, 2, 0]} color="#3b82f6" speed={1.2} />
      <FloatingCube position={[4, -1, -1]} color="#10b981" speed={0.8} />
      <FloatingCube position={[-2, -2, 1]} color="#f59e0b" speed={1.5} />
      <FloatingCube position={[3, 3, -2]} color="#8b5cf6" speed={0.9} />

      {/* PLM Dashboard */}
      <PLMDashboard />

      {/* Main title in 3D */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.8}
        color="#0a0e27"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        CLIP PLM
      </Text>

      <Text
        position={[0, 1, 0]}
        fontSize={0.3}
        color="#64748b"
        anchorX="center"
        anchorY="middle"
      >
        Next-Generation Product Lifecycle Management
      </Text>
    </>
  );
}

// Particles configuration - disabled due to API incompatibility
/* const particlesConfig = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: {
        enable: true,
      },
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#3b82f6",
    },
    links: {
      color: "#3b82f6",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none" as const,
      enable: true,
      outModes: {
        default: "bounce" as const,
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.3,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
}; */

// Main Hero Animation Component
export default function HeroAnimation() {
  // Particles init disabled due to API incompatibility
  // const particlesInit = React.useCallback(async (engine: any) => {
  //   await loadSlim(engine);
  // }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Particles background - temporarily disabled for build */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-50/20 to-purple-50/20">
        {/* Particles component disabled due to API incompatibility */}
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-20">
        <Canvas dpr={[1, 2]} className="h-full w-full">
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* 2D Content overlay */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div className="text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-6"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-navy mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-electric-600 via-electric-500 to-emerald-500 bg-clip-text text-transparent">
                CLIP PLM
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-dark-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Transform your product development with our cutting-edge
              <span className="text-electric-600 font-semibold"> AI-powered </span>
              lifecycle management platform
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <motion.button
                className="px-8 py-4 bg-electric-600 text-white rounded-xl font-semibold text-lg hover:bg-electric-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.button>

              <motion.button
                className="px-8 py-4 border-2 border-electric-600 text-electric-600 rounded-xl font-semibold text-lg hover:bg-electric-50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-navy">99.9%</div>
                <div className="text-dark-500">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-navy">50%</div>
                <div className="text-dark-500">Faster</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-navy">24/7</div>
                <div className="text-dark-500">Support</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-electric-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-electric-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}