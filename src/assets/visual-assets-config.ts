/**
 * PAPSNET Visual Assets Configuration
 * Based on company branding from PDFs and modern enterprise software aesthetic
 */

export const visualAssets = {
  // Company Logo and Branding
  brand: {
    logo: {
      primary: '/assets/images/papsnet-logo.svg',
      white: '/assets/images/papsnet-logo-white.svg',
      icon: '/assets/images/papsnet-icon.svg',
    },
    colors: {
      primary: '#3B82F6', // Blue from company branding
      secondary: '#8B5CF6', // Purple accent
      accent: '#10B981', // Green for success/new features
      dark: '#0A0E27', // Dark navy background
      slate: {
        900: '#0F172A',
        800: '#1E293B',
        700: '#334155',
      }
    }
  },

  // Hero Section Assets
  hero: {
    background: {
      gradient: 'from-slate-900 via-blue-900/20 to-purple-900/20',
      pattern: '/assets/images/hero-grid-pattern.svg',
      particles: '/assets/images/particle-field.png',
    },
    illustration: {
      plmFlow: '/assets/images/plm-flow-diagram.svg',
      smartFactory: '/assets/images/smart-factory-3d.png',
      aiNetwork: '/assets/images/ai-network-visualization.svg',
    }
  },

  // Product Showcase Images
  products: {
    clipPLM: {
      logo: '/assets/images/products/clip-plm-logo.svg',
      screenshot: '/assets/images/products/clip-plm-dashboard.png',
      thumbnail: '/assets/images/products/clip-plm-thumb.jpg',
      features: [
        '/assets/images/products/clip-plm-project-management.png',
        '/assets/images/products/clip-plm-bom-management.png',
        '/assets/images/products/clip-plm-workflow.png',
      ]
    },
    ddms: {
      logo: '/assets/images/products/ddms-logo.svg',
      screenshot: '/assets/images/products/ddms-interface.png',
      thumbnail: '/assets/images/products/ddms-thumb.jpg',
      features: [
        '/assets/images/products/ddms-distribution.png',
        '/assets/images/products/ddms-security.png',
        '/assets/images/products/ddms-collaboration.png',
      ]
    },
    epl: {
      logo: '/assets/images/products/epl-logo.svg',
      screenshot: '/assets/images/products/epl-multi-bom.png',
      thumbnail: '/assets/images/products/epl-thumb.jpg',
      features: [
        '/assets/images/products/epl-bom-structure.png',
        '/assets/images/products/epl-revision-management.png',
        '/assets/images/products/epl-integration.png',
      ]
    },
    icms: {
      logo: '/assets/images/products/icms-logo.svg',
      screenshot: '/assets/images/products/icms-cost-analysis.png',
      thumbnail: '/assets/images/products/icms-thumb.jpg',
      features: [
        '/assets/images/products/icms-dashboard.png',
        '/assets/images/products/icms-reports.png',
        '/assets/images/products/icms-analytics.png',
      ]
    },
    cadwinAI: {
      logo: '/assets/images/products/cadwin-ai-logo.svg',
      screenshot: '/assets/images/products/cadwin-ai-interface.png',
      thumbnail: '/assets/images/products/cadwin-ai-thumb.jpg',
      features: [
        '/assets/images/products/cadwin-autocad-integration.png',
        '/assets/images/products/cadwin-ai-analysis.png',
        '/assets/images/products/cadwin-3d-2d-conversion.png',
      ]
    }
  },

  // Video Thumbnails
  videos: {
    demo: {
      thumbnail: '/assets/images/videos/demo-thumbnail.jpg',
      poster: '/assets/images/videos/demo-poster.jpg',
      playButton: '/assets/images/videos/play-button-overlay.svg',
    },
    tutorials: [
      {
        id: 'plm-basics',
        thumbnail: '/assets/images/videos/tutorial-plm-basics.jpg',
        title: 'PLM 기초 가이드',
      },
      {
        id: 'cadwin-setup',
        thumbnail: '/assets/images/videos/tutorial-cadwin-setup.jpg',
        title: 'CADWin AI 설정 가이드',
      },
      {
        id: 'ddms-workflow',
        thumbnail: '/assets/images/videos/tutorial-ddms-workflow.jpg',
        title: 'DDMS 워크플로우',
      }
    ]
  },

  // Feature Icons and Illustrations
  features: {
    icons: {
      ai: '/assets/icons/ai-brain.svg',
      collaboration: '/assets/icons/collaboration.svg',
      security: '/assets/icons/security-shield.svg',
      integration: '/assets/icons/integration-hub.svg',
      analytics: '/assets/icons/analytics-chart.svg',
      automation: '/assets/icons/automation-gear.svg',
      cloud: '/assets/icons/cloud-network.svg',
      support: '/assets/icons/support-24-7.svg',
    },
    illustrations: {
      aiPowered: '/assets/illustrations/ai-powered-analysis.svg',
      realTimeSync: '/assets/illustrations/real-time-sync.svg',
      dataFlow: '/assets/illustrations/data-flow-diagram.svg',
      workflowAutomation: '/assets/illustrations/workflow-automation.svg',
    }
  },

  // Client Logos
  clients: {
    logos: [
      {
        name: 'DSC',
        logo: '/assets/images/clients/dsc-logo.png',
        lightVersion: '/assets/images/clients/dsc-logo-light.png',
      },
      {
        name: '우리산업',
        logo: '/assets/images/clients/woori-logo.png',
        lightVersion: '/assets/images/clients/woori-logo-light.png',
      },
      {
        name: 'HIRONIC',
        logo: '/assets/images/clients/hironic-logo.png',
        lightVersion: '/assets/images/clients/hironic-logo-light.png',
      },
      {
        name: 'AMS',
        logo: '/assets/images/clients/ams-logo.png',
        lightVersion: '/assets/images/clients/ams-logo-light.png',
      },
      {
        name: 'Paradise City',
        logo: '/assets/images/clients/paradise-city-logo.png',
        lightVersion: '/assets/images/clients/paradise-city-logo-light.png',
      },
      {
        name: 'JNT',
        logo: '/assets/images/clients/jnt-logo.png',
        lightVersion: '/assets/images/clients/jnt-logo-light.png',
      }
    ]
  },

  // Testimonial Backgrounds
  testimonials: {
    backgrounds: {
      gradient1: 'from-blue-900/20 to-purple-900/20',
      gradient2: 'from-purple-900/20 to-pink-900/20',
      gradient3: 'from-green-900/20 to-blue-900/20',
      pattern: '/assets/images/testimonials/quote-pattern.svg',
    },
    avatars: {
      default: '/assets/images/testimonials/avatar-placeholder.png',
      male: '/assets/images/testimonials/avatar-male.png',
      female: '/assets/images/testimonials/avatar-female.png',
    }
  },

  // Background Patterns and Effects
  patterns: {
    grid: '/assets/patterns/grid.svg',
    dots: '/assets/patterns/dots.svg',
    circuit: '/assets/patterns/circuit.svg',
    hexagon: '/assets/patterns/hexagon.svg',
    waves: '/assets/patterns/waves.svg',
  },

  // Glassmorphism Effects
  effects: {
    glassCard: 'bg-white/5 backdrop-blur-lg border border-white/10',
    glassButton: 'bg-white/10 backdrop-blur-md hover:bg-white/20',
    glassOverlay: 'bg-gradient-to-b from-transparent via-white/5 to-white/10',
  },

  // Gradients
  gradients: {
    bluePurple: 'from-blue-600 to-purple-600',
    purplePink: 'from-purple-600 to-pink-600',
    greenBlue: 'from-green-600 to-blue-600',
    dark: 'from-slate-900 to-slate-800',
    overlay: 'from-transparent via-slate-900/50 to-slate-900',
  }
};

export default visualAssets;