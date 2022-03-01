import { Controller, Post, Req, Res } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Req() req: any, @Res() res: any) {
    try {
      const createTask = await this.taskService.create(
        req['body'],
        req['headers'],
      );
      return res.status(201).json(createTask);
    } catch (error) {
      console.log(error);
      return res.status(error.status).json(error);
    }
  }
}
