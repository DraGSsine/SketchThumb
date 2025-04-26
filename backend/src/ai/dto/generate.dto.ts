// ai/dto/generate-content.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateDto {
  @IsNotEmpty()
  @IsString()
  prompt: string;

  @IsNotEmpty()
  @IsString()
  sketch: string;

  @IsNotEmpty()
  @IsString()
  targetPlatform: string;
}
