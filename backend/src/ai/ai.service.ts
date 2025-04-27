import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/model/UserSchema';
import OpenAI, { toFile } from 'openai';
import axios from 'axios';
import { GenerateDto } from './dto/generate.dto';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly openaiApiKey: string;
  private readonly openai: any;
  private readonly openRouterApiKey: string;

  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    this.openaiApiKey = this.configService.get<string>('OPENAI_API_KEY')!;
    this.openRouterApiKey =
      this.configService.get<string>('OPENROUTER_API_KEY')!;

    // Initialize OpenAI client
    this.openai = new OpenAI({
      apiKey: this.openaiApiKey,
    });
  }

  /**
   * Generate thumbnail based on user input
   */
  async generate(data: GenerateDto, userEmail: string): Promise<string[]> {
    try {
      // Extract the inputs from the data
      const { prompt, sketch, targetPlatform } = data;

      // Generate enhanced prompt using LLM
      const enhancedPrompt = await this.generateEnhancedPrompt(
        prompt,
        targetPlatform,
      );

      this.logger.log(`Enhanced Thumbnail Prompt: ${enhancedPrompt}`);

      // Generate thumbnail image using the enhanced prompt and sketch
      const thumbnailImage = await this.generateThumbnailImage(
        enhancedPrompt,
        sketch,
      );

      // Update user credits
      await this.updateUserCredits(userEmail);

      return [thumbnailImage]; // Return as array with single image for compatibility
    } catch (error) {
      this.logger.error(`Error in generate method: ${error.message}`);
      throw new BadRequestException('Failed to generate thumbnail');
    }
  }

  /**
   * Generate an enhanced prompt for thumbnail creation using LLM
   */
  async generateEnhancedPrompt(
    prompt: string,
    targetPlatform: string,
  ): Promise<string> {
    try {
      // Determine dimensions based on target platform
      let dimensions = '1280x720'; // Default dimensions
      const platform = targetPlatform.toLowerCase();

      if (platform.includes('youtube')) {
        dimensions = '1280x720';
      } else if (platform.includes('twitch')) {
        dimensions = '1280x720';
      } else if (platform.includes('instagram')) {
        dimensions = '1280x720';
      } else if (platform.includes('tiktok')) {
        dimensions = '1080x1920';
      } else if (platform.includes('linkedin')) {
        dimensions = '1200x627';
      } else if (platform.includes('twitter') || platform.includes('x.com')) {
        dimensions = '1600x900';
      }

      // Improved prompt template for LLM
      const promptContent = `Analyze the following user prompt and target platform. Extract or infer the following details: [topic], [main subject or scene], [text overlay], [style], [colors], and [emotion].

Then, generate a single, high-quality image generation prompt using this template:

Turn this sketch into a high-resolution ${targetPlatform} thumbnail (${dimensions} pixels) for a video about [topic]. The thumbnail should prominently feature [main subject or scene], with the text '[text overlay]' clearly visible and easy to read. Use a [style] style and a color scheme that includes [colors]. The overall image should be vibrant, attention-grabbing, and convey a sense of [emotion]. Ensure the text is large enough to be readable even at small sizes, and that there’s good contrast between the text and the background.

USER'S ORIGINAL PROMPT: "${prompt}"
TARGET PLATFORM: ${targetPlatform}
SUGGESTED IMAGE DIMENSIONS: ${dimensions}

Instructions:
- If the user's prompt already specifies any of the details, use them directly.
- If not, infer reasonable values based on the topic and platform.
- If the style is not specified, default to 'hyper realistic'.
- Output ONLY the final, filled-in prompt as a single sentence, with all placeholders replaced. Do not include explanations, markdown, or extra text.`;

      const messages = [
        {
          role: 'system',
          content:
            'You are a specialized assistant that transforms user prompts into highly effective, structured prompts for image generation AIs, specifically for thumbnails. You only output the final enhanced prompt text, nothing else.',
        },
        {
          role: 'user',
          content: promptContent,
        },
      ];

      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'google/gemini-2.0-flash-exp:free',
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

      return response.data.choices[0].message.content;
    } catch (error) {
      this.logger.error(`Error generating enhanced prompt: ${error.message}`, error.stack);
      throw new Error(`Failed to generate enhanced prompt: ${error.message}`);
    }
  }

  /**
   * Generate thumbnail image using the enhanced prompt and sketch
   */
  async generateThumbnailImage(
    prompt: string,
    sketch: string,
  ): Promise<string> {
    try {
      // Process the sketch image for OpenAI
      let imageData = sketch;
      if (sketch.startsWith('data:image')) {
        imageData = sketch.split(',')[1]; // Extract base64 data without the prefix
      }

      // Convert the base64 image to a file for the OpenAI API
      const buffer = Buffer.from(imageData, 'base64');
      const imageFile = await toFile(buffer, 'sketch-image.png', {
        type: 'image/png',
      });

      const response = await this.openai.images.edit({
        model: 'gpt-image-1',
        image: imageFile,
        prompt: prompt,
        quality: 'high',
      });

      return response.data[0].b64_json;
    } catch (error) {
      this.logger.error(
        `Error generating thumbnail image: ${error.message}`,
        error.stack,
      );
      throw new Error(`Failed to generate thumbnail image: ${error.message}`);
    }
  }

  /**
   * Update user credits after generating thumbnails
   */
  private async updateUserCredits(userEmail: string): Promise<void> {
    try {
      const userInfo = await this.userModel.findOne({ email: userEmail });

      if (!userInfo) {
        this.logger.warn(`User not found: ${userEmail}`);
        throw new Error(`User not found: ${userEmail}`);
      }

      // Ensure creditsUsed field exists or initialize if necessary before incrementing
      const updateResult = await this.userModel.updateOne(
        { email: userEmail },
        { $inc: { creditsUsed: 1 } },
        { upsert: false },
      );

      if (updateResult.matchedCount === 0) {
        this.logger.warn(`User not found during update attempt: ${userEmail}`);
        throw new Error(`User not found during update attempt: ${userEmail}`);
      }
      if (updateResult.modifiedCount === 0) {
        this.logger.warn(`Credits not updated for user (no modification): ${userEmail}`);
      } else {
        this.logger.log(`Credits updated successfully for user: ${userEmail}`);
      }
    } catch (error) {
      this.logger.error(
        `Error updating user credits: ${error.message}`,
        error.stack,
      );
      throw new Error(`Failed to update user credits: ${error.message}`);
    }
  }
}


