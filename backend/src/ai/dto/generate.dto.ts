// ai/dto/generate-content.dto.ts
import { IsString, IsOptional } from 'class-validator';
import { ThumbnailSettings } from '../../types/interface';

export class GenerateDto {
  @IsString()
  prompt: string;

  @IsOptional()
  settings: ThumbnailSettings;

  @IsOptional()
  sketch: any;

  @IsOptional()
  @IsString()
  timestamp?: string;
}
