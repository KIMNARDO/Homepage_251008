import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

interface AIImageGeneratorProps {
  onImageGenerated: (media: any) => void;
}

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({ onImageGenerated }) => {
  const [provider, setProvider] = useState<'openai-dalle'>('openai-dalle');
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1024x1024' | '1792x1024' | '1024x1792'>('1024x1024');
  const [style, setStyle] = useState<'natural' | 'vivid'>('vivid');
  const [quality, setQuality] = useState<'standard' | 'hd'>('hd');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<any>(null);
  const [error, setError] = useState('');

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/api/admin/ai/generate-image',
        {
          provider,
          prompt,
          options: { size, style, quality }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setGeneratedImage(response.data);
      onImageGenerated(response.data.media);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerate = () => {
    setGeneratedImage(null);
    generateImage();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🎨 AI Image Generator</h3>

      {/* Provider Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">AI Provider</label>
        <div className="flex gap-3">
          <button
            onClick={() => setProvider('openai-dalle')}
            className={`flex-1 px-4 py-2 rounded-md transition-colors ${
              provider === 'openai-dalle'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🖼️ DALL-E 3
          </button>
        </div>
      </div>

      {/* Prompt Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Description
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          placeholder="Describe the image you want to generate...&#10;Example: 'A modern manufacturing facility with robotic arms and digital screens showing PLM software interface, photorealistic style'"
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Image Settings */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as any)}
            className="w-full px-3 py-2 border rounded-md text-sm"
          >
            <option value="1024x1024">Square (1024×1024)</option>
            <option value="1792x1024">Wide (1792×1024)</option>
            <option value="1024x1792">Tall (1024×1792)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as any)}
            className="w-full px-3 py-2 border rounded-md text-sm"
          >
            <option value="vivid">Vivid</option>
            <option value="natural">Natural</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quality</label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value as any)}
            className="w-full px-3 py-2 border rounded-md text-sm"
          >
            <option value="hd">HD</option>
            <option value="standard">Standard</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={generateImage}
        disabled={isGenerating || !prompt.trim()}
        className="w-full px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium rounded-md hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating image with DALL-E 3...
          </span>
        ) : (
          '✨ Generate Image with DALL-E 3'
        )}
      </button>

      {/* Generated Image Preview */}
      <AnimatePresence>
        {generatedImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-green-900">✅ Image Generated!</h4>
              <button
                onClick={regenerate}
                className="text-sm text-green-700 hover:text-green-800"
              >
                🔄 Regenerate
              </button>
            </div>

            {/* Image Preview */}
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={`http://localhost:8080${generatedImage.media.url}`}
                alt="Generated"
                className="w-full h-auto"
              />
            </div>

            {/* Image Info */}
            <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm space-y-2">
              <div>
                <strong>Original Prompt:</strong>
                <p className="text-gray-600 mt-1">{prompt}</p>
              </div>
              {generatedImage.revisedPrompt && (
                <div>
                  <strong>DALL-E Revised Prompt:</strong>
                  <p className="text-gray-600 mt-1">{generatedImage.revisedPrompt}</p>
                </div>
              )}
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Size: {generatedImage.media.dimensions.width}×{generatedImage.media.dimensions.height}</span>
                <span>File Size: {(generatedImage.media.size / 1024).toFixed(1)} KB</span>
              </div>
            </div>

            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
              ✅ Image saved to media library and ready to use!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIImageGenerator;
