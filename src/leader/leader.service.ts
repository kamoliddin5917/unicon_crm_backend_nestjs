import { Injectable } from '@nestjs/common';
import { pgAll } from 'src/utils/pg';
import { ILeader } from './interfaces/leader.interface';
import knex from '../utils/knex';

@Injectable()
export class LeaderService {
  async findAll(leaderId: string): Promise<ILeader> {
    const findAllProject = await knex.instance
      .select(
        knex.instance.raw(`
    project_id AS id,
    project_name AS name,
    project_medias AS medias,
    project_leader AS created_by,
    project_org AS org_id,
    project_date AS created_at
    `),
      )
      .from(`projects`)
      .where(`project_leader`, leaderId);

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
    WHERE task_leader = $1
        `,
      [leaderId],
    );

    const findAllWorker = await pgAll(
      `
      SELECT 
      u.user_id AS id,
      u.user_name AS name,
      u.user_username AS username,
      u.user_ref_admin AS created_by,
      u.user_date AS created_at
FROM org_users AS ol INNER JOIN org_users AS ow 
      ON ol.org_id = ow.org_id
              INNER JOIN users AS u
      ON ow.user_id = u.user_id
              INNER JOIN roles AS r 
      ON  u.user_role = r.role_id
              WHERE ol.user_id = $1 AND r.role_name = 'worker'
GROUP BY u.user_id
        `,
      [leaderId],
    );

    const findAllOrganisation = await pgAll(
      `
      SELECT 
      o.org_id AS id,
      o.org_name AS name,
      o.org_date AS date
FROM org_users AS ou INNER JOIN organizations AS o 
      ON ou.org_id = o.org_id
              WHERE ou.user_id = $1 AND o.org_status = true
        `,
      [leaderId],
    );

    return {
      message: 'OK',
      data: {
        projects: findAllProject,
        tasks: findAllTask,
        workers: findAllWorker,
        organizations: findAllOrganisation,
      },
    };
  }
}
