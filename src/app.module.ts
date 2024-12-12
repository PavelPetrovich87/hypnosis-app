import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SuggestionsModule } from './modules/suggestions/suggestions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hypnosis-app'),
    UsersModule,
    AuthModule,
    SuggestionsModule,
  ],
})
export class AppModule {}
