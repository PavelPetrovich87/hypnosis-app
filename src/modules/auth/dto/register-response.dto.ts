import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/enums/user-role.enum';

export class RegisterResponseDto {
    @ApiProperty({
        example: '507f1f77bcf86cd799439011',
        description: 'The unique identifier of the user'
    })
    id: string;

    @ApiProperty({
        example: 'John Doe',
        description: 'The name of the user'
    })
    name: string;

    @ApiProperty({
        example: 'john@example.com',
        description: 'The email address of the user'
    })
    email: string;

    @ApiProperty({
        enum: UserRole,
        example: UserRole.USER,
        description: 'The role of the user'
    })
    role: UserRole;

    @ApiProperty({
        example: '2024-03-20T12:00:00Z',
        description: 'The timestamp when the user was created'
    })
    createdAt: Date;

    @ApiProperty({
        example: '2024-03-20T12:00:00Z',
        description: 'The timestamp when the user was last updated'
    })
    updatedAt: Date;
} 