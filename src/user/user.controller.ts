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
  @UseInterceptors(
    FileInterceptor(
      'avatar',
      new UploadService().getMulterOptions('avatars', 'image'),
    ),
  )
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.userService.update(+id, updateUserDto, avatar);
  }
}
