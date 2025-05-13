import { Module } from '@nestjs/common';
import { UploadService } from './file-upload.service';

@Module({
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
