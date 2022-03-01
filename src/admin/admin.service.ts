import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/utils/bcrypt';
import { jwtVerify } from 'src/utils/jwt';
import { pg, pgAll } from 'src/utils/pg';
import { AdminDTO, refDTO } from './dtos/admin.dto';
import { IAdmin, IRefOrgUser } from './interfaces/admin.interface';

@Injectable()
export class AdminService {
  async findAll(headers: any): Promise<any> {
    const { token } = headers;
    const { adminId } = jwtVerify(token);

    const findRoles = await pgAll(
      `
    SELECT 
        role_id AS id,
        role_name AS name
FROM roles
WHERE role_name != 'admin' AND role_status = true
    `,
      [],
    );
    const findUsers = await pgAll(
      `
    SELECT 
        user_id AS id,
        user_name AS name,
        user_username AS username,
        user_ref_admin AS created_by,
        user_date AS created_at,
        user_status AS status
FROM users
WHERE user_ref_admin = $1
    `,
      [adminId],
    );
    const findOrg = await pgAll(
      `
    SELECT 
        org_id AS id,
        org_name AS name,
        org_admin AS created_by,
        org_date AS created_at,
        org_status AS status
FROM organizations
WHERE org_admin = $1 
    `,
      [adminId],
    );

    return {
      message: 'OK!',
      data: {
        roles: findRoles,
        users: findUsers,
        organizations: findOrg,
        allStatistics: {
          organisationCount: findOrg.length,
          employes: findUsers.length,
        },
      },
    };
  }

  async create(user: AdminDTO, headers: any): Promise<IAdmin> {
    const { name, username, password, roleId, organisationId } = user;
    const { token } = headers;
    const { adminId } = jwtVerify(token);

    if (!name || !username || !password || !roleId || !organisationId) {
      throw new HttpException(
        'NAME and PASSWORD and USERNAME ROLE and ORGANISATION',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await hashPassword(password);

    const createUser = await pg(
      `
      INSERT INTO users (user_name, user_username, user_password, user_role, user_ref_admin) VALUES ($1, $2, $3, $4, $5)
      RETURNING 
        user_id AS id,
        user_name AS name,
        user_username AS username,
        user_ref_admin AS created_by,
        user_date AS created_at
        `,
      [name, username, hashedPassword, roleId, adminId],
    );

    if (!createUser) {
      throw new HttpException('NOT CREATED', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const userRefOrg = await pg(
      `
      INSERT INTO org_users (org_id, user_id) VALUES ($1, $2)
      RETURNING 
        org_user_id AS id
     `,
      [organisationId, createUser.id],
    );

    if (!userRefOrg) {
      throw new HttpException(
        'SERVER_REF_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      message: 'OK',
      data: { ...createUser, role_id: roleId },
    };
  }

  async refOrgUser(ref: refDTO): Promise<IRefOrgUser> {
    const { userId, organisationId } = ref;

    if (!userId || !organisationId) {
      throw new HttpException('USER and ORGANISATION', HttpStatus.BAD_REQUEST);
    }

    const refOrgUser = await pg(
      `
      INSERT INTO org_users (org_id, user_id) VALUES ($1, $2)
      RETURNING 
              org_user_id AS id
      `,
      [organisationId, userId],
    );

    if (!refOrgUser) {
      throw new HttpException(
        'NOT CREATED REFERENSES',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      message: 'REFERENSES OK',
    };
  }
}
