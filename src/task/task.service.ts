import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { UploadService } from 'src/file-upload/file-upload.service';
import { AppError } from 'src/app-error/app-error.module';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly uploadService: UploadService,
  ) {}
  async getFiles(id: number) {
    try {
      const task = await this.prisma.tasks.findUnique({ where: { id } });
      if (!task) {
        throw new AppError('Task not found', HttpStatus.NOT_FOUND);
      }
      const files = await this.prisma.files.findMany({
        where: { taskId: id },
      });
      return files;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }
  async uploadFile(id: number, file, userId: number) {
    try {
      const task = await this.prisma.tasks.findUnique({ where: { id } });
      if (!task) {
        throw new AppError('Task not found', HttpStatus.NOT_FOUND);
      }
      const fileUrl = this.uploadService.getPublicUrl(file.filename, 'files');
      await this.prisma.files.create({
        data: {
          url: fileUrl,
          filename: file.filename,
          taskId: id,
          uploadedBy: userId,
        },
      });
      return { message: 'file uploaded', fileUrl };
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }
  async create(data: CreateTaskDto, userId: number) {
    try {
      const { asigneeId } = data;
      const user = await this.prisma.users.findUnique({
        where: { id: asigneeId },
      });

      if (user && user.email) {
        await this.mailService.sendMail(
          user.email,
          'Task assigned',
          `<h1>You have been assigned to the task</h1>
          <h2 style="color: #4CAF50; font-size: 20px; letter-spacing: 5px;">Task details: ${data.title}</h2>
            <p>Task details: ${data.description ? data.description : "task doesn't have description"}</p>
            <p>Deadline: ${data.dueDate}</p>`,
        );
      } else {
        throw new AppError('Asignee user not found', HttpStatus.NOT_FOUND);
      }

      const createdTask = await this.prisma.tasks.create({
        data: { ...data, createdById: userId },
      });

      return createdTask;
    } catch (error) {
      throw new AppError(error.message, error.status);
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
        return this.prisma.tasks.findMany({
          where: { asigneeId: user.id },
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
    } catch (error) {
      throw new AppError(error, error.status);
    }
  }
  async update(id: number, data: UpdateTaskDto) {
    try {
      const task = await this.prisma.tasks.findUnique({ where: { id } });
      if (!task) {
        throw new AppError('Task not found', HttpStatus.NOT_FOUND);
      }
      await this.prisma.tasks.update({ where: { id }, data });
      return { message: 'tasks updated' };
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      const task = await this.prisma.tasks.findUnique({ where: { id: id } });
      if (!task) {
        throw new AppError('Task not found', HttpStatus.NOT_FOUND);
      }
      await this.prisma.tasks.delete({ where: { id } });
      return { message: 'tasks deleted' };
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }
}
