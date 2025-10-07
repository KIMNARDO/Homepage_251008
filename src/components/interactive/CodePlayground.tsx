import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Copy, Download, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CodePlaygroundProps {
  initialCode?: string;
  language?: string;
  title?: string;
  className?: string;
}

const defaultCode = `// CLIP PLM API Example
import { CLIPClient } from '@clip-plm/sdk';

const client = new CLIPClient({
  apiKey: 'your-api-key-here',
  environment: 'production'
});

// Create a new product
const product = await client.products.create({
  name: 'Innovative Widget',
  category: 'Electronics',
  specifications: {
    weight: '2.5kg',
    dimensions: '30x20x15cm',
    material: 'Aluminum'
  }
});

// Track product lifecycle
await client.lifecycle.track(product.id, {
  stage: 'development',
  milestone: 'prototype-complete',
  metadata: {
    testResults: 'passed',
    qualityScore: 95
  }
});

// Generate analytics report
const analytics = await client.analytics.generate({
  productId: product.id,
  timeRange: '30d',
  metrics: ['performance', 'cost', 'timeline']
});

console.log('Product created:', product);
console.log('Analytics:', analytics);`;

const outputData = {
  productCreated: {
    id: 'prod_8x9y2z',
    name: 'Innovative Widget',
    status: 'active',
    created: '2024-09-21T10:30:00Z'
  },
  analytics: {
    performance: '98.5%',
    costEfficiency: '15% under budget',
    timeline: 'On track - 3 days ahead'
  }
};

export default function CodePlayground({
  initialCode = defaultCode,
  language = 'typescript',
  title = 'CLIP PLM SDK Demo',
  className
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'output'>('code');

  const runCode = async () => {
    setIsRunning(true);
    setActiveTab('output');
    setOutput('Running code...\n');

    // Simulate API calls with delays
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOutput(prev => prev + '✅ Connected to CLIP PLM API\n');

    await new Promise(resolve => setTimeout(resolve, 800));
    setOutput(prev => prev + '✅ Product created successfully\n');
    setOutput(prev => prev + `📦 Product ID: ${outputData.productCreated.id}\n`);

    await new Promise(resolve => setTimeout(resolve, 600));
    setOutput(prev => prev + '✅ Lifecycle tracking initiated\n');

    await new Promise(resolve => setTimeout(resolve, 700));
    setOutput(prev => prev + '✅ Analytics generated\n\n');
    setOutput(prev => prev + '📊 Results:\n');
    setOutput(prev => prev + `Performance: ${outputData.analytics.performance}\n`);
    setOutput(prev => prev + `Cost Efficiency: ${outputData.analytics.costEfficiency}\n`);
    setOutput(prev => prev + `Timeline: ${outputData.analytics.timeline}\n\n`);
    setOutput(prev => prev + '🎉 Demo completed successfully!');

    setIsRunning(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clip-plm-demo.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    setActiveTab('code');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        'bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={copyCode}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy code"
            >
              <Copy size={16} />
            </button>
            <button
              onClick={downloadCode}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Download code"
            >
              <Download size={16} />
            </button>
            <button
              onClick={resetCode}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>
            <motion.button
              onClick={runCode}
              disabled={isRunning}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 bg-electric-600 text-white rounded-lg font-medium transition-all',
                isRunning
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-electric-700 hover:shadow-md'
              )}
            >
              {isRunning ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Play size={16} />
                </motion.div>
              ) : (
                <Play size={16} />
              )}
              {isRunning ? 'Running...' : 'Run Code'}
            </motion.button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4">
          <button
            onClick={() => setActiveTab('code')}
            className={cn(
              'px-3 py-1 text-sm rounded-lg transition-colors',
              activeTab === 'code'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            Code
          </button>
          <button
            onClick={() => setActiveTab('output')}
            className={cn(
              'px-3 py-1 text-sm rounded-lg transition-colors',
              activeTab === 'output'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            Output
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-96 overflow-hidden">
        {activeTab === 'code' ? (
          <div className="h-full">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm bg-gray-900 text-gray-100 border-none outline-none resize-none"
              spellCheck={false}
              style={{
                lineHeight: '1.5',
                tabSize: 2,
              }}
            />
          </div>
        ) : (
          <div className="h-full p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-auto">
            <pre className="whitespace-pre-wrap">{output || 'Click "Run Code" to see output...'}</pre>
            {isRunning && (
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-green-400 ml-1"
              />
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 p-3">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Language: {language}</span>
          <span>{code.split('\n').length} lines</span>
        </div>
      </div>
    </motion.div>
  );
}