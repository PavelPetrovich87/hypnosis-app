import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
    @ApiProperty({
        example: 400,
        description: 'HTTP status code'
    })
    statusCode: number;

    @ApiProperty({
        example: ['email must be a valid email address'],
        description: 'Error message(s)'
    })
    message: string | string[];

    @ApiProperty({
        example: 'Bad Request',
        description: 'Error type'
    })
    error: string;
} 