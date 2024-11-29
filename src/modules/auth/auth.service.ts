import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { RegisterResponseDto } from './dto/register-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService
    ) {}

    async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
        // 1. Check if user already exists
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        // 2. Hash the password
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        // 3. Create new user with hashed password
        const newUser = await this.usersService.create({
            name: registerDto.name,
            email: registerDto.email,
            password: hashedPassword
        });

        // Map the Mongoose document to RegisterResponseDto
        return {
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };
    }
}
