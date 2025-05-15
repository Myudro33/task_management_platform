import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MailService } from '../mail/mail.service';
import { UploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [UploadModule],
  controllers: [TaskController],
  providers: [TaskService, MailService],
})
export class TaskModule {}
