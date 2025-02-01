import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Add Goal schema at the top with other nested schemas
@Schema({ _id: false })
class Goal {
  @Prop({
    required: true,
    default: () => uuidv4()  // Add default value
  })
  id: string;

  @Prop({
    required: true,
    trim: true, // Remove whitespace from both ends
  })
  text: string;
}

// Nested Schemas for complex objects
@Schema({ _id: false })
class Induction {
  @Prop({
    required: true,
    enum: ['progressive_relaxation', 'eye_fixation', 'breathing_focus'],
  })
  technique: 'progressive_relaxation' | 'eye_fixation' | 'breathing_focus';

  @Prop({ required: true, min: 1, max: 15 })
  duration: number;
}

@Schema({ _id: false })
class Deepening {
  @Prop({
    required: true,
    enum: ['countdown', 'visualization', 'staircase', 'elevator'],
  })
  method: 'countdown' | 'visualization' | 'staircase' | 'elevator';

  @Prop({ required: true, min: 1, max: 10 })
  duration: number;

  @Prop()
  visualizationDetails?: string;
}

@Schema({ _id: false })
class Technique {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String] })
  affirmations?: string[];

  @Prop({ type: [String] })
  visualizations?: string[];

  @Prop({ required: true, min: 1, max: 20 })
  duration: number;
}

@Schema({ _id: false })
class WorkingPhase {
  @Prop({ type: [Technique], required: true })
  techniques: Technique[];

  @Prop({ type: [String] })  // Remove required
  suggestionsUsed?: string[];  // Make optional
}

@Schema({ _id: false })
class Integration {
  @Prop({
    required: true,
    enum: ['future_pacing', 'rehearsal', 'anchoring', 'symbolic_bridge'],
  })
  method: string;

  @Prop({ type: Object, required: true })
  configuration: {
    anchorTrigger?: string;
    symbolicObject?: string;
  };
}

@Schema({ _id: false })
class Emergence {
  @Prop({ required: true, enum: ['gradual', 'balanced', 'quick'] })
  pace: string;

  @Prop({ required: true, enum: ['body', 'count', 'environment'] })
  focus: string;

  @Prop({ required: true, enum: ['calm', 'alert', 'balanced'] })
  energyState: string;

  @Prop()
  nextActivity?: string;

  @Prop({ min: 1, max: 10 })
  duration?: number;
}

// Main Schema
@Schema({
  timestamps: true, // Automatically add createdAt and updatedAt fields
  collection: 'sessions', // Explicitly name the collection
})
export class SelfHypnosisSession extends Document {
  @Prop({ type: Goal, required: true })
  goal: Goal;

  @Prop({ type: Induction, required: true })
  induction: Induction;

  @Prop({ type: Deepening, required: true })
  deepening: Deepening;

  @Prop({ type: WorkingPhase, required: true })
  workingPhase: WorkingPhase;

  @Prop({ type: Integration, required: true })
  integration: Integration;

  @Prop({ type: Emergence, required: true })
  emergence: Emergence;

  // Additional useful fields
  @Prop({ type: Number, min: 0 })
  duration?: number; // Session duration in minutes

  @Prop({ type: Number, min: 1, max: 10 })
  effectivenessRating?: number;

  @Prop({ type: [String], index: true })
  tags?: string[];
}

export const SelfHypnosisSessionSchema =
  SchemaFactory.createForClass(SelfHypnosisSession);

// Add indexes for better query performance
SelfHypnosisSessionSchema.index({ createdAt: -1 });
SelfHypnosisSessionSchema.index({ tags: 1 });
