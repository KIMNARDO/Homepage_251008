import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  X,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Zap,
  Shield,
  BarChart3
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  icon?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  image?: string;
  highlights?: string[];
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to CLIP PLM',
    description: 'Take a guided tour to discover how our AI-powered platform transforms product lifecycle management.',
    icon: <Lightbulb className="text-electric-600" size={24} />,
    highlights: ['AI-Powered', 'Real-time Analytics', 'Seamless Integration']
  },
  {
    id: 'dashboard',
    title: 'Intelligent Dashboard',
    description: 'Get real-time insights into your product development process with our comprehensive analytics dashboard.',
    icon: <BarChart3 className="text-emerald-600" size={24} />,
    target: '#dashboard-demo',
    position: 'bottom',
    highlights: ['Live Data', 'Custom Metrics', 'Predictive Analytics']
  },
  {
    id: 'automation',
    title: 'Smart Automation',
    description: 'Automate repetitive tasks and workflows with our intelligent automation engine powered by machine learning.',
    icon: <Zap className="text-amber-600" size={24} />,
    highlights: ['ML-Powered', 'Workflow Automation', 'Smart Scheduling']
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    description: 'Rest assured with bank-level security, compliance management, and audit trails for all your product data.',
    icon: <Shield className="text-blue-600" size={24} />,
    highlights: ['SOC2 Compliant', 'End-to-End Encryption', 'Audit Trails']
  },
  {
    id: 'integration',
    title: 'Seamless Integration',
    description: 'Connect with your existing tools and systems through our extensive API and pre-built integrations.',
    highlights: ['REST API', '100+ Integrations', 'Real-time Sync']
  }
];

interface ProductTourProps {
  autoStart?: boolean;
  onComplete?: () => void;
  onClose?: () => void;
  className?: string;
}

export default function ProductTour({
  autoStart = false,
  onComplete,
  onClose,
  className
}: ProductTourProps) {
  const [isOpen, setIsOpen] = useState(autoStart);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = tourSteps[currentStep];
  const isLastStep = currentStep === tourSteps.length - 1;
  const isFirstStep = currentStep === 0;

  useEffect(() => {
    if (isPlaying && isOpen) {
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            nextStep();
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isOpen, currentStep]);

  const startTour = () => {
    setIsOpen(true);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeTour = () => {
    setIsOpen(false);
    setIsPlaying(false);
    setProgress(0);
    setCurrentStep(0);
    onClose?.();
  };

  const nextStep = () => {
    if (isLastStep) {
      completeTour();
    } else {
      setCurrentStep(prev => prev + 1);
      setProgress(0);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
      setProgress(0);
    }
  };

  const completeTour = () => {
    setIsPlaying(false);
    onComplete?.();

    // Show completion animation
    setTimeout(() => {
      closeTour();
    }, 2000);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isOpen) {
    return (
      <motion.button
        onClick={startTour}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'fixed bottom-6 right-6 z-50 bg-electric-600 text-white p-4 rounded-full shadow-lg hover:bg-electric-700 transition-colors',
          className
        )}
      >
        <Play size={24} />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        {/* Tour Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-electric-600 to-emerald-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {step.icon}
                <div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-electric-100 text-sm">
                    Step {currentStep + 1} of {tourSteps.length}
                  </p>
                </div>
              </div>
              <button
                onClick={closeTour}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 bg-white bg-opacity-20 rounded-full h-2">
              <motion.div
                className="bg-white rounded-full h-full"
                style={{ width: `${((currentStep) / (tourSteps.length - 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {step.description}
              </p>

              {/* Highlights */}
              {step.highlights && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {step.highlights.map((highlight, index) => (
                    <motion.div
                      key={highlight}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-lg p-3 text-center"
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {highlight}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Demo Visual */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {currentStep === 0 && '🚀'}
                    {currentStep === 1 && '📊'}
                    {currentStep === 2 && '⚡'}
                    {currentStep === 3 && '🛡️'}
                    {currentStep === 4 && '🔗'}
                  </div>
                  <div className="text-lg font-semibold text-gray-700">
                    {currentStep === 0 && 'AI-Powered PLM Platform'}
                    {currentStep === 1 && 'Real-time Analytics Dashboard'}
                    {currentStep === 2 && 'Intelligent Automation Engine'}
                    {currentStep === 3 && 'Enterprise-Grade Security'}
                    {currentStep === 4 && 'Seamless System Integration'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Controls */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              {/* Previous Button */}
              <motion.button
                onClick={prevStep}
                disabled={isFirstStep}
                whileHover={!isFirstStep ? { scale: 1.05 } : {}}
                whileTap={!isFirstStep ? { scale: 0.95 } : {}}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
                  isFirstStep
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-200'
                )}
              >
                <ArrowLeft size={16} />
                Previous
              </motion.button>

              {/* Play/Pause Controls */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={togglePlayPause}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-electric-600 text-white rounded-lg hover:bg-electric-700 transition-colors"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </motion.button>

                {/* Progress Indicator */}
                {isPlaying && (
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-electric-600 h-full rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Next/Complete Button */}
              <motion.button
                onClick={nextStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-electric-600 text-white rounded-lg hover:bg-electric-700 transition-colors font-medium"
              >
                {isLastStep ? 'Complete' : 'Next'}
                {!isLastStep && <ArrowRight size={16} />}
              </motion.button>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {tourSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentStep(index);
                    setProgress(0);
                  }}
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors',
                    index === currentStep
                      ? 'bg-electric-600'
                      : index < currentStep
                      ? 'bg-emerald-400'
                      : 'bg-gray-300'
                  )}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
