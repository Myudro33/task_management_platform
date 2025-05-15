import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ example: 'john@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ example: 'john123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
