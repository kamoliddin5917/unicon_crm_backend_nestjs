import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthAdminMiddleware } from 'src/middlewares/admin.middleware';
import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';

@Module({
  controllers: [OrganisationController],
  providers: [OrganisationService],
})
export class OrganisationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthAdminMiddleware).forRoutes(OrganisationController);
  }
}
