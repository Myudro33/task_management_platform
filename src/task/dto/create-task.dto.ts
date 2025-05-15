import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Create footer' })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({ example: 'task description...' })
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty({ example: '12/12/2025' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'dueDate must be in the format DD/MM/YYYY',
  })
  dueDate: string;
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  statusId: number;
  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsNotEmpty()
  asigneeId: number;
}
