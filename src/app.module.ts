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
    consumer
      .apply(AuthMiddleware, AdminMiddleware)
      .forRoutes('/api/auth/register', '/api/users');
    consumer
      .apply(AuthMiddleware, AdminMiddleware)
      .forRoutes({ path: '/api/tasks', method: RequestMethod.POST });
    consumer.apply(AuthMiddleware).forRoutes('/api/tasks/:id/files');
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/api/tasks', method: RequestMethod.GET });
    consumer.apply(AuthMiddleware).forRoutes('/api/tasks/:id/comments');
  }
}
