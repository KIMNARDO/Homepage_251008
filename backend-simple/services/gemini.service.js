const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

// Gemini API 키 (환경 변수에서 로드)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDitwc_1QE76t0c-O8yh4u0pAueZJGSPkc';

// Gemini 클라이언트 초기화
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/**
 * Gemini 텍스트 생성 서비스
 * @param {string} prompt - 생성할 텍스트의 프롬프트
 * @param {string} model - 사용할 모델 (기본값: gemini-2.0-flash-exp)
 * @returns {Promise<string>} 생성된 텍스트
 */
async function generateText(prompt, model = 'gemini-2.0-flash-exp') {
  try {
    console.log(`[Gemini Text] Generating with model: ${model}`);
    console.log(`[Gemini Text] Prompt: ${prompt.substring(0, 100)}...`);

    const response = await genAI.models.generateContent({
      model: model,
      contents: prompt,
    });

    const generatedText = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No text generated from Gemini API');
    }

    console.log(`[Gemini Text] Generated: ${generatedText.substring(0, 100)}...`);
    return generatedText;
  } catch (error) {
    console.error('[Gemini Text] Error:', error.message);
    throw new Error(`Gemini text generation failed: ${error.message}`);
  }
}

/**
 * Gemini Imagen 4.0 이미지 생성 서비스
 * @param {string} prompt - 이미지 생성 프롬프트
 * @param {Object} options - 이미지 생성 옵션
 * @param {number} options.numberOfImages - 생성할 이미지 수 (1-4, 기본값: 1)
 * @param {string} options.imageSize - 이미지 크기 ('1K' 또는 '2K', 기본값: '1K')
 * @param {string} options.aspectRatio - 종횡비 ('1:1', '3:4', '4:3', '9:16', '16:9', 기본값: '1:1')
 * @param {string} options.model - 사용할 모델 (기본값: imagen-4.0-generate-001)
 * @returns {Promise<Array>} 생성된 이미지 배열
 */
async function generateImage(prompt, options = {}) {
  try {
    const {
      numberOfImages = 1,
      imageSize = '1K',
      aspectRatio = '1:1',
      model = 'imagen-4.0-generate-001'
    } = options;

    console.log(`[Gemini Imagen] Generating ${numberOfImages} image(s) with model: ${model}`);
    console.log(`[Gemini Imagen] Prompt: ${prompt.substring(0, 100)}...`);
    console.log(`[Gemini Imagen] Options:`, { numberOfImages, imageSize, aspectRatio });

    const response = await genAI.models.generateImages({
      model: model,
      prompt: prompt,
      config: {
        numberOfImages: numberOfImages,
        imageSize: imageSize,
        aspectRatio: aspectRatio,
      },
    });

    if (!response.generated_images || response.generated_images.length === 0) {
      throw new Error('No images generated from Gemini Imagen API');
    }

    console.log(`[Gemini Imagen] Generated ${response.generated_images.length} image(s)`);

    // 이미지를 Base64로 변환하여 반환
    const images = response.generated_images.map((img, index) => ({
      index: index,
      data: img.image, // 이미지 데이터 (Base64 또는 Buffer)
      mimeType: img.mimeType || 'image/png',
    }));

    return images;
  } catch (error) {
    console.error('[Gemini Imagen] Error:', error.message);
    throw new Error(`Gemini image generation failed: ${error.message}`);
  }
}

/**
 * Gemini Veo 3.0 비디오 생성 서비스
 * @param {string} prompt - 비디오 생성 프롬프트
 * @param {Object} options - 비디오 생성 옵션
 * @param {string} options.aspectRatio - 종횡비 ('16:9' 또는 '9:16', 기본값: '16:9')
 * @param {string} options.resolution - 해상도 ('720p' 또는 '1080p', 기본값: '720p')
 * @param {string} options.negativePrompt - 제외할 요소
 * @param {string} options.model - 사용할 모델 (기본값: veo-3.0-generate-001)
 * @returns {Promise<Object>} 비디오 생성 작업 정보
 */
