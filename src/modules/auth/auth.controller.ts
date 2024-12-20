import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ErrorResponseDto } from '../../common/dto/error-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    @ApiOperation({ summary: 'Register new user' })
    @ApiResponse({ 
        status: HttpStatus.CREATED, 
        description: 'User successfully registered',
        type: RegisterResponseDto 
    })
    @ApiResponse({ 
        status: HttpStatus.CONFLICT, 
        description: 'User with this email already exists',
        type: ErrorResponseDto
    })
    @ApiResponse({ 
        status: HttpStatus.BAD_REQUEST, 
        description: 'Invalid input data',
        type: ErrorResponseDto
    })
    async register(@Body() registerDto: RegisterDto): Promise<RegisterResponseDto> {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User successfully logged in',
        type: LoginResponseDto
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Invalid credentials',
        type: ErrorResponseDto
    })
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        return this.authService.login(loginDto);
    }
}
