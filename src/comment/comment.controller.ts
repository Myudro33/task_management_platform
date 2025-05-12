import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('/api/tasks')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':id/comments')
  create(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.commentService.create(+id, createCommentDto, req.user.id);
  }

  @Get(':id/comments')
  getPostComments(@Param('id') id: string) {
    return this.commentService.getPostComments(+id);
  }
}
