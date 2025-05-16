import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEmail,
} from 'class-validator';

export class CreateAuthDto {
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
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  departmentId: number;
}
