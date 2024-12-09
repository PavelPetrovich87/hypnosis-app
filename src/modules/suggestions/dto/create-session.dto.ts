import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsArray, ValidateNested, Min, Max, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class GoalDto {
  @ApiProperty({ description: 'Unique identifier for the goal' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Description of the goal' })
  @IsString()
  text: string;
}

export class InductionDto {
  @ApiProperty({
    enum: ['progressive_relaxation', 'eye_fixation', 'breathing_focus'],
    description: 'The induction technique to be used'
  })
  @IsEnum(['progressive_relaxation', 'eye_fixation', 'breathing_focus'])
  technique: 'progressive_relaxation' | 'eye_fixation' | 'breathing_focus';
}

export class DeepeningDto {
  @ApiProperty({
    enum: ['countdown', 'visualization', 'staircase', 'elevator'],
    description: 'The deepening method to be used'
  })
  @IsEnum(['countdown', 'visualization', 'staircase', 'elevator'])
  method: 'countdown' | 'visualization' | 'staircase' | 'elevator';

  @ApiProperty({
    required: false,
    description: 'Additional details for visualization method'
  })
  @IsString()
  @IsOptional()
  visualizationDetails?: string;
}

export class TechniqueDto {
  @ApiProperty({ description: 'Name of the technique' })
  @IsString()
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
  @ArrayMinSize(1)
  suggestionsUsed: string[];
}

export class IntegrationDto {
  @ApiProperty({
    required: false,
    type: [String],
    description: 'List of mental rehearsals for integration'
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  mentalRehearsals?: string[];

  @ApiProperty({
    type: [String],
    description: 'List of post-hypnotic suggestions'
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  postHypnoticSuggestions: string[];
}

export class EmergenceDto {
  @ApiProperty({
    enum: ['counting_up', 'gradual_awareness', 'stretching'],
    description: 'The emergence technique to be used'
  })
  @IsEnum(['counting_up', 'gradual_awareness', 'stretching'])
  technique: 'counting_up' | 'gradual_awareness' | 'stretching';
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