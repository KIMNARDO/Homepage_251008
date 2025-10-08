const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

class MediaService {
  constructor() {
    this.uploadDir = path.join(__dirname, '../uploads');
    this.thumbnailDir = path.join(__dirname, '../uploads/thumbnails');
    this.ensureDirectories();
  }

  /**
   * Ensure upload directories exist
   */
  async ensureDirectories() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
      await fs.mkdir(this.thumbnailDir, { recursive: true });
    } catch (error) {
      console.error('[MediaService] Error creating directories:', error);
    }
  }

  /**
   * Process uploaded image
   */
  async processImage(file, options = {}) {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 85,
      format = 'webp'
    } = options;

    try {
      const fileId = uuidv4();
      const ext = format === 'original' ? path.extname(file.originalname) : `.${format}`;
      const filename = `${fileId}${ext}`;
      const filepath = path.join(this.uploadDir, filename);

      // Process and optimize image
      let imageProcessor = sharp(file.buffer);

      // Get metadata
      const metadata = await imageProcessor.metadata();

      // Resize if needed
      if (metadata.width > maxWidth || metadata.height > maxHeight) {
        imageProcessor = imageProcessor.resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      // Convert format if specified
      if (format === 'webp') {
        imageProcessor = imageProcessor.webp({ quality });
      } else if (format === 'jpeg' || format === 'jpg') {
        imageProcessor = imageProcessor.jpeg({ quality });
      } else if (format === 'png') {
        imageProcessor = imageProcessor.png({ quality });
      }

      // Save optimized image
      await imageProcessor.toFile(filepath);

      // Generate thumbnail
      const thumbnailFilename = `thumb_${filename}`;
      const thumbnailPath = path.join(this.thumbnailDir, thumbnailFilename);

      await sharp(file.buffer)
        .resize(400, 300, { fit: 'cover' })
        .webp({ quality: 70 })
        .toFile(thumbnailPath);

      // Get file stats
      const stats = await fs.stat(filepath);
      const updatedMetadata = await sharp(filepath).metadata();

      return {
        id: fileId,
        type: 'image',
        filename,
        url: `/uploads/${filename}`,
        thumbnail: `/uploads/thumbnails/${thumbnailFilename}`,
        size: stats.size,
        mimeType: `image/${format}`,
        dimensions: {
          width: updatedMetadata.width,
          height: updatedMetadata.height
        },
        originalName: file.originalname,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('[MediaService] Error processing image:', error);
      throw error;
    }
  }

  /**
   * Process uploaded video
   */
  async processVideo(file) {
    try {
      const fileId = uuidv4();
      const ext = path.extname(file.originalname);
      const filename = `${fileId}${ext}`;
      const filepath = path.join(this.uploadDir, filename);

      // Save video file
      await fs.writeFile(filepath, file.buffer);

      // Generate video thumbnail (first frame)
      // Note: This requires ffmpeg installed on the system
      // For now, we'll use a placeholder or skip thumbnail generation

      const stats = await fs.stat(filepath);

      return {
        id: fileId,
        type: 'video',
        filename,
        url: `/uploads/${filename}`,
        thumbnail: `/uploads/video-placeholder.png`, // Placeholder
        size: stats.size,
        mimeType: file.mimetype,
        originalName: file.originalname,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('[MediaService] Error processing video:', error);
      throw error;
    }
  }

  /**
   * Download image from AI generation URL and save locally
   */
  async downloadAIImage(url, metadata = {}) {
    try {
      const axios = require('axios');
      const response = await axios.get(url, { responseType: 'arraybuffer' });

      const fileId = uuidv4();
      const filename = `ai_${fileId}.png`;
      const filepath = path.join(this.uploadDir, filename);

      // Save original AI image
      await fs.writeFile(filepath, response.data);

      // Optimize and create webp version
      const webpFilename = `ai_${fileId}.webp`;
      const webpPath = path.join(this.uploadDir, webpFilename);

      await sharp(response.data)
        .webp({ quality: 90 })
        .toFile(webpPath);

      // Generate thumbnail
      const thumbnailFilename = `thumb_ai_${fileId}.webp`;
      const thumbnailPath = path.join(this.thumbnailDir, thumbnailFilename);

      await sharp(response.data)
        .resize(400, 300, { fit: 'cover' })
        .webp({ quality: 70 })
        .toFile(thumbnailPath);

      const stats = await fs.stat(webpPath);
      const imageMetadata = await sharp(webpPath).metadata();

      return {
        id: fileId,
        type: 'image',
        filename: webpFilename,
        url: `/uploads/${webpFilename}`,
        thumbnail: `/uploads/thumbnails/${thumbnailFilename}`,
        size: stats.size,
        mimeType: 'image/webp',
        dimensions: {
          width: imageMetadata.width,
          height: imageMetadata.height
        },
        aiGenerated: metadata,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('[MediaService] Error downloading AI image:', error);
      throw error;
    }
  }

  /**
   * Delete media file
   */
  async deleteMedia(filename) {
    try {
      const filepath = path.join(this.uploadDir, filename);
      const thumbnailFilename = filename.startsWith('thumb_') ? filename : `thumb_${filename}`;
      const thumbnailPath = path.join(this.thumbnailDir, thumbnailFilename);

      // Delete main file
      try {
        await fs.unlink(filepath);
      } catch (error) {
        console.warn('[MediaService] Main file not found:', filepath);
      }

      // Delete thumbnail
      try {
        await fs.unlink(thumbnailPath);
      } catch (error) {
        console.warn('[MediaService] Thumbnail not found:', thumbnailPath);
      }

      return { success: true };
    } catch (error) {
      console.error('[MediaService] Error deleting media:', error);
      throw error;
    }
  }

  /**
   * Get media file info
   */
  async getMediaInfo(filename) {
    try {
      const filepath = path.join(this.uploadDir, filename);
      const stats = await fs.stat(filepath);

      const ext = path.extname(filename).toLowerCase();
      const isImage = ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);

      let dimensions = null;
      if (isImage) {
        const metadata = await sharp(filepath).metadata();
        dimensions = { width: metadata.width, height: metadata.height };
      }

      return {
        filename,
        size: stats.size,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
        dimensions,
        type: isImage ? 'image' : 'video'
      };
    } catch (error) {
      console.error('[MediaService] Error getting media info:', error);
      throw error;
    }
  }

  /**
   * List all media files
   */
  async listMedia() {
    try {
      const files = await fs.readdir(this.uploadDir);

      const mediaList = await Promise.all(
        files
          .filter(file => !file.startsWith('.'))
          .map(async (file) => {
            try {
              const info = await this.getMediaInfo(file);
              return {
                ...info,
                url: `/uploads/${file}`,
                thumbnail: `/uploads/thumbnails/thumb_${file}`
              };
            } catch (error) {
              return null;
            }
          })
      );

      return mediaList.filter(item => item !== null);
    } catch (error) {
      console.error('[MediaService] Error listing media:', error);
      throw error;
    }
  }
}

module.exports = new MediaService();
