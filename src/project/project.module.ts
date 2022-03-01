import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthLeaderMiddleware } from 'src/middlewares/leader.middleware';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthLeaderMiddleware).forRoutes(ProjectController);
  }
}
