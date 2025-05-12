import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateTaskDto) {
    return this.prisma.tasks.create({
      data,
    });
  }

  findAll() {
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
  }
  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
