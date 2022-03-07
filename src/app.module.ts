import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { AdminModule } from './admin/admin.module';
import { OrganisationModule } from './organisation/organisation.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { WorkerModule } from './worker/worker.module';
import { LeaderModule } from './leader/leader.module';
import { SuperAdminModule } from './super-admin/super-admin.module';

@Module({
  imports: [
    LoginModule,
    AdminModule,
    OrganisationModule,
    ProjectModule,
    TaskModule,
    WorkerModule,
    LeaderModule,
    SuperAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
