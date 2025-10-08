const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
  constructor() {
    this.openaiClient = null;
    this.anthropicClient = null;
    this.geminiClient = null;
  }

  /**
   * Initialize AI clients with API keys
   */
  initializeClients(config) {
    if (config.openaiApiKey) {
      this.openaiClient = new OpenAI({ apiKey: config.openaiApiKey });
    }
    if (config.anthropicApiKey) {
      this.anthropicClient = new Anthropic({ apiKey: config.anthropicApiKey });
    }
    if (config.geminiApiKey) {
      this.geminiClient = new GoogleGenerativeAI(config.geminiApiKey);
    }
  }

  /**
   * Generate text content using selected AI provider
   */
  async generateText(provider, prompt, options = {}) {
    const {
      maxTokens = 1000,
      temperature = 0.7,
      model = null
    } = options;

    try {
      switch (provider) {
        case 'openai':
          return await this.generateWithOpenAI(prompt, { maxTokens, temperature, model: model || 'gpt-4' });

        case 'claude':
          return await this.generateWithClaude(prompt, { maxTokens, temperature, model: model || 'claude-3-5-sonnet-20241022' });

        case 'gemini':
          return await this.generateWithGemini(prompt, { maxTokens, temperature, model: model || 'gemini-pro' });

        default:
          throw new Error(`Unsupported AI provider: ${provider}`);
      }
    } catch (error) {
      console.error(`[AIService] Error generating text with ${provider}:`, error);
      throw error;
    }
  }

  /**
   * Generate text using OpenAI GPT
   */
  async generateWithOpenAI(prompt, options) {
    if (!this.openaiClient) {
      throw new Error('OpenAI client not initialized. Please provide API key.');
    }

    const response = await this.openaiClient.chat.completions.create({
      model: options.model,
      messages: [
        {
          role: 'system',
          content: 'You are a professional content writer for a technology company specializing in PLM (Product Lifecycle Management) solutions. Write engaging, clear, and professional content.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: options.maxTokens,
      temperature: options.temperature
    });

    return {
      text: response.choices[0].message.content.trim(),
      provider: 'openai',
      model: options.model,
      usage: response.usage
    };
  }

  /**
   * Generate text using Claude (Anthropic)
   */
  async generateWithClaude(prompt, options) {
    if (!this.anthropicClient) {
      throw new Error('Claude client not initialized. Please provide API key.');
    }

    const response = await this.anthropicClient.messages.create({
      model: options.model,
      max_tokens: options.maxTokens,
      temperature: options.temperature,
      system: 'You are a professional content writer for a technology company specializing in PLM (Product Lifecycle Management) solutions. Write engaging, clear, and professional content in Korean or English as appropriate.',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return {
      text: response.content[0].text.trim(),
      provider: 'claude',
      model: options.model,
      usage: response.usage
    };
  }

  /**
   * Generate text using Google Gemini
   */
  async generateWithGemini(prompt, options) {
    if (!this.geminiClient) {
      throw new Error('Gemini client not initialized. Please provide API key.');
    }

    const model = this.geminiClient.getGenerativeModel({
      model: options.model,
      generationConfig: {
        maxOutputTokens: options.maxTokens,
        temperature: options.temperature,
      }
    });

    const systemPrompt = 'You are a professional content writer for a technology company specializing in PLM (Product Lifecycle Management) solutions. Write engaging, clear, and professional content.';
    const fullPrompt = `${systemPrompt}\n\n${prompt}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;

    return {
      text: response.text().trim(),
      provider: 'gemini',
      model: options.model,
      usage: {
        promptTokens: response.usageMetadata?.promptTokenCount || 0,
        completionTokens: response.usageMetadata?.candidatesTokenCount || 0,
        totalTokens: response.usageMetadata?.totalTokenCount || 0
      }
    };
  }

  /**
   * Generate image using DALL-E (OpenAI)
   */
  async generateImage(provider, prompt, options = {}) {
    const {
      size = '1024x1024',
      quality = 'standard',
      style = 'natural'
    } = options;

    try {
      if (provider === 'openai-dalle') {
        return await this.generateWithDALLE(prompt, { size, quality, style });
      } else {
        throw new Error(`Unsupported image provider: ${provider}`);
      }
    } catch (error) {
      console.error(`[AIService] Error generating image with ${provider}:`, error);
      throw error;
    }
  }

  /**
   * Generate image using DALL-E 3
   */
  async generateWithDALLE(prompt, options) {
    if (!this.openaiClient) {
      throw new Error('OpenAI client not initialized. Please provide API key.');
    }

    const response = await this.openaiClient.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: options.size,
      quality: options.quality,
      style: options.style
    });

    return {
      url: response.data[0].url,
      revisedPrompt: response.data[0].revised_prompt,
      provider: 'openai-dalle',
      model: 'dall-e-3'
    };
  }

  /**
   * Generate structured content for a body section
   */
  async generateSectionContent(provider, sectionType, brief, options = {}) {
    let prompt = '';

    switch (sectionType) {
      case 'showcase':
        prompt = `Create compelling content for a product showcase section about: ${brief}

Please provide:
1. A catchy title (max 60 characters)
2. A subtitle (max 120 characters)
3. A detailed description (2-3 paragraphs)
4. A list of 4-6 key features
5. A call-to-action button text

Format the response as JSON with keys: title, subtitle, description, features (array), ctaText`;
        break;

      case 'features':
        prompt = `Create content for a features grid section about: ${brief}

Please provide 4-6 feature items, each with:
1. A title (max 40 characters)
2. A brief description (max 150 characters)
3. An emoji or icon suggestion

Format the response as JSON with a "features" array containing objects with keys: title, description, icon`;
        break;

      case 'content':
        prompt = `Write rich content for a content block section about: ${brief}

Please provide:
1. A main title
2. Well-structured HTML content with headings, paragraphs, lists
3. Key points to emphasize

Format the response as JSON with keys: title, htmlContent, keyPoints (array)`;
        break;

      default:
        throw new Error(`Unsupported section type: ${sectionType}`);
    }

    const response = await this.generateText(provider, prompt, {
      ...options,
      temperature: 0.8 // Higher creativity for marketing content
    });

    // Try to parse JSON response
    try {
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return {
          ...response,
          structuredData: JSON.parse(jsonMatch[0])
        };
      }
    } catch (e) {
      console.warn('[AIService] Could not parse structured response, returning raw text');
    }

    return response;
  }
}

module.exports = new AIService();
