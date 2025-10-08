import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

interface AIContentGeneratorProps {
  onContentGenerated: (content: any) => void;
  sectionType?: 'showcase' | 'features' | 'content';
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({
  onContentGenerated,
  sectionType
}) => {
  const [provider, setProvider] = useState<'openai' | 'claude' | 'gemini'>('claude');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [error, setError] = useState('');

  // AI Configuration state
  const [showConfig, setShowConfig] = useState(false);
  const [aiConfig, setAiConfig] = useState({
    hasOpenAI: false,
    hasClaude: false,
    hasGemini: false
  });

  const [apiKeys, setApiKeys] = useState({
    openaiApiKey: '',
    anthropicApiKey: '',
    geminiApiKey: ''
  });

  useEffect(() => {
    loadAIConfig();
  }, []);

  const loadAIConfig = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/admin/ai/config', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAiConfig(response.data);
    } catch (error) {
      console.error('Failed to load AI config:', error);
    }
  };

  const saveAIConfig = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8080/api/admin/ai/config',
        apiKeys,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await loadAIConfig();
      setShowConfig(false);
      setApiKeys({ openaiApiKey: '', anthropicApiKey: '', geminiApiKey: '' });
      alert('AI configuration saved successfully!');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to save AI configuration');
    }
  };

  const generateContent = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/api/admin/ai/generate-text',
        {
          provider,
          prompt,
          sectionType,
          options: {
            maxTokens: 1500,
            temperature: 0.8
          }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setGeneratedContent(response.data);

      // If structured data is available, use it
      if (response.data.structuredData) {
        onContentGenerated(response.data.structuredData);
      } else {
        onContentGenerated({ rawText: response.data.text });
      }
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerate = () => {
    setGeneratedContent(null);
    generateContent();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* AI Provider Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">AI Content Generator</h3>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            ⚙️ Configure API Keys
          </button>
        </div>

        {/* API Configuration Modal */}
        <AnimatePresence>
          {showConfig && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-4 bg-gray-50 rounded-lg"
            >
              <h4 className="font-medium mb-3">AI API Keys</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OpenAI API Key {aiConfig.hasOpenAI && '✓'}
                  </label>
                  <input
                    type="password"
                    value={apiKeys.openaiApiKey}
                    onChange={(e) => setApiKeys({ ...apiKeys, openaiApiKey: e.target.value })}
                    placeholder="sk-..."
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Claude API Key {aiConfig.hasClaude && '✓'}
                  </label>
                  <input
                    type="password"
                    value={apiKeys.anthropicApiKey}
                    onChange={(e) => setApiKeys({ ...apiKeys, anthropicApiKey: e.target.value })}
                    placeholder="sk-ant-..."
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gemini API Key {aiConfig.hasGemini && '✓'}
                  </label>
                  <input
                    type="password"
                    value={apiKeys.geminiApiKey}
                    onChange={(e) => setApiKeys({ ...apiKeys, geminiApiKey: e.target.value })}
                    placeholder="AI..."
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <button
                  onClick={saveAIConfig}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save API Keys
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Provider Selection */}
        <div className="flex gap-3">
          <button
            onClick={() => setProvider('claude')}
            disabled={!aiConfig.hasClaude}
            className={`flex-1 px-4 py-2 rounded-md transition-colors ${
              provider === 'claude'
                ? 'bg-purple-600 text-white'
                : aiConfig.hasClaude
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            🤖 Claude
          </button>
          <button
            onClick={() => setProvider('openai')}
            disabled={!aiConfig.hasOpenAI}
            className={`flex-1 px-4 py-2 rounded-md transition-colors ${
              provider === 'openai'
                ? 'bg-green-600 text-white'
                : aiConfig.hasOpenAI
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            💚 GPT-4
          </button>
          <button
            onClick={() => setProvider('gemini')}
            disabled={!aiConfig.hasGemini}
            className={`flex-1 px-4 py-2 rounded-md transition-colors ${
              provider === 'gemini'
                ? 'bg-blue-600 text-white'
                : aiConfig.hasGemini
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            🔷 Gemini
          </button>
        </div>
      </div>

      {/* Prompt Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content Brief / Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          placeholder={
            sectionType === 'showcase'
              ? 'Describe the product/service you want to showcase...\nExample: "Our PLM solution for manufacturing companies that improves efficiency by 45%"'
              : sectionType === 'features'
              ? 'Describe the features you want to highlight...\nExample: "Key benefits of our cloud-based collaboration platform"'
              : 'Describe the content you want to generate...'
          }
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={generateContent}
        disabled={isGenerating || !prompt.trim()}
        className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-md hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating with {provider}...
          </span>
        ) : (
          `✨ Generate with ${provider === 'claude' ? 'Claude' : provider === 'openai' ? 'GPT-4' : 'Gemini'}`
        )}
      </button>

      {/* Generated Content Preview */}
      <AnimatePresence>
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-green-900">✅ Content Generated!</h4>
              <button
                onClick={regenerate}
                className="text-sm text-green-700 hover:text-green-800"
              >
                🔄 Regenerate
              </button>
            </div>
            <div className="text-sm text-gray-700 mb-2">
              <strong>Provider:</strong> {generatedContent.provider} ({generatedContent.model})
            </div>
            {generatedContent.structuredData ? (
              <div className="bg-white p-3 rounded border text-sm">
                <pre className="whitespace-pre-wrap overflow-x-auto">
                  {JSON.stringify(generatedContent.structuredData, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="bg-white p-3 rounded border text-sm whitespace-pre-wrap">
                {generatedContent.text}
              </div>
            )}
            <div className="mt-2 text-xs text-gray-500">
              Tokens used: {generatedContent.usage?.totalTokens || generatedContent.usage?.total_tokens || 'N/A'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIContentGenerator;
