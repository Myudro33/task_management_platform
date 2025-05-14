import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UploadService } from 'src/file-upload/file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  users() {
    return this.userService.getUsers();
  }

  @Get(':id')
  profile(@Param('id') id: string) {
    return this.userService.profile(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Put(':id/upload-avatar')
  @UseInterceptors(
    FileInterceptor(
      'avatar',
      new UploadService().getMulterOptions('avatars', 'image'),
    ),
  )
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    const avatarUrl = await this.userService.uploadAvatar(+id, avatar);
    return {
      message: 'Avatar uploaded successfully',
      avatarUrl,
    };
  }
}
