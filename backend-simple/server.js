const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

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

// Start server
app.listen(PORT, async () => {
  await initData();
  console.log(`✅ Simple CMS Backend running on http://localhost:${PORT}`);
  console.log('📧 Admin login: admin@papsnet.com / admin123');
});