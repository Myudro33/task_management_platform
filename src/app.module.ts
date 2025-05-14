import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminMiddleware, AuthMiddleware } from 'middleware/auth.middleware';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';
import { MailModule } from './mail/mail.module';
import { UploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    TaskModule,
    CommentModule,
    MailModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const authAndAdminRoutes = [
      '/api/auth/register',
      '/api/users',
      { path: '/api/tasks', method: RequestMethod.POST },
      { path: '/api/tasks:id', method: RequestMethod.DELETE },
    ];
    const authOnlyRoutes = [
      '/api/tasks/:id/files',
      { path: '/api/tasks', method: RequestMethod.GET },
      '/api/tasks/:id/comments',
    ];
    consumer
      .apply(AuthMiddleware, AdminMiddleware)
      .forRoutes(...authAndAdminRoutes);
    consumer.apply(AuthMiddleware).forRoutes(...authOnlyRoutes);
  }
}
