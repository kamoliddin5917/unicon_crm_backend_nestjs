import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthWorkerMiddleware } from 'src/middlewares/worker.middleware';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

@Module({
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthWorkerMiddleware).forRoutes(WorkerController);
  }
}
