const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
require('dotenv').config();

// Import services
const aiService = require('./services/aiService');
const mediaService = require('./services/mediaService');
const geminiService = require('./services/gemini.service');

const app = express();
const PORT = process.env.PORT || 8080;
const SECRET = process.env.JWT_SECRET || 'fallback-secret-only-for-dev';

// 프로덕션 환경에서 JWT_SECRET 체크
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  console.error('❌ FATAL ERROR: JWT_SECRET must be set in production!');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // 이미지 업로드를 위한 크기 제한 증가
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded media

// Multer configuration for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/quicktime'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
  }
});

// Simple file-based storage
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file
async function initData() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    const initialData = {
      admin: {
        email: 'admin@papsnet.com',
        // password: 'admin123'
        passwordHash: '$2a$10$I7RKWIAGMoH2RhQEAYDv7uWujVbpOJx3UNrSgawWSmq..brfLmmta'
      },
      hero: {
        title: 'PLM 솔루션의 새로운 기준',
        subtitle: '제조 혁신을 위한 디지털 전환의 첫걸음',
        ctaText: '무료 체험 시작',
        ctaLink: '/demo',
        imageUrl: '/images/hero-bg.jpg'
      },
      sections: [
        {
          id: 'about',
          title: '회사 소개',
          content: 'PAPSNET은 제조업 디지털 혁신을 선도하는 PLM 전문 기업입니다.',
          isPublished: true
        }
      ]
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Load data
async function loadData() {
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

// Save data
async function saveData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Auth middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ===== ROOT ENDPOINT =====

// Root endpoint - return API info
app.get('/', (req, res) => {
  res.json({
    name: 'PAPSNET Simple CMS API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      public: ['/api/public/hero', '/api/public/sections'],
      admin: ['/api/admin/login', '/api/admin/hero', '/api/admin/sections']
    }
  });
});

// Handle Chrome DevTools requests (prevent 404 errors)
app.get('/.well-known/*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Handle favicon request
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No content
});

