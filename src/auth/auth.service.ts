import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/register-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: CreateAuthDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await this.prisma.users.create({
        data: { ...data, password: hashedPassword },
      });
      return { message: 'User created successfully', data: user };
    } catch (error) {
      return error;
    }
  }
  async login(data: LoginAuthDto) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { email: data.email },
        include: { roles: true },
      });
      if (!user) {
        return { message: 'User not found' };
      }
      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password,
      );
      if (!isPasswordValid) {
        return { message: 'Invalid password' };
      }
      const token = this.jwtService.sign({
        id: user.id,
        role: user.roles.name,
      });
      return { message: 'Login successful', token };
    } catch (error) {
      return error;
    }
  }
}
