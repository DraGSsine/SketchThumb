import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/model/UserSchema';
import { GenerateDto } from './dto/generate.dto';
import { GoogleGenAI } from '@google/genai';
import { ThumbnailSettings } from 'src/types/interface';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly openRouterApiKey: string;
  private readonly ai: any;

  // Arrays for quality level descriptors
  private qualityOptions: string[] = [
    'standard definition', // 0
    'enhanced quality', // 1
    'full HD quality', // 2
    'professional quality', // 3
    'high-definition quality', // 4
    'premium quality', // 5
    'studio quality', // 6
    'ultra HD quality', // 7
    'broadcast quality', // 8
    'cinematic quality', // 9
  ];

  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    this.openRouterApiKey = this.configService.get<string>('OPENROUTER_API_KEY')!;
    this.ai = new GoogleGenAI({
      apiKey: this.configService.get<string>('GEMINI_API_KEY')!,
    });
  }

  /**
   * Generate thumbnail variations based on user input
   */
  async generate(data: GenerateDto, userEmail: string): Promise<string[]> {
    try {
      const enhancedPrompt = await this.generateEnhancedPrompt(
        data.prompt,
        data.settings,
        data.sketch,
      );
      this.logger.log(`Enhanced Thumbnail Prompt: ${enhancedPrompt}`);

      const thumbnailVariations = await this.generateThumbnailImages(enhancedPrompt);

      await this.updateUserCredits(userEmail);

      return thumbnailVariations;
    } catch (error) {
      this.logger.error(`Error in generate method: ${error.message}`);
      throw new Error('Failed to generate thumbnail variations');
    }
  }

  async generateEnhancedPrompt(
    prompt: string,
    settings: ThumbnailSettings,
    sketch: any,
  ): Promise<string> {
    const styleType = settings.style.enabled ? `Use the specified style: ${settings.style.type}.` : "Choose an appropriate style for the thumbnail.";
    const colorScheme = settings.colors.enabled ? `Use the specified color scheme: ${settings.colors.scheme}.` : "Choose suitable colors that will engage viewers.";
    const textContent = settings.text.enabled ? `Include the text "${settings.text.value}" positioned at ${settings.text.position}.` : "Do not include any text overlay.";
    
    // Get quality descriptor from the quality level
    const qualityIndex = Math.min(Math.max(0, settings.quality.level || 5), this.qualityOptions.length - 1);
    const qualityLevel = this.qualityOptions[qualityIndex];
    
    const dimensions = settings.dimensions.enabled 
      ? `Create the thumbnail with dimensions ${settings.dimensions.width}x${settings.dimensions.height} with aspect ratio ${settings.dimensions.aspectRatio}.`
      : "Create the thumbnail with standard YouTube dimensions (1280x720) with 16:9 aspect ratio.";
    
    const promptContent = `
      Generate a compelling thumbnail based on the following instructions:
      - Concept: ${prompt}
      - ${styleType}
      - ${colorScheme}
      - ${textContent}
      - Quality Level: ${qualityLevel}
      - ${dimensions}
      
      The thumbnail should be visually striking, attention-grabbing, and clearly communicate the content's theme.
      Ensure high contrast between elements for better visibility at small sizes.
      Create a clean, professional look that will stand out in search results and recommended feeds.
    `;
  
    const messages = [
      {
        role: 'system',
        content: 'You are a specialized assistant that creates optimized thumbnail prompts for digital content.',
      },
      {
        role: 'user',
        content: [
          { type: 'text', text: promptContent },
          { type: 'image_url', image_url: { url: sketch } },
        ],
      },
    ];
  
    console.log('Generated Prompt:', promptContent);
  
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'google/gemini-2.5-pro-exp-03-25:free',
          messages: messages,
        },
        {
          headers: {
            Authorization: `Bearer ${this.openRouterApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://sketchtothumbnail.com',
            'X-Title': 'SketchToThumbnail',
          },
        },
      );
      
      // Process the response
      if (response.data && response.data.choices && response.data.choices[0]?.message?.content) {
        const content = response.data.choices[0].message.content.trim();
        
        // If the content is JSON, try to extract the prompt field
        if (content.startsWith('{') && content.includes('"prompt"')) {
          try {
            const jsonContent = JSON.parse(content);
            if (jsonContent.prompt) {
              return jsonContent.prompt;
            }
          } catch (jsonError) {
            this.logger.warn(`Failed to parse JSON response: ${jsonError.message}`);
          }
        }
        
        return content;
      }
      
      // Fallback if response structure doesn't match expectations
      this.logger.warn('Unexpected API response structure. Using original prompt.');
      return promptContent.replace(/\n\s*/g, ' ').trim();
    } catch (error) {
      this.logger.error(`Error in generateEnhancedPrompt: ${error.message}`);
      // Fallback to the original prompt if API call fails
      return promptContent.replace(/\n\s*/g, ' ').trim();
    }
  }
  
  async generateThumbnailImages(prompt: string): Promise<string[]> {
    try {
      const results: string[] = [];
      
      // Generate 4 different thumbnail variations
      for (let i = 0; i < 4; i++) {
        try {
          const result = await this.ai.models.generateContent({
            model: 'gemini-2.0-flash-exp-image-generation',
            contents: prompt + ` (Variation ${i + 1}: Make this unique from other variations)`,
            config: {
              responseModalities: ['Text', 'Image'],
            },
          });
          
          if (!result || !result.candidates || result.candidates.length === 0) {
            this.logger.error(`Empty or invalid response from image generation API for thumbnail #${i+1}`);
            continue;
          }
          
          for (const part of result.candidates[0].content.parts) {
            if (part.inlineData) {
              results.push(part.inlineData.data);
              break; // We only need one image per API call
            }
          }
        } catch (error) {
          this.logger.error(`Error generating thumbnail #${i+1}: ${error.message}`);
          // Continue with other thumbnail generations even if one fails
        }
      }
      
      if (results.length === 0) {
        throw new Error('Failed to generate any thumbnail images');
      }
      
      return results;
    } catch (error) {
      this.logger.error(`Error generating thumbnail images: ${error.message}`, error.stack);
      throw new Error(`Failed to generate thumbnail images: ${error.message}`);
    }
  }
  
  private async updateUserCredits(userEmail: string): Promise<void> {
    try {
      const userInfo = await this.userModel.findOne({ email: userEmail });
      
      if (!userInfo) {
        this.logger.warn(`User not found: ${userEmail}`);
        throw new Error(`User not found: ${userEmail}`);
      }
      
      await this.userModel.updateOne(
        { email: userEmail },
        { $inc: { creditsUsed: 1 } },
      );
      
      this.logger.log(`Credits updated successfully for user: ${userEmail}`);
    } catch (error) {
      this.logger.error(`Error updating user credits: ${error.message}`, error.stack);
      throw new Error(`Failed to update user credits: ${error.message}`);
    }
  }
}
