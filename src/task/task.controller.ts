import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/decorators/user.decorator';
import { TaskDTO } from './dtos/task.dto';
import { ITask } from './interfaces/task.interface';
import { TaskService } from './task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() task: TaskDTO, @UserId() id: string): Promise<ITask> {
    try {
      const createTask = await this.taskService.create(task, id);
      return createTask;
    } catch (error) {
      console.log(error);

      if (error.status && (error.status === 500 || error.status === 400)) {
        throw new HttpException(error.message, error.status);
      }

      throw new HttpException('SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
