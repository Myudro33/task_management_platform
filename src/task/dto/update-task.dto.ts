import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ example: 'Create footer' })
  @IsString()
  @IsOptional()
  title: string;
  @ApiProperty({ example: 'task description' })
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty({ example: '12/12/2025' })
  @IsString()
  @IsOptional()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'dueDate must be in the format DD/MM/YYYY',
  })
  dueDate: string;
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  statusId: number;
  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsOptional()
  asigneeId: number;
}
