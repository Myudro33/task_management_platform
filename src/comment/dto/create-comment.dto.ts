import { IsNotEmpty, IsString, Matches } from 'class-validator';
export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'createdAt must be in the format DD/MM/YYYY',
  })
  createdAt: string;
}
