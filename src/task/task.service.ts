import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { jwtVerify } from 'src/utils/jwt';
import { pg } from 'src/utils/pg';
import { TaskDTO } from './dtos/task.dto';
import { ITask } from './interfaces/task.interface';

@Injectable()
export class TaskService {
  async create(task: TaskDTO, headers: any): Promise<ITask> {
    const { name, time, projectId, workerId } = task;
    const { token } = headers;
    const { leaderId } = jwtVerify(token);

    if (!name || !time || !projectId || !workerId) {
      throw new HttpException(
        'NAME and TIME and PROJECT and WORKER',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createTask = await pg(
      `
      INSERT INTO tasks (task_name, task_time, task_project, task_worker, task_leader) VALUES ($1, $2, $3, $4, $5)
      RETURNING 
              task_id AS id,
              task_name AS name,
              task_time AS due_date,
              task_worker AS worker_user_id,
              task_status_prosses AS status,
              task_project AS project_id,
              task_leader AS created_by,
              task_date AS created_at,
              task_prosses_date AS prosses_at,
              task_done_date AS done_at
      `,
      [name, time, projectId, workerId, leaderId],
    );

    if (!createTask) {
      throw new HttpException('NOT CREATED', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      message: 'CREATED',
      data: createTask,
    };
  }
}
