import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { jwtVerify } from 'src/utils/jwt';
import { pg } from 'src/utils/pg';
import { OrganisationDTO } from './dtos/organisation.dto';
import { IOrganisation } from './interfaces/organisation.dto';

@Injectable()
export class OrganisationService {
  async create(
    organisation: OrganisationDTO,
    headers: any,
    image: string,
  ): Promise<IOrganisation> {
    const { name } = organisation;
    const { token } = headers;
    const { adminId } = jwtVerify(token);

    if (!name) {
      throw new HttpException('NOT NAME', HttpStatus.BAD_REQUEST);
    }

    const createORG = await pg(
      `
      INSERT INTO organizations (org_name, org_image, org_admin) VALUES ($1, $2, $3)
      RETURNING 
            org_id AS id,
            org_name AS name,
            org_image AS image,
            org_admin AS created_by,
            org_date AS created_at,
            org_status AS status
            `,
      [name, image, adminId],
    );

    if (!createORG) {
      throw new HttpException('NOT CREATED', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      message: 'OK',
      data: createORG,
    };
  }
}
