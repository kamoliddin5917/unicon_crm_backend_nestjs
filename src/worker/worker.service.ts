import { Injectable } from '@nestjs/common';
import { jwtVerify } from 'src/utils/jwt';
import { pgAll } from 'src/utils/pg';
import { IWorker } from './interfaces/worker.interface';

@Injectable()
export class WorkerService {
  async findAll(headers: any): Promise<IWorker> {
    const { token } = headers;
    const { workerId } = jwtVerify(token);

    const findAllProject = await pgAll(
      `
    SELECT 
            p.project_id AS id,
            p.project_name AS name,
            p.project_medias AS medias,
            p.project_org AS org_id,
            p.project_date AS created_at
    FROM tasks AS t INNER JOIN projects AS p
    ON t.task_project = p.project_id
    WHERE t.task_worker = $1 AND p.project_status = true
    `,
      [workerId],
    );

    const findAllTask = await pgAll(
      `
    SELECT 
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
    FROM tasks
    WHERE task_worker = $1 AND task_status = true
    `,
      [workerId],
    );

    return {
      message: 'OK',
      data: { projects: findAllProject, tasks: findAllTask },
    };
  }
}
