const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// In-memory content storage
let contentData = [
  { id: 1, contentKey: 'hero.title', contentValue: 'Welcome to PAPSNET', contentType: 'text', description: 'Hero section title', isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, contentKey: 'hero.subtitle', contentValue: 'Leading PLM Solutions Provider', contentType: 'text', description: 'Hero section subtitle', isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, contentKey: 'hero.description', contentValue: 'We provide comprehensive PLM solutions for automotive, semiconductor, and medical device industries', contentType: 'text', description: 'Hero section description', isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, contentKey: 'about.title', contentValue: 'About PAPSNET', contentType: 'text', description: 'About section title', isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 5, contentKey: 'about.description', contentValue: 'PAPSNET provides enterprise PLM solutions with over 20 years of expertise', contentType: 'text', description: 'About section description', isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 6, contentKey: 'feature.title', contentValue: 'Our Features', contentType: 'text', description: 'Features section title', isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 7, contentKey: 'feature.description', contentValue: 'Discover our comprehensive feature set', contentType: 'text', description: 'Features section description', isActive: true, createdAt: new Date(), updatedAt: new Date() }
];

let nextId = 8;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP',
    timestamp: new Date(),
    service: 'PAPSNET Simple Node.js Backend'
  });
});

// Homepage content endpoint (new v1 format)
app.get('/api/v1/content/homepage', (req, res) => {
  console.log('GET /api/v1/content/homepage - Fetching homepage content');

  res.json({
    success: true,
    data: contentData.filter(c => c.isPublished !== false),
    timestamp: new Date().toISOString()
  });
});

// Public content endpoints
app.get('/api/public/content', (req, res) => {
  console.log('GET /api/public/content - Fetching all public content');
  res.json({
    success: true,
    data: contentData,
    timestamp: new Date()
  });
});

app.get('/api/public/content/:key', (req, res) => {
  const { key } = req.params;
  console.log(`GET /api/public/content/${key} - Fetching content by key`);
  const content = contentData.find(c => c.contentKey === key);

  if (content) {
    res.json({
      success: true,
      data: content,
      timestamp: new Date()
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Content not found',
      timestamp: new Date()
    });
  }
});

// Admin content CRUD endpoints
app.get('/api/admin/content', (req, res) => {
  console.log('GET /api/admin/content - Admin fetching all content');
  res.json({
    success: true,
    data: contentData,
    timestamp: new Date()
  });
});

app.get('/api/admin/content/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`GET /api/admin/content/${id} - Admin fetching content by id`);
  const content = contentData.find(c => c.id === id);

  if (content) {
    res.json({
      success: true,
      data: content,
      timestamp: new Date()
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Content not found',
      timestamp: new Date()
    });
  }
});

app.post('/api/admin/content', (req, res) => {
  console.log('POST /api/admin/content - Creating new content');
  const newContent = {
    id: nextId++,
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  contentData.push(newContent);

  res.status(201).json({
    success: true,
    data: newContent,
    timestamp: new Date()
  });
});

app.put('/api/admin/content/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`PUT /api/admin/content/${id} - Updating content`);
  const index = contentData.findIndex(c => c.id === id);

  if (index !== -1) {
    contentData[index] = {
      ...contentData[index],
      ...req.body,
      id: id, // Preserve the original ID
      updatedAt: new Date()
    };

    res.json({
      success: true,
      data: contentData[index],
      timestamp: new Date()
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Content not found',
      timestamp: new Date()
    });
  }
});

app.delete('/api/admin/content/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`DELETE /api/admin/content/${id} - Deleting content`);
  const index = contentData.findIndex(c => c.id === id);

  if (index !== -1) {
    contentData.splice(index, 1);
    res.json({
      success: true,
      data: 'Content deleted successfully',
      timestamp: new Date()
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Content not found',
      timestamp: new Date()
    });
  }
});

// Simple authentication endpoint
app.post('/api/admin/auth/login', (req, res) => {
  const { email, password } = req.body;
  console.log(`POST /api/admin/auth/login - Login attempt for: ${email}`);

  if (email === 'admin@papsnet.net' && password === 'admin123') {
    res.json({
      success: true,
      data: {
        accessToken: 'test-token-' + Date.now(),
        refreshToken: 'refresh-token-' + Date.now(),
        tokenType: 'Bearer',
        expiresIn: 900,
        user: {
          id: '1',
          email: 'admin@papsnet.net',
          firstName: 'Admin',
          lastName: 'User',
          role: 'SUPER_ADMIN'
        }
      },
      timestamp: new Date()
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid credentials',
      timestamp: new Date()
    });
  }
});

// Logout endpoint
app.post('/api/admin/auth/logout', (req, res) => {
  console.log('POST /api/admin/auth/logout - User logging out');
  res.json({
    success: true,
    data: 'Logged out successfully',
    timestamp: new Date()
  });
});

