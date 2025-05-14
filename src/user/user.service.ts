import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/file-upload/file-upload.service';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  getUsers() {
    return this.prisma.users.findMany();
  }

  profile(id: number) {
    return this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, data: UpdateUserDto, avatar?: Express.Multer.File) {
    const user = await this.prisma.users.findUnique({
      where: { id: id },
    });
    if (!user) {
      return { message: 'User not found' };
    }

    let avatarUrl: string | undefined;
    console.log(data);

    if (avatar) {
      console.log('test');

      avatarUrl = this.uploadService.getPublicUrl(avatar.filename, 'avatars');
      data.avatar = avatarUrl;
    }

    return this.prisma.users.update({
      where: { id: id },
      data,
    });
  }
}
