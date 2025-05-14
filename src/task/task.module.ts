import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MailService } from '../mail/mail.service';
import { UploadService } from 'src/file-upload/file-upload.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, MailService, UploadService],
})
export class TaskModule {}
