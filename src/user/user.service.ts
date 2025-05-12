import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
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
}
