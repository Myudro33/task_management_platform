import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'dueDate must be in the format DD/MM/YYYY',
  })
  dueDate: string;
  @IsNumber()
  @IsNotEmpty()
  statusId: number;
  @IsNumber()
  @IsNotEmpty()
  asigneeId: number;
  @IsNumber()
  @IsNotEmpty()
  createdById: number;
}
