import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SelfHypnosisSession } from './schemas/suggestion.schema';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectModel(SelfHypnosisSession.name)
    private sessionModel: Model<SelfHypnosisSession>,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<SelfHypnosisSession> {
    const createdSession = new this.sessionModel(createSessionDto);
    return createdSession.save();
  }

  async findAll(): Promise<SelfHypnosisSession[]> {
    return this.sessionModel.find().exec();
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
