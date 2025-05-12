import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateTaskDto, userId: number) {
    try {
      return this.prisma.tasks.create({
        data: { ...data, createdById: userId },
      });
    } catch (error) {
      return error;
    }
  }

  findAll(user: { id: number; role: string }) {
    try {
      if (user.role == 'admin') {
        return this.prisma.tasks.findMany({
          include: {
            comments: true,
            files: true,
            status: true,
            asignee: {
              select: {
                name: true,
                email: true,
                avatar: true,
              },
            },
            createdBy: {
              select: {
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        });
      } else {
        return this.prisma.tasks.findMany({ where: { asigneeId: user.id } });
      }
    } catch (error) {
      return error;
    }
  }
  async update(id: number, data: UpdateTaskDto) {
    try {
      const task = await this.prisma.tasks.findUnique({ where: { id } });
      if (!task) {
        return { message: 'task not found' };
      }
      await this.prisma.tasks.update({ where: { id }, data });
      return { message: 'tasks updated' };
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const task = await this.prisma.tasks.findUnique({ where: { id: id } });
      if (!task) {
        return { message: 'task not found' };
      }
      await this.prisma.tasks.delete({ where: { id } });
      return { message: 'tasks deleted' };
    } catch (error) {
      return error;
    }
  }
}
