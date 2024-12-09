import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';
import { SelfHypnosisSession, SelfHypnosisSessionSchema } from './schemas/suggestion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: SelfHypnosisSession.name, 
        schema: SelfHypnosisSessionSchema 
      }
    ])
  ],
  controllers: [SuggestionsController],
  providers: [SuggestionsService],
  exports: [SuggestionsService] // Export if other modules need to use this service
})
export class SuggestionsModule {}