// Admin navigation endpoint
app.get('/api/admin/navigation', (req, res) => {
  console.log('GET /api/admin/navigation - Fetching admin navigation');
  res.json({
    success: true,
    data: [
      { id: 1, title: 'Dashboard', path: '/admin', icon: 'dashboard' },
      { id: 2, title: 'Content Management', path: '/admin/content', icon: 'edit' },
      { id: 3, title: 'Media Library', path: '/admin/media', icon: 'image' },
      { id: 4, title: 'Users', path: '/admin/users', icon: 'users' },
      { id: 5, title: 'Settings', path: '/admin/settings', icon: 'settings' }
    ],
    timestamp: new Date()
  });
});

// Admin page-content endpoint (for content management page)
app.get('/api/admin/page-content', (req, res) => {
  const { sectionIdentifier, languageCode, page = 0, size = 10 } = req.query;
  console.log('GET /api/admin/page-content - Query:', { sectionIdentifier, languageCode, page, size });

  // Filter content based on sectionIdentifier if provided
  let filteredContent = contentData;
  if (sectionIdentifier) {
    filteredContent = contentData.filter(c => c.contentKey && c.contentKey.startsWith(sectionIdentifier.replace('home-', '') + '.'));
  }

  // Pagination
  const startIndex = parseInt(page) * parseInt(size);
  const endIndex = startIndex + parseInt(size);
  const paginatedContent = filteredContent.slice(startIndex, endIndex);

  res.json({
    success: true,
    data: {
      content: paginatedContent,
      totalElements: filteredContent.length,
      totalPages: Math.ceil(filteredContent.length / parseInt(size)),
      page: parseInt(page),
      size: parseInt(size)
    },
    timestamp: new Date()
  });
});

// Admin page-content CRUD endpoints
app.post('/api/admin/page-content', (req, res) => {
  console.log('POST /api/admin/page-content - Creating new page content');
  const newContent = {
    id: nextId++,
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  contentData.push(newContent);

  res.status(201).json({
    success: true,
    data: newContent,
    timestamp: new Date()
  });
});

app.put('/api/admin/page-content/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`PUT /api/admin/page-content/${id} - Updating page content`);
  console.log('Request body:', req.body);
  const index = contentData.findIndex(c => c.id === id);

  if (index !== -1) {
    const updatedContent = {
      ...contentData[index],
      ...req.body,
      id: id, // Preserve the original ID
      updatedAt: new Date()
    };
    contentData[index] = updatedContent;

    console.log(`Successfully updated content ID ${id}:`, updatedContent);

    res.json({
      success: true,
      data: updatedContent,
      message: 'Content updated successfully',
      timestamp: new Date()
    });
  } else {
    console.log(`Content ID ${id} not found`);
    res.status(404).json({
      success: false,
      error: 'Content not found',
      timestamp: new Date()
    });
  }
});

app.delete('/api/admin/page-content/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`DELETE /api/admin/page-content/${id} - Deleting page content`);
  const index = contentData.findIndex(c => c.id === id);

  if (index !== -1) {
    contentData.splice(index, 1);
    res.json({
      success: true,
      data: 'Content deleted successfully',
      timestamp: new Date()
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Content not found',
      timestamp: new Date()
    });
  }
});

// Toggle publish status endpoint
app.patch('/api/admin/page-content/:id/publish', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`PATCH /api/admin/page-content/${id}/publish - Toggling publish status`);
  const content = contentData.find(c => c.id === id);

  if (content) {
    // Toggle the isActive status
    content.isActive = !content.isActive;
    content.updatedAt = new Date();

    res.json({
      success: true,
      data: content,
      timestamp: new Date()
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Content not found',
      timestamp: new Date()
    });
  }
});

// Toggle publish status for content (using contentKey)
app.patch('/api/admin/content/:id/publish', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`PATCH /api/admin/content/${id}/publish - Toggling publish status`);
  const content = contentData.find(c => c.id === id);

  if (content) {
    // Toggle the isActive status
    content.isActive = !content.isActive;
    content.updatedAt = new Date();

    res.json({
      success: true,
      data: content,
      timestamp: new Date()
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Content not found',
      timestamp: new Date()
    });
  }
});

// Reorder content endpoint
app.post('/api/admin/page-content/reorder', (req, res) => {
  const { sectionIdentifier, orderedIds } = req.body;
  console.log('POST /api/admin/page-content/reorder - Reordering content:', { sectionIdentifier, orderedIds });

  // Update display order based on orderedIds array
  if (orderedIds && Array.isArray(orderedIds)) {
    orderedIds.forEach((id, index) => {
      const item = contentData.find(c => c.id === id);
      if (item) {
        item.displayOrder = index;
      }
    });
  }

  res.json({
    success: true,
    message: 'Content reordered successfully'
  });
});

// Start the server
app.listen(port, () => {
  console.log('====================================================');
  console.log(`PAPSNET Backend Started on http://localhost:${port}/api`);
  console.log('Admin Login: admin@papsnet.net / admin123');
  console.log('====================================================');
});