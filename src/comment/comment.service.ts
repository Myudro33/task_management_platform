import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppError } from 'src/app-error/app-error.module';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(id: number, data: CreateCommentDto, userId: number) {
    try {
      const task = await this.prisma.tasks.findUnique({ where: { id } });
      if (!task) {
        throw new AppError('Task not found', HttpStatus.NOT_FOUND);
      }
      return this.prisma.comments.create({
        data: { ...data, taskId: id, userId },
      });
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  async getPostComments(id: number) {
    try {
      return await this.prisma.comments.findMany({ where: { taskId: id } });
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }
}
