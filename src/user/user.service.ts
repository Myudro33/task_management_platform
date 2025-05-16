import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageUploadService } from 'src/file-upload/file-upload.service';
import { AppError } from 'src/app-error/app-error.module';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: ImageUploadService,
  ) {}

  async getUsers() {
    try {
      const users = await this.prisma.users.findMany({
        include: { roles: true, departments: true },
      });
      if (!users) {
        throw new AppError('No users found', HttpStatus.NOT_FOUND);
      }
      return users;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  async profile(id: number) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        throw new AppError('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  async update(id: number, data: UpdateUserDto, avatar?: Express.Multer.File) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { id },
      });
      if (!user) {
        throw new AppError('User not found', HttpStatus.NOT_FOUND);
      }
      let avatarUrl: string;
      if (avatar) {
        avatarUrl = this.uploadService.getPublicUrl(avatar.filename, 'avatars');
        data.avatar = avatarUrl;
      }

      return this.prisma.users.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }
}
