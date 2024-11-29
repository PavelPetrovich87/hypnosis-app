import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({
        example: 'John Doe',
        description: 'The name of the user'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @ApiProperty({
        example: 'john@example.com',
        description: 'The email address of the user'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'StrongPass123!',
        description: 'User password - must contain at least 1 uppercase, 1 lowercase, and 1 number or special character'
    })
    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character'
    })
    password: string;
} 