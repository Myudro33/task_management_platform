import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  roleId: number;
  @IsOptional()
  @IsString()
  department: string;
  @IsOptional()
  @IsString()
  avatar: string;
}