async function generateVideo(prompt, options = {}) {
  try {
    const {
      aspectRatio = '16:9',
      resolution = '720p',
      negativePrompt = '',
      model = 'veo-3.0-generate-001'
    } = options;

    console.log(`[Gemini Veo] Generating video with model: ${model}`);
    console.log(`[Gemini Veo] Prompt: ${prompt.substring(0, 100)}...`);
    console.log(`[Gemini Veo] Options:`, { aspectRatio, resolution });

    // Veo 3.0은 long-running operation을 사용
    const operation = await genAI.models.generateVideos({
      model: model,
      prompt: prompt,
      config: {
        aspectRatio: aspectRatio,
        resolution: resolution,
        negativePrompt: negativePrompt,
      },
    });

    console.log(`[Gemini Veo] Video generation started. Operation ID: ${operation.name}`);

    return {
      operationId: operation.name,
      status: 'processing',
      message: 'Video generation started. Use checkVideoStatus to poll for completion.',
    };
  } catch (error) {
    console.error('[Gemini Veo] Error:', error.message);
    throw new Error(`Gemini video generation failed: ${error.message}`);
  }
}

/**
 * Veo 3.0 비디오 생성 상태 확인
 * @param {string} operationId - 작업 ID
 * @returns {Promise<Object>} 작업 상태 및 비디오 정보
 */
async function checkVideoStatus(operationId) {
  try {
    console.log(`[Gemini Veo] Checking status for operation: ${operationId}`);

    const operation = await genAI.operations.get(operationId);

    if (operation.done) {
      console.log(`[Gemini Veo] Video generation completed`);

      const generatedVideo = operation.response.generated_videos[0];

      return {
        status: 'completed',
        video: {
          data: generatedVideo.video,
          mimeType: generatedVideo.mimeType || 'video/mp4',
        },
      };
    } else {
      console.log(`[Gemini Veo] Video generation in progress...`);

      return {
        status: 'processing',
        message: 'Video generation in progress. Please check again later.',
      };
    }
  } catch (error) {
    console.error('[Gemini Veo] Status check error:', error.message);
    throw new Error(`Failed to check video status: ${error.message}`);
  }
}

/**
 * 이미지를 파일로 저장
 * @param {Buffer|String} imageData - 이미지 데이터 (Base64 또는 Buffer)
 * @param {string} filename - 저장할 파일명
 * @param {string} uploadDir - 업로드 디렉토리 경로
 * @returns {Promise<string>} 저장된 파일 경로
 */
async function saveImageToFile(imageData, filename, uploadDir) {
  try {
    // uploads 디렉토리가 없으면 생성
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);

    // Buffer 또는 Base64 문자열 처리
    let buffer;
    if (Buffer.isBuffer(imageData)) {
      buffer = imageData;
    } else if (typeof imageData === 'string') {
      // Base64 문자열인 경우
      buffer = Buffer.from(imageData, 'base64');
    } else {
      throw new Error('Invalid image data format');
    }

    await fs.promises.writeFile(filePath, buffer);
    console.log(`[Gemini] Image saved to: ${filePath}`);

    return filePath;
  } catch (error) {
    console.error('[Gemini] Error saving image:', error.message);
    throw new Error(`Failed to save image: ${error.message}`);
  }
}

/**
 * 비디오를 파일로 저장
 * @param {Buffer|String} videoData - 비디오 데이터
 * @param {string} filename - 저장할 파일명
 * @param {string} uploadDir - 업로드 디렉토리 경로
 * @returns {Promise<string>} 저장된 파일 경로
 */
async function saveVideoToFile(videoData, filename, uploadDir) {
  try {
    // uploads 디렉토리가 없으면 생성
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);

    // Buffer 또는 Base64 문자열 처리
    let buffer;
    if (Buffer.isBuffer(videoData)) {
      buffer = videoData;
    } else if (typeof videoData === 'string') {
      buffer = Buffer.from(videoData, 'base64');
    } else {
      throw new Error('Invalid video data format');
    }

    await fs.promises.writeFile(filePath, buffer);
    console.log(`[Gemini] Video saved to: ${filePath}`);

    return filePath;
  } catch (error) {
    console.error('[Gemini] Error saving video:', error.message);
    throw new Error(`Failed to save video: ${error.message}`);
  }
}

module.exports = {
  generateText,
  generateImage,
  generateVideo,
  checkVideoStatus,
  saveImageToFile,
  saveVideoToFile,
};
