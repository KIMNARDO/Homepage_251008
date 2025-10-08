import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

interface AIImageGeneratorProps {
  onImageGenerated: (media: any) => void;
}

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({ onImageGenerated }) => {
  const [provider, setProvider] = useState<'openai-dalle' | 'gemini-imagen'>('openai-dalle');
  const [prompt, setPrompt] = useState('');

  // DALL-E 3 옵션
  const [dalleSize, setDalleSize] = useState<'1024x1024' | '1792x1024' | '1024x1792'>('1024x1024');
  const [style, setStyle] = useState<'natural' | 'vivid'>('vivid');
  const [quality, setQuality] = useState<'standard' | 'hd'>('hd');

  // Gemini Imagen 4.0 옵션
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [imageSize, setImageSize] = useState<'1K' | '2K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '3:4' | '4:3' | '9:16' | '16:9'>('1:1');
  const [imagenModel, setImagenModel] = useState<'imagen-4.0-generate-001' | 'imagen-4.0-ultra-generate-001' | 'imagen-4.0-fast-generate-001'>('imagen-4.0-generate-001');

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

      let response;
      if (provider === 'gemini-imagen') {
        // Use Gemini Imagen API
        response = await axios.post(
          'http://localhost:8080/api/admin/gemini/generate-image',
          {
            prompt,
            numberOfImages,
            imageSize,
            aspectRatio,
            model: imagenModel
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Use existing DALL-E API
        response = await axios.post(
          'http://localhost:8080/api/admin/ai/generate-image',
          {
            provider,
            prompt,
            options: { size: dalleSize, style, quality }
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setGeneratedImage(response.data);
      onImageGenerated(response.data.media);
    } catch (error: any) {
      console.error('Image generation error:', error);

      // Friendly error message for Gemini Imagen
      const errorMessage = error.response?.data?.error || error.message || 'Failed to generate image';
      if (errorMessage.includes('Vertex AI') || errorMessage.includes('Imagen')) {
        setError(
          '⚠️ Gemini Imagen 4.0 requires Google Cloud Vertex AI setup. ' +
          'Please use DALL-E 3 for now, or contact the administrator to configure Vertex AI.'
        );
      } else {
        setError(errorMessage);
      }
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
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setProvider('gemini-imagen')}
            className={`px-4 py-3 rounded-lg transition-all relative ${
              provider === 'gemini-imagen'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="font-semibold">✨ Gemini Imagen 4.0</div>
            <div className="text-xs opacity-80 mt-1">Google's latest AI</div>
            <div className="absolute top-1 right-1">
              <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded">Beta</span>
            </div>
          </button>
          <button
            onClick={() => setProvider('openai-dalle')}
            className={`px-4 py-3 rounded-lg transition-all ${
              provider === 'openai-dalle'
                ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="font-semibold">🖼️ DALL-E 3</div>
            <div className="text-xs opacity-80 mt-1">OpenAI</div>
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

      {/* Gemini Imagen 4.0 Settings */}
      {provider === 'gemini-imagen' && (
        <div className="space-y-3 mb-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-yellow-600 text-xl">⚠️</span>
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-800 mb-1">Setup Required</h4>
                <p className="text-sm text-yellow-700">
                  Gemini Imagen 4.0 requires Google Cloud Vertex AI configuration.
                  The feature will show an error until Vertex AI is properly set up.
                </p>
                <p className="text-xs text-yellow-600 mt-2">
                  💡 <strong>Tip:</strong> Use DALL-E 3 for immediate image generation without additional setup.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <select
                value={imagenModel}
                onChange={(e) => setImagenModel(e.target.value as any)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              >
                <option value="imagen-4.0-generate-001">Standard (Best Quality)</option>
                <option value="imagen-4.0-ultra-generate-001">Ultra (Premium)</option>
                <option value="imagen-4.0-fast-generate-001">Fast (Quick)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Images</label>
              <select
                value={numberOfImages}
                onChange={(e) => setNumberOfImages(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md text-sm"
              >
                <option value={1}>1 image</option>
                <option value={2}>2 images</option>
                <option value={3}>3 images</option>
                <option value={4}>4 images</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image Size</label>
              <select
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value as any)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              >
                <option value="1K">1K (1024px)</option>
                <option value="2K">2K (2048px)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aspect Ratio</label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as any)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              >
                <option value="1:1">Square (1:1)</option>
                <option value="16:9">Landscape (16:9)</option>
                <option value="9:16">Portrait (9:16)</option>
                <option value="4:3">Classic (4:3)</option>
                <option value="3:4">Vertical (3:4)</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-blue-700 bg-blue-100 p-2 rounded">
            💡 All Gemini Imagen images include SynthID watermark for authenticity
          </div>
        </div>
      )}

      {/* DALL-E 3 Settings */}
      {provider === 'openai-dalle' && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
            <select
              value={dalleSize}
              onChange={(e) => setDalleSize(e.target.value as any)}
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
      )}

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
        className={`w-full px-4 py-3 text-white font-medium rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
          provider === 'gemini-imagen'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            : 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700'
        }`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {provider === 'gemini-imagen'
              ? `Generating with Gemini Imagen 4.0 (${imagenModel.includes('ultra') ? 'Ultra' : imagenModel.includes('fast') ? 'Fast' : 'Standard'})...`
              : 'Generating with DALL-E 3...'
            }
          </span>
        ) : (
          `✨ Generate Image with ${provider === 'gemini-imagen' ? 'Gemini Imagen 4.0' : 'DALL-E 3'}`
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
              <h4 className="font-medium text-green-900">
                ✅ Image Generated with {generatedImage.provider === 'gemini-imagen' ? 'Gemini Imagen 4.0' : 'DALL-E 3'}!
              </h4>
              <button
                onClick={regenerate}
                className="text-sm text-green-700 hover:text-green-800 flex items-center gap-1"
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
              {generatedImage.provider === 'gemini-imagen' && (
                <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  SynthID ✓
                </div>
              )}
            </div>

            {/* Image Info */}
            <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm space-y-2">
              <div>
                <strong>Original Prompt:</strong>
                <p className="text-gray-600 mt-1">{prompt}</p>
              </div>
              {generatedImage.revisedPrompt && (
                <div>
                  <strong>Revised Prompt:</strong>
                  <p className="text-gray-600 mt-1">{generatedImage.revisedPrompt}</p>
                </div>
              )}
              {generatedImage.model && (
                <div className="flex items-center gap-2">
                  <strong>Model:</strong>
                  <span className="text-gray-600">{generatedImage.model}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Size: {generatedImage.media.dimensions.width}×{generatedImage.media.dimensions.height}</span>
                <span>File Size: {(generatedImage.media.size / 1024).toFixed(1)} KB</span>
              </div>
            </div>

            <div className={`mt-3 p-3 border rounded-md text-sm ${
              provider === 'gemini-imagen'
                ? 'bg-blue-50 border-blue-200 text-blue-800'
                : 'bg-green-50 border-green-200 text-green-800'
            }`}>
              ✅ Image saved to media library and ready to use!
              {provider === 'gemini-imagen' && ' (Includes SynthID watermark)'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIImageGenerator;
