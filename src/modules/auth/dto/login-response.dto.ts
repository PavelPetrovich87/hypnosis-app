import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/enums/user-role.enum';

export class LoginResponseDto {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT access token'
    })
    accessToken: string;

    @ApiProperty({
        example: {
            id: '507f1f77bcf86cd799439011',
            email: 'user@example.com',
            role: UserRole.USER
        },
        description: 'User information'
    })
    user: {
        id: string;
        email: string;
        role: UserRole;
    };
} 