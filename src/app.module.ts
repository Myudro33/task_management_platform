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

@Module({
  imports: [PrismaModule, UserModule, AuthModule, TaskModule, CommentModule],
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
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/api/tasks', method: RequestMethod.GET });
    consumer.apply(AuthMiddleware).forRoutes('/api/tasks/:id/comments');
  }
}
