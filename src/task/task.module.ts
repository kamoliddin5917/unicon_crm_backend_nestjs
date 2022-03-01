import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthLeaderMiddleware } from 'src/middlewares/leader.middleware';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthLeaderMiddleware).forRoutes(TaskController);
  }
}