// ===== AUTH ENDPOINTS =====

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loadData();

    if (email !== data.admin.email) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, data.admin.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email, admin: true }, SECRET, { expiresIn: '7d' });
    res.json({ token, user: { email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== PUBLIC ENDPOINTS =====

// Get hero content (public)
app.get('/api/public/hero', async (req, res) => {
  try {
    const data = await loadData();
    res.json(data.hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sections (public)
app.get('/api/public/sections', async (req, res) => {
  try {
    const data = await loadData();
    const published = data.sections.filter(s => s.isPublished);
    res.json(published);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ADMIN ENDPOINTS =====

// Get hero content (admin)
app.get('/api/admin/hero', authenticate, async (req, res) => {
  try {
    const data = await loadData();
    res.json(data.hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update hero content
app.put('/api/admin/hero', authenticate, async (req, res) => {
  try {
    const data = await loadData();
    data.hero = { ...data.hero, ...req.body };
    await saveData(data);
    res.json({ success: true, data: data.hero });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all sections (admin)
app.get('/api/admin/sections', authenticate, async (req, res) => {
  try {
    const data = await loadData();
    res.json(data.sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update sections
app.put('/api/admin/sections', authenticate, async (req, res) => {
  try {
    const data = await loadData();
    data.sections = req.body;
    await saveData(data);
    res.json({ success: true, data: data.sections });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new section
app.post('/api/admin/sections', authenticate, async (req, res) => {
  try {
    const data = await loadData();
    const newSection = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    data.sections.push(newSection);
    await saveData(data);
    res.json({ success: true, data: newSection });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete section
app.delete('/api/admin/sections/:id', authenticate, async (req, res) => {
  try {
    const data = await loadData();
    data.sections = data.sections.filter(s => s.id !== req.params.id);
    await saveData(data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ALL SECTIONS ENDPOINTS (for full page editing) =====

// Get all sections (admin)
app.get('/api/admin/all-sections', authenticate, async (req, res) => {
  try {
    const data = await loadData();
    res.json(data.allSections || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update all sections
app.put('/api/admin/all-sections', authenticate, async (req, res) => {
  try {
    const data = await loadData();
    data.allSections = req.body;
    await saveData(data);
    res.json({ success: true, data: data.allSections });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all sections (public) - only published
app.get('/api/public/all-sections', async (req, res) => {
  try {
    const data = await loadData();
    const published = (data.allSections || []).filter(s => s.isPublished);
    res.json(published);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== AI ENDPOINTS =====

// Initialize AI clients with API keys
app.post('/api/admin/ai/config', authenticate, async (req, res) => {
  try {
    const { openaiApiKey, anthropicApiKey, geminiApiKey } = req.body;

    const data = await loadData();
    data.aiConfig = {
      openaiApiKey: openaiApiKey || data.aiConfig?.openaiApiKey,
      anthropicApiKey: anthropicApiKey || data.aiConfig?.anthropicApiKey,
      geminiApiKey: geminiApiKey || data.aiConfig?.geminiApiKey,
      updatedAt: new Date().toISOString()
    };

    await saveData(data);

    // Initialize AI clients
    aiService.initializeClients(data.aiConfig);

    res.json({ success: true, message: 'AI configuration updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get AI configuration status (without exposing keys)
app.get('/api/admin/ai/config', authenticate, async (req, res) => {
  try {
    const data = await loadData();
    const config = data.aiConfig || {};

    res.json({
      hasOpenAI: !!config.openaiApiKey,
      hasClaude: !!config.anthropicApiKey,
      hasGemini: !!config.geminiApiKey,
      updatedAt: config.updatedAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate text content with AI
app.post('/api/admin/ai/generate-text', authenticate, async (req, res) => {
  try {
    const { provider, prompt, sectionType, options } = req.body;

    if (!provider || !prompt) {
      return res.status(400).json({ error: 'Provider and prompt are required' });
    }

    // Load AI config and initialize if needed
    const data = await loadData();
    if (data.aiConfig) {
      aiService.initializeClients(data.aiConfig);
    }

    let result;
    if (sectionType) {
      result = await aiService.generateSectionContent(provider, sectionType, prompt, options);
    } else {
      result = await aiService.generateText(provider, prompt, options);
    }

    res.json(result);
  } catch (error) {
    console.error('[AI] Text generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generate image with AI
app.post('/api/admin/ai/generate-image', authenticate, async (req, res) => {
  try {
    const { provider, prompt, options } = req.body;

    if (!provider || !prompt) {
      return res.status(400).json({ error: 'Provider and prompt are required' });
    }

    // Load AI config and initialize if needed
    const data = await loadData();
    if (data.aiConfig) {
      aiService.initializeClients(data.aiConfig);
    }

    // Generate image
    const result = await aiService.generateImage(provider, prompt, options);

    // Download and save image locally
    const mediaInfo = await mediaService.downloadAIImage(result.url, {
      provider: result.provider,
      prompt: prompt,
      revisedPrompt: result.revisedPrompt,
      timestamp: new Date().toISOString()
    });

    res.json({
      ...result,
      media: mediaInfo
    });
  } catch (error) {
    console.error('[AI] Image generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ===== MEDIA ENDPOINTS =====

// Upload media file
app.post('/api/admin/media/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let mediaInfo;
    const fileType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';

    if (fileType === 'image') {
      mediaInfo = await mediaService.processImage(req.file, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 85,
        format: 'webp'
      });
    } else if (fileType === 'video') {
      mediaInfo = await mediaService.processVideo(req.file);
    }

    res.json({ success: true, media: mediaInfo });
  } catch (error) {
    console.error('[Media] Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// List all media files
app.get('/api/admin/media', authenticate, async (req, res) => {
  try {
    const mediaList = await mediaService.listMedia();
    res.json(mediaList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete media file
app.delete('/api/admin/media/:filename', authenticate, async (req, res) => {
  try {
    await mediaService.deleteMedia(req.params.filename);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== GEMINI API ENDPOINTS =====

// Generate text with Gemini
app.post('/api/admin/gemini/generate-text', authenticate, async (req, res) => {
  try {
    const { prompt, model } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const text = await geminiService.generateText(prompt, model);

    res.json({
      success: true,
      provider: 'gemini',
      model: model || 'gemini-2.0-flash-exp',
      text: text
    });
  } catch (error) {
    console.error('[Gemini] Text generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generate image with Gemini Imagen 4.0
app.post('/api/admin/gemini/generate-image', authenticate, async (req, res) => {
  try {
    const { prompt, numberOfImages, imageSize, aspectRatio, model } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const options = {
      numberOfImages: numberOfImages || 1,
      imageSize: imageSize || '1K',
      aspectRatio: aspectRatio || '1:1',
      model: model || 'imagen-4.0-generate-001'
    };

    const images = await geminiService.generateImage(prompt, options);

    // Save first image to uploads directory
    const uploadDir = path.join(__dirname, 'uploads');
    const filename = `gemini_${Date.now()}.png`;
    const savedPath = await geminiService.saveImageToFile(
      images[0].data,
      filename,
      uploadDir
    );

    // Optimize with media service
    const mediaInfo = await mediaService.processImageFile(savedPath, {
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 85,
      format: 'webp'
    });

    res.json({
      success: true,
      provider: 'gemini-imagen',
      model: options.model,
      prompt: prompt,
      images: images.length,
      media: mediaInfo
    });
  } catch (error) {
    console.error('[Gemini] Image generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generate video with Gemini Veo 3.0
app.post('/api/admin/gemini/generate-video', authenticate, async (req, res) => {
  try {
    const { prompt, aspectRatio, resolution, negativePrompt, model } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const options = {
      aspectRatio: aspectRatio || '16:9',
      resolution: resolution || '720p',
      negativePrompt: negativePrompt || '',
      model: model || 'veo-3.0-generate-001'
    };

    const result = await geminiService.generateVideo(prompt, options);

    res.json({
      success: true,
      provider: 'gemini-veo',
      model: options.model,
      prompt: prompt,
      operationId: result.operationId,
      status: result.status,
      message: result.message
    });
  } catch (error) {
    console.error('[Gemini] Video generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Check Gemini video generation status
app.get('/api/admin/gemini/video-status/:operationId', authenticate, async (req, res) => {
  try {
    const { operationId } = req.params;

    const result = await geminiService.checkVideoStatus(operationId);

    if (result.status === 'completed') {
      // Save video to uploads directory
      const uploadDir = path.join(__dirname, 'uploads');
      const filename = `gemini_video_${Date.now()}.mp4`;
      const savedPath = await geminiService.saveVideoToFile(
        result.video.data,
        filename,
        uploadDir
      );

      res.json({
        success: true,
        status: 'completed',
        videoUrl: `/uploads/${filename}`,
        videoPath: savedPath
      });
    } else {
      res.json({
        success: true,
        status: result.status,
        message: result.message
      });
    }
  } catch (error) {
    console.error('[Gemini] Video status check error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, async () => {
  await initData();

  // Initialize AI clients from environment variables
  try {
    const envConfig = {
      openaiApiKey: process.env.OPENAI_API_KEY,
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
      geminiApiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
    };

    // Initialize AI services if any API key is present
    if (envConfig.openaiApiKey || envConfig.anthropicApiKey || envConfig.geminiApiKey) {
      aiService.initializeClients(envConfig);
      console.log('🤖 AI services initialized from environment variables');

      if (envConfig.geminiApiKey) {
        console.log('✨ Gemini API initialized (Text, Imagen 4.0, Veo 3.0)');
      }
    } else {
      // Try loading from data.json as fallback
      const data = await loadData();
      if (data.aiConfig) {
        aiService.initializeClients(data.aiConfig);
        console.log('🤖 AI services initialized from data.json');
      } else {
        console.log('⚠️  AI services not configured - no API keys found');
      }
    }
  } catch (error) {
    console.log('⚠️  AI services initialization error:', error.message);
  }

  console.log(`✅ Simple CMS Backend running on http://localhost:${PORT}`);
  console.log('📧 Admin login: admin@papsnet.com / admin123');
  console.log('🔥 Gemini API endpoints:');
  console.log('   POST /api/admin/gemini/generate-text');
  console.log('   POST /api/admin/gemini/generate-image (Imagen 4.0)');
  console.log('   POST /api/admin/gemini/generate-video (Veo 3.0)');
  console.log('   GET  /api/admin/gemini/video-status/:operationId');
});