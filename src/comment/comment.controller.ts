import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@Controller('/api/tasks')
@ApiTags('Comments')
@ApiBearerAuth()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':id/comments')
  @ApiOperation({ summary: 'Create a comment on a task' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, description: 'Comment created' })
  create(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.commentService.create(+id, createCommentDto, req.user.id);
  }

  @Get(':id/comments')
  @ApiOperation({ summary: 'Get all comments for a task' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Comments retrieved' })
  getPostComments(@Param('id') id: string) {
    return this.commentService.getPostComments(+id);
  }
}
