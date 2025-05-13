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

  update(id: number, data: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id: id },
      data,
    });
  }
  async uploadAvatar(userId: number, avatar: Express.Multer.File) {
    console.log(avatar);

    const avatarUrl = this.uploadService.getPublicUrl(
      avatar.filename,
      'avatars',
    );
    await this.prisma.users.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
    });
    return avatarUrl;
  }
}
