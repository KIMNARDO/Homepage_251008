import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Play, Square } from 'lucide-react';
import Typed from 'typed.js';
import { cn } from '../../lib/utils';

interface Command {
  command: string;
  output: string[];
  delay?: number;
}

const commands: Command[] = [
  {
    command: 'clip login',
    output: [
      '🔐 Authenticating with CLIP PLM...',
      '✅ Successfully logged in as: dev@papsnet.com',
      '',
    ],
    delay: 1000,
  },
  {
    command: 'clip project create --name "Smart Widget" --type hardware',
    output: [
      '📦 Creating new project...',
      '🔧 Setting up development environment...',
      '📋 Initializing product lifecycle tracking...',
      '✅ Project "Smart Widget" created successfully!',
      '   Project ID: proj_sw_2024_001',
      '   Status: Development',
      '',
    ],
    delay: 2000,
  },
  {
    command: 'clip stage move --to design-review',
    output: [
      '🎨 Moving to design review stage...',
      '👥 Notifying design team...',
      '📊 Updating timeline: 15% complete',
      '✅ Successfully moved to design-review stage',
      '',
    ],
    delay: 1500,
  },
  {
    command: 'clip quality scan --comprehensive',
    output: [
      '🔍 Running comprehensive quality scan...',
      '   • Material compliance: ✅ PASSED',
      '   • Safety standards: ✅ PASSED',
      '   • Performance metrics: ✅ PASSED',
      '   • Cost analysis: ⚠️  REVIEW NEEDED',
      '📈 Overall score: 92/100',
      '',
    ],
    delay: 2500,
  },
  {
    command: 'clip analytics generate --timeline 30d',
    output: [
      '📊 Generating analytics report...',
      '   Time to market: 8.2 months (15% faster)',
      '   Cost efficiency: 97.5% (3.2% improvement)',
      '   Quality score: 94.3% (industry leading)',
      '   Team velocity: +23% this quarter',
      '💡 Predictive insights: On track for Q2 launch',
      '',
    ],
    delay: 2000,
  },
];

interface AnimatedTerminalProps {
  autoStart?: boolean;
  className?: string;
  speed?: number;
}

export default function AnimatedTerminal({
  autoStart = true,
  className,
  speed = 30
}: AnimatedTerminalProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedOutput, setDisplayedOutput] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        startAnimation();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoStart]);

  const startAnimation = () => {
    setIsRunning(true);
    setCurrentCommandIndex(0);
    setDisplayedOutput(['🚀 CLIP PLM Terminal v2.1.0', '💡 Type "help" for available commands', '']);
    setIsComplete(false);
    executeCommand(0);
  };

  const executeCommand = (index: number) => {
    if (index >= commands.length) {
      setIsComplete(true);
      setIsRunning(false);
      return;
    }

    const command = commands[index];

    // Add command to output
    setDisplayedOutput(prev => [
      ...prev,
      `$ ${command.command}`,
    ]);

    // Type the command output with delay
    setTimeout(() => {
      let outputIndex = 0;
      const outputInterval = setInterval(() => {
        if (outputIndex < command.output.length) {
          setDisplayedOutput(prev => [...prev, command.output[outputIndex]]);
          outputIndex++;
        } else {
          clearInterval(outputInterval);
          setCurrentCommandIndex(index + 1);
          setTimeout(() => executeCommand(index + 1), 500);
        }
      }, 200);
    }, command.delay || 1000);
  };

  const resetTerminal = () => {
    setIsRunning(false);
    setCurrentCommandIndex(0);
    setDisplayedOutput([]);
    setIsComplete(false);
  };

  const copyContent = () => {
    const content = displayedOutput.join('\n');
    navigator.clipboard.writeText(content);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedOutput]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={cn(
        'bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-700',
        className
      )}
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Terminal size={16} />
            <span className="text-sm font-medium">CLIP PLM Terminal</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={copyContent}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-colors"
            title="Copy content"
          >
            <Copy size={14} />
          </motion.button>

          {!isRunning && !isComplete && (
            <motion.button
              onClick={startAnimation}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 text-green-400 hover:text-green-300 hover:bg-gray-700 rounded transition-colors"
              title="Start demo"
            >
              <Play size={14} />
            </motion.button>
          )}

          {(isRunning || isComplete) && (
            <motion.button
              onClick={resetTerminal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded transition-colors"
              title="Reset"
            >
              <Square size={14} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="p-4 h-80 overflow-y-auto font-mono text-sm bg-gray-900"
      >
        <AnimatePresence>
          {displayedOutput.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'mb-1',
                line.startsWith('$') ? 'text-emerald-400' :
                line.includes('✅') ? 'text-green-400' :
                line.includes('⚠️') ? 'text-yellow-400' :
                line.includes('❌') ? 'text-red-400' :
                line.includes('🔐') || line.includes('🔧') || line.includes('📦') ? 'text-blue-400' :
                'text-gray-300'
              )}
            >
              {line === '' ? '\u00A0' : line}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Cursor */}
        {isRunning && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block"
          >
            <span className="text-emerald-400">$ </span>
            <span className="bg-emerald-400 text-gray-900 px-1">_</span>
          </motion.div>
        )}

        {/* Completion message */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-600"
          >
            <div className="text-emerald-400 mb-2">🎉 Demo completed!</div>
            <div className="text-gray-300 text-xs">
              This is a simulation of CLIP PLM's command-line interface.
              <br />
              Real implementation includes advanced AI features and enterprise integrations.
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 px-4 py-2 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>
            {isRunning ? `Executing command ${currentCommandIndex + 1}/${commands.length}` :
             isComplete ? 'Demo completed' :
             'Ready to start demo'}
          </span>
          <div className="flex items-center gap-2">
            <div className={cn(
              'w-2 h-2 rounded-full',
              isRunning ? 'bg-green-500' :
              isComplete ? 'bg-blue-500' : 'bg-gray-500'
            )} />
            <span>
              {isRunning ? 'Running' :
               isComplete ? 'Complete' : 'Idle'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}