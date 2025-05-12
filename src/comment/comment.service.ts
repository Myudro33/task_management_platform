import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  create(id: number, data: CreateCommentDto, userId: number) {
    try {
      return this.prisma.comments.create({
        data: { ...data, taskId: id, userId },
      });
    } catch (error) {
      return error;
    }
  }

  async getPostComments(id: number) {
    try {
      return await this.prisma.comments.findMany({ where: { taskId: id } });
    } catch (error) {
      return error;
    }
  }
}
