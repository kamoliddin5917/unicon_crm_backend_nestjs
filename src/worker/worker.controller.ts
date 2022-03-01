import { Controller, Get, Req, Res } from '@nestjs/common';
import { WorkerService } from './worker.service';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  async findAll(@Req() req: any, @Res() res: any) {
    try {
      const findAll = await this.workerService.findAll(req['headers']);
      return res.status(200).json(findAll);
    } catch (error) {
      console.log(error);
      return res.status(error.status).json(error);
    }
  }
}
