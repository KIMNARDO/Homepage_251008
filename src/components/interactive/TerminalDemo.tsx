import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Command {
  input: string;
  output: string[];
  delay?: number;
}

const TerminalDemo: React.FC = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedCommands, setDisplayedCommands] = useState<Command[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const commands: Command[] = [
    {
      input: '$ papsnet init project --type=smart-factory',
      output: [
        '✓ Creating project structure...',
        '✓ Initializing PLM configuration...',
        '✓ Setting up AI analysis modules...',
        '✓ Connecting to CAD systems...',
        '📦 Project "smart-factory" initialized successfully!',
      ],
      delay: 1000,
    },
    {
      input: '$ papsnet analyze drawings --ai=true',
      output: [
        'Analyzing 247 CAD drawings...',
        '🤖 AI Detection: Found 15 design conflicts',
        '⚠️  Warning: Component A-123 has tolerance issues',
        '✅ Optimization suggestions generated',
        '📊 Analysis report saved to ./reports/analysis-2025.pdf',
      ],
      delay: 1500,
    },
    {
      input: '$ papsnet deploy --production --validate',
      output: [
        'Running pre-deployment validation...',
        '✓ All tests passed (187/187)',
        '✓ BOM verification complete',
        '✓ Supplier chain validated',
        '🚀 Deploying to production environment...',
        '✨ Deployment successful! System is live.',
      ],
      delay: 2000,
    },
  ];

  useEffect(() => {
    const runCommands = async () => {
      for (let i = 0; i < commands.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsTyping(true);

        // Type the command
        await new Promise((resolve) => setTimeout(resolve, 500));

        setDisplayedCommands((prev) => [...prev, { ...commands[i], output: [] }]);
        setIsTyping(false);

        // Show output lines one by one
        for (let j = 0; j < commands[i].output.length; j++) {
          await new Promise((resolve) => setTimeout(resolve, 300));
          setDisplayedCommands((prev) => {
            const newCommands = [...prev];
            const lastCommand = newCommands[newCommands.length - 1];
            lastCommand.output = [...lastCommand.output, commands[i].output[j]];
            return newCommands;
          });
        }

        if (commands[i].delay) {
          await new Promise((resolve) => setTimeout(resolve, commands[i].delay));
        }
      }

      // Loop back to the beginning
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setDisplayedCommands([]);
      runCommands();
    };

    runCommands();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="terminal-window shadow-2xl">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="flex gap-2">
            <div className="terminal-dot"></div>
            <div className="terminal-dot"></div>
            <div className="terminal-dot"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-gray-400">CLIP PLM Terminal</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="terminal-content h-96 overflow-y-auto">
          <div className="space-y-4">
            <AnimatePresence>
              {displayedCommands.map((cmd, cmdIndex) => (
                <motion.div
                  key={`cmd-${cmdIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  {/* Command Input */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center"
                  >
                    <span className="text-green-400 mr-2">➜</span>
                    <span className="text-blue-400 font-mono text-sm">
                      {cmd.input}
                    </span>
                  </motion.div>

                  {/* Command Output */}
                  <div className="pl-6 space-y-1">
                    <AnimatePresence>
                      {cmd.output.map((line, lineIndex) => (
                        <motion.div
                          key={`line-${cmdIndex}-${lineIndex}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: lineIndex * 0.1 }}
                          className="text-gray-300 text-sm font-mono"
                        >
                          {line}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Cursor */}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-blue-400"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalDemo;