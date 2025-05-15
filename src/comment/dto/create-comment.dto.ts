import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCommentDto {
  @ApiProperty({ example: 'comment for task' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
