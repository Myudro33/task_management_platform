import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/register-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AppError } from 'src/app-error/app-error.module';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: CreateAuthDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const existingUser = await this.prisma.users.findUnique({
        where: { email: data.email },
      });
      if (existingUser) {
        throw new AppError('User already exists', 404);
      }
      const user = await this.prisma.users.create({
        data: { ...data, password: hashedPassword },
      });
      return { message: 'User created successfully', data: user };
    } catch (error) {
      throw new AppError(error.message, 500);
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
        throw new AppError('Invalid password', HttpStatus.UNAUTHORIZED);
      }
      const token = this.jwtService.sign({
        id: user.id,
        role: user.roles.name,
      });
      return { message: 'Login successful', token };
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }
}
