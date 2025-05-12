import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsOptional()
  title: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsString()
  @IsOptional()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'dueDate must be in the format DD/MM/YYYY',
  })
  dueDate: string;
  @IsNumber()
  @IsOptional()
  statusId: number;
  @IsNumber()
  @IsOptional()
  asigneeId: number;
}
