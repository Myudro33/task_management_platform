import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'john' })
  @IsOptional()
  @IsString()
  name: string;
  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  roleId: number;
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  departmentId: number;
  @ApiProperty({ example: 'image' })
  @IsOptional()
  @IsString()
  avatar: string;
}
