import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsNumber()
  @IsNotEmpty()
  roleId: number;
  @IsString()
  @IsNotEmpty()
  department: string;
  @IsString()
  @IsOptional()
  avatar: string;
}
