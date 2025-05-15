import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ example: 'john@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'john123' })
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  roleId: number;
  @ApiProperty({ example: 'UI/UX' })
  @IsOptional()
  @IsString()
  department: string;
  @ApiProperty({ example: 'upload file' })
  @IsOptional()
  @IsString()
  avatar: string;
}
