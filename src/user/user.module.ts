import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UploadService } from 'src/file-upload/file-upload.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UploadService],
})
export class UserModule {}
