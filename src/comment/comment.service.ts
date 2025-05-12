import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  create(id: number, data: CreateCommentDto, userId: number) {
    return this.prisma.comments.create({
      data: { ...data, taskId: id, userId },
    });
  }

  getPostComments() {
    return `This action returns all comment`;
  }
}
