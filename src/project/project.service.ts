import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { jwtVerify } from 'src/utils/jwt';
import { pg } from 'src/utils/pg';
import { ProjectDTO } from './dtos/project.dto';
import { IProject } from './interfaces/project.interface';

@Injectable()
export class ProjectService {
  async create(
    project: ProjectDTO,
    headers: any,
    medias: string[],
  ): Promise<IProject> {
    const { name, orgId } = project;
    const { token } = headers;
    const { leaderId } = jwtVerify(token);

    if (!name || !orgId) {
      throw new HttpException(
        'NOT NAME AND ORGANISATION',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createProject = await pg(
      `
      INSERT INTO projects (project_name, project_medias, project_org, project_leader) VALUES ($1, $2, $3, $4)
      RETURNING 
              project_id AS id,
              project_name AS name,
              project_medias AS medias,
              project_leader AS created_by,
              project_org AS org_id,
              project_date AS created_at
                `,
      [name, medias, orgId, leaderId],
    );

    if (!createProject) {
      throw new HttpException('NOT CREATED', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      message: 'CREATED',
      data: createProject,
    };
  }
}
