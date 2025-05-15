import { Module } from '@nestjs/common';
import { FileUploadService, ImageUploadService } from './file-upload.service';

@Module({
  providers: [FileUploadService, ImageUploadService],
  exports: [FileUploadService, ImageUploadService],
})
export class UploadModule {}
