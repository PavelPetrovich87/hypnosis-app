import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SelfHypnosisSession } from './schemas/suggestion.schema';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionResponseDto, SessionListResponseDto } from './dto/response.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectModel(SelfHypnosisSession.name)
    private sessionModel: Model<SelfHypnosisSession>,
  ) {}

  async create(
    createSessionDto: CreateSessionDto,
  ): Promise<SessionResponseDto<SelfHypnosisSession>> {
    // Generate goal ID if not provided
    if (!createSessionDto.goal.id) {
      createSessionDto.goal.id = uuidv4();
    }

    // Generate technique IDs if not provided
    createSessionDto.workingPhase.techniques =
      createSessionDto.workingPhase.techniques?.map((tech) => ({
        ...tech,
        id: tech.id || uuidv4(),
      })) || [];

    const createdSession = new this.sessionModel(createSessionDto);
    const saved = await createdSession.save();
    return new SessionResponseDto(true, 'Session created successfully', saved);
  }

  async findAll(): Promise<SessionListResponseDto<SelfHypnosisSession>> {
    const sessions = await this.sessionModel.find().exec();
    return new SessionListResponseDto(
      true,
      'Sessions retrieved successfully',
      sessions,
    );
  }

  async findOne(id: string): Promise<SelfHypnosisSession> {
    const session = await this.sessionModel.findById(id).exec();
    if (!session) {
      throw new NotFoundException(`Session with ID "${id}" not found`);
    }
    return session;
  }

  async update(
    id: string,
    updateSessionDto: UpdateSessionDto,
  ): Promise<SelfHypnosisSession> {
    const updatedSession = await this.sessionModel
      .findByIdAndUpdate(id, updateSessionDto, { new: true })
      .exec();
    if (!updatedSession) {
      throw new NotFoundException(`Session with ID "${id}" not found`);
    }
    return updatedSession;
  }

  async remove(id: string): Promise<void> {
    const result = await this.sessionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Session with ID "${id}" not found`);
    }
  }

  // Additional utility methods
  async findByGoalId(goalId: string): Promise<SelfHypnosisSession[]> {
    return this.sessionModel.find({ 'goal.id': goalId }).exec();
  }

  async findByTags(tags: string[]): Promise<SelfHypnosisSession[]> {
    return this.sessionModel.find({ tags: { $in: tags } }).exec();
  }
}
