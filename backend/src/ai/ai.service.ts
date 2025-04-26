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
        sketch,
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
    sketch: string,
    targetPlatform: string,
  ): Promise<string> {
    try {
      // Determine dimensions based on target platform
      let dimensions = '1280x720'; // Default dimensions
      const platform = targetPlatform.toLowerCase();

      if (platform.includes('youtube')) {
        dimensions = '1280x720';
      } else if (platform.includes('twitch')) { // Added Twitch
        dimensions = '1280x720';
      } else if (platform.includes('instagram')) { // Simplified Instagram
        dimensions = '1280x720'; // Defaulting to 16:9 for general/video use
      } else if (platform.includes('tiktok')) {
        dimensions = '1080x1920'; // Vertical
      } else if (platform.includes('linkedin')) {
        dimensions = '1200x627';
      } else if (platform.includes('twitter') || platform.includes('x.com')) {
        dimensions = '1600x900';
      }
      // Removed Facebook and specific IG post/story/reel checks

      // Create the prompt for the LLM
      // Fixed template literal syntax
      const promptContent = `Generate a detailed prompt for creating a compelling thumbnail image based on:

USER’S REQUEST: \"${prompt}\"

TARGET PLATFORM: ${targetPlatform}

IMAGE DIMENSIONS: ${dimensions}

GUIDELINES:
1. Render everything in a hyper realistic style by default—unless the user explicitly requests another style.
2. If the sketch includes an element (even as an emoji), interpret it as a real-world object or character in that realistic style.
3. Follow the sketch exactly for composition, focal points, and layout.
4. Use lighting, depth, and texture to make the scene feel three-dimensional and lifelike.
5. Ensure the thumbnail:
   - Is visually striking and attention-grabbing.
   - Clearly communicates the content’s theme at a glance.
   - Is optimized for ${targetPlatform} (e.g. color palette, framing).
   - Maintains high contrast and readability at small sizes.
   - Positions any required text in clear, uncluttered areas, with hierarchy and legibility in mind.

Return ONLY the generated prompt text itself—no introductions, no markdown, no labels.`;

      // Prepare the messages for the API request
      const messages = [
        {
          role: 'system',
          content:
            'You are a specialized assistant that creates optimized thumbnail prompts for digital content. You only output the final prompt text, nothing else.', // Updated system prompt
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: promptContent },
            { type: 'image_url', image_url: { url: sketch } },
          ],
        },
      ];

      // Make the API request to OpenRouter using Gemini model
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'google/gemini-2.0-flash-exp:free', // Consider trying other models if this one consistently adds extra text
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
      throw Error(error)
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

      // const response = await this.openai.images.edit({
      //   model: 'gpt-image-1',
      //   image: imageFile,
      //   prompt: prompt,
      //   quality: 'high',
      // });

      // return response.data[0].b64_json;
      return ""
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
