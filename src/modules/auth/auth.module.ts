import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        UsersModule, // We need this to use UsersService
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService] // Export in case other modules need authentication services
})
export class AuthModule {}
