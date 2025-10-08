const { GoogleGenerativeAI } = require('@google/generative-ai');
const { PredictionServiceClient } = require('@google-cloud/aiplatform');
const { helpers } = require('@google-cloud/aiplatform');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Gemini API 키 (환경 변수에서 로드)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDitwc_1QE76t0c-O8yh4u0pAueZJGSPkc';

// Google Cloud 설정
const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

// Gemini 클라이언트 초기화
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Vertex AI 클라이언트 초기화 (Imagen 3용)
let predictionClient = null;
if (GOOGLE_CLOUD_PROJECT_ID) {
  const clientOptions = {
    apiEndpoint: `${GOOGLE_CLOUD_LOCATION}-aiplatform.googleapis.com`,
  };

  // 서비스 계정 키 파일이 있는 경우
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    clientOptions.keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  }

  try {
    predictionClient = new PredictionServiceClient(clientOptions);
    console.log('[Vertex AI] Prediction client initialized successfully');
  } catch (error) {
    console.warn('[Vertex AI] Failed to initialize prediction client:', error.message);
  }
}

/**
 * Gemini 텍스트 생성 서비스
 * @param {string} prompt - 생성할 텍스트의 프롬프트
 * @param {string} model - 사용할 모델 (기본값: gemini-2.0-flash-exp)
 * @returns {Promise<string>} 생성된 텍스트
 */
async function generateText(prompt, modelName = 'gemini-2.0-flash-exp') {
  try {
    console.log(`[Gemini Text] Generating with model: ${modelName}`);
    console.log(`[Gemini Text] Prompt: ${prompt.substring(0, 100)}...`);

    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

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
/**
 * Imagen 3 이미지 생성 (Vertex AI)
 */
async function generateImage(prompt, options = {}) {
  try {
    const {
      numberOfImages = 1,
      aspectRatio = '1:1',
      model = 'imagen-3.0-generate-001'
    } = options;

    console.log(`[Imagen 3] Generating image with Vertex AI`);
    console.log(`[Imagen 3] Prompt: ${prompt.substring(0, 100)}...`);
    console.log(`[Imagen 3] Options:`, { numberOfImages, aspectRatio, model });

    // Check if Vertex AI is configured
    if (!GOOGLE_CLOUD_PROJECT_ID) {
      throw new Error(
        'Google Cloud Project ID is not configured. ' +
        'Please set GOOGLE_CLOUD_PROJECT_ID environment variable.'
      );
    }

    if (!predictionClient) {
      throw new Error(
        'Vertex AI Prediction client is not initialized. ' +
        'Please check your Google Cloud credentials.'
      );
    }

    // Map aspect ratio to Imagen 3 format
    const aspectRatioMap = {
      '1:1': '1:1',
      '3:4': '3:4',
      '4:3': '4:3',
      '9:16': '9:16',
      '16:9': '16:9'
    };

    const imagenAspectRatio = aspectRatioMap[aspectRatio] || '1:1';

    // Prepare the request for Imagen 3
    const endpoint = `projects/${GOOGLE_CLOUD_PROJECT_ID}/locations/${GOOGLE_CLOUD_LOCATION}/publishers/google/models/${model}`;

    const parameters = helpers.toValue({
      sampleCount: numberOfImages,
      aspectRatio: imagenAspectRatio,
      safetySetting: 'block_some',
      personGeneration: 'allow_adult',
    });

    const instances = [
      helpers.toValue({
        prompt: prompt,
      }),
    ];

    const request = {
      endpoint,
      instances,
      parameters,
    };

    console.log(`[Imagen 3] Sending request to Vertex AI...`);
    const [response] = await predictionClient.predict(request);

    console.log(`[Imagen 3] Response received from Vertex AI`);

    // Extract generated images from response
    const predictions = response.predictions;
    if (!predictions || predictions.length === 0) {
      throw new Error('No images generated from Imagen 3');
    }

    const images = predictions.map((prediction, index) => {
      // Imagen 3 returns base64 encoded images
      const imageData = prediction.structValue.fields.bytesBase64Encoded.stringValue;

      return {
        index: index,
        data: imageData, // Base64 encoded image
        mimeType: 'image/png',
      };
    });

    console.log(`[Imagen 3] Generated ${images.length} image(s) successfully`);

    return images;
  } catch (error) {
    console.error('[Imagen 3] Error:', error.message);
    throw new Error(`Imagen 3 generation failed: ${error.message}`);
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
