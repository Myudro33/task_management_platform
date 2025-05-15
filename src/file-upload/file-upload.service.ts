import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class ImageUploadService {
  getMulterOptions(folder: string) {
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
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    };
  }

  getPublicUrl(filename: string, folder: string): string {
    return `/uploads/${folder}/${filename}`;
  }
}

@Injectable()
export class FileUploadService {
  getMulterOptions(folder: string) {
    return {
      storage: diskStorage({
        destination: `./uploads/${folder}`,
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
      fileFilter: (_req: any, file: Express.Multer.File, cb: any) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|bmp|pdf)$/)) {
          return cb(new Error('Only files are allowed!'), false);
        }
        cb(null, true);
      },
    };
  }

  getPublicUrl(filename: string, folder: string): string {
    return `/uploads/${folder}/${filename}`;
  }
}
