import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthAdminMiddleware } from 'src/middlewares/admin.middleware';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthAdminMiddleware).forRoutes(AdminController);
  }
}
