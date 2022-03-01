import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthLeaderMiddleware } from 'src/middlewares/leader.middleware';
import { LeaderController } from './leader.controller';
import { LeaderService } from './leader.service';

@Module({
  controllers: [LeaderController],
  providers: [LeaderService],
})
export class LeaderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthLeaderMiddleware).forRoutes(LeaderController);
  }
}
