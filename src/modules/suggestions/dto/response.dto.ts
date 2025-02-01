import { ApiProperty } from '@nestjs/swagger';

export class SessionResponseDto<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T;

  constructor(success: boolean, message: string, data: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

export class SessionListResponseDto<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T[];

  @ApiProperty({ required: false })
  total?: number;

  constructor(success: boolean, message: string, data: T[], total?: number) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.total = total;
  }
} 