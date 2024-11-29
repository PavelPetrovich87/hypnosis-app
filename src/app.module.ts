import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/hypnosis-app'),
        UsersModule
    ]
})
export class AppModule {}
