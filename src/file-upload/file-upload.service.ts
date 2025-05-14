import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class UploadService {
  getMulterOptions(folder: string, type: 'image' | 'file') {
    return {
      storage: diskStorage({
        destination: `./uploads/${folder}`,
        filename: (_req, file, cb) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (_req: any, file: Express.Multer.File, cb: any) => {
        if (type === 'image') {
          if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
          }
        } else if (type === 'file') {
          if (!file.mimetype.match(/\/(pdf|doc|docx|txt)$/)) {
            return cb(new Error('Only document files are allowed!'), false);
          }
        }
        cb(null, true);
      },
    };
  }

  getPublicUrl(filename: string, folder: string): string {
    return `/uploads/${folder}/${filename}`;
  }
}
