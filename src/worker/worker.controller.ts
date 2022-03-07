import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/decorators/user.decorator';
import { IWorker } from './interfaces/worker.interface';
import { WorkerService } from './worker.service';

@ApiTags('worker')
@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  async findAll(@UserId() id: string): Promise<IWorker> {
    try {
      const findAll = await this.workerService.findAll(id);
      return findAll;
    } catch (error) {
      console.log(error);

      throw new HttpException('SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
