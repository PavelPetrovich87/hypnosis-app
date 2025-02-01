import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsArray, ValidateNested, Min, Max, ArrayMinSize, IsUUID, IsIn, IsNotEmpty, MinLength, MaxLength, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GoalDto {
  @ApiProperty({ description: 'Optional UUIDv4 identifier' })
  @IsUUID('4')
  @IsOptional()
  id?: string;

  @ApiProperty({ description: 'Goal description' })
  @IsString()
  text: string;
}

export class InductionDto {
  @ApiProperty({
    enum: ['progressive_relaxation', 'eye_fixation', 'breathing_focus'],
  })
  @IsEnum(['progressive_relaxation', 'eye_fixation', 'breathing_focus'])
  technique: 'progressive_relaxation' | 'eye_fixation' | 'breathing_focus';

  @ApiProperty({ description: 'Duration in minutes' })
  @IsNumber()
  @Min(1)
  @Max(15)
  duration: number;
}

export class DeepeningDto {
  @ApiProperty({
    enum: ['countdown', 'visualization', 'staircase', 'elevator'],
  })
  @IsEnum(['countdown', 'visualization', 'staircase', 'elevator'])
  method: 'countdown' | 'visualization' | 'staircase' | 'elevator';

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  visualizationDetails?: string;

  @ApiProperty({ description: 'Duration in minutes' })
  @IsNumber()
  @Min(1)
  @Max(10)
  duration: number;
}

export class TechniqueDto {
  @ApiProperty({ description: 'Optional UUIDv4 identifier' })
  @IsUUID('4')
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    required: false,
    type: [String],
    description: 'List of affirmations used in the technique'
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  affirmations?: string[];

  @ApiProperty({
    required: false,
    type: [String],
    description: 'List of visualizations used in the technique'
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  visualizations?: string[];

  @ApiProperty({ description: 'Duration in minutes' })
  @IsNumber()
  @Min(1)
  @Max(20)
  duration: number;
}

export class WorkingPhaseDto {
  @ApiProperty({
    type: [TechniqueDto],
    description: 'List of techniques used in the working phase'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechniqueDto)
  @ArrayMinSize(1)
  techniques: TechniqueDto[];

  @ApiProperty({
    type: [String],
    description: 'List of suggestions used in the session'
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  suggestionsUsed?: string[];
}

class IntegrationConfigurationDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  anchorTrigger?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  symbolicObject?: string;
}

export class IntegrationDto {
  @ApiProperty({
    enum: ['future_pacing', 'rehearsal', 'anchoring', 'symbolic_bridge'],
  })
  @IsEnum(['future_pacing', 'rehearsal', 'anchoring', 'symbolic_bridge'])
  method: 'future_pacing' | 'rehearsal' | 'anchoring' | 'symbolic_bridge';

  @ApiProperty()
  @ValidateNested()
  @Type(() => IntegrationConfigurationDto)
  configuration: IntegrationConfigurationDto;
}

export class EmergenceDto {
  @ApiProperty({ enum: ['gradual', 'balanced', 'quick'] })
  @IsEnum(['gradual', 'balanced', 'quick'])
  pace: 'gradual' | 'balanced' | 'quick';

  @ApiProperty({ enum: ['body', 'count', 'environment'] })
  @IsEnum(['body', 'count', 'environment'])
  focus: 'body' | 'count' | 'environment';

  @ApiProperty({ enum: ['calm', 'alert', 'balanced'] })
  @IsEnum(['calm', 'alert', 'balanced'])
  energyState: 'calm' | 'alert' | 'balanced';

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nextActivity?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @Min(1)
  @Max(10)
  @IsOptional()
  duration?: number;
}

export class CreateSessionDto {
  @ApiProperty({ type: GoalDto })
  @ValidateNested()
  @Type(() => GoalDto)
  goal: GoalDto;

  @ApiProperty({ type: InductionDto })
  @ValidateNested()
  @Type(() => InductionDto)
  induction: InductionDto;

  @ApiProperty({ type: DeepeningDto })
  @ValidateNested()
  @Type(() => DeepeningDto)
  deepening: DeepeningDto;

  @ApiProperty({ type: WorkingPhaseDto })
  @ValidateNested()
  @Type(() => WorkingPhaseDto)
  workingPhase: WorkingPhaseDto;

  @ApiProperty({ type: IntegrationDto })
  @ValidateNested()
  @Type(() => IntegrationDto)
  integration: IntegrationDto;

  @ApiProperty({ type: EmergenceDto })
  @ValidateNested()
  @Type(() => EmergenceDto)
  emergence: EmergenceDto;

  @ApiProperty({
    required: false,
    minimum: 0,
    description: 'Duration of the session in minutes'
  })
  @IsOptional()
  @Min(0)
  duration?: number;

  @ApiProperty({
    required: false,
    minimum: 1,
    maximum: 10,
    description: 'Rating of session effectiveness (1-10)'
  })
  @IsOptional()
  @Min(1)
  @Max(10)
  effectivenessRating?: number;

  @ApiProperty({
    required: false,
    type: [String],
    description: 'Tags for categorizing the session'
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
} 