import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/utils/bcrypt';
import { AdminDTO, refDTO } from './dtos/admin.dto';
import { IAdmin, IRefOrgUser } from './interfaces/admin.interface';
import knex from 'src/utils/knex';

@Injectable()
export class AdminService {
  async findAll(adminId: string): Promise<any> {
    const findRoles = await knex.instance
      .select(
        knex.instance.raw(
          `
        role_id AS id,
        role_name AS name`,
        ),
      )
      .from(`roles`)
      .whereRaw(`role_name != 'admin'`)
      .andWhere(`role_status`, true);

    const findUsers = await knex.instance
      .select(
        knex.instance.raw(` user_id AS id,
    user_name AS name,
    user_username AS username,
    user_ref_admin AS created_by,
    user_date AS created_at,
    user_status AS status`),
      )
      .from(`users`)
      .where(`user_ref_admin`, adminId);

    const findOrg = await knex.instance
      .select(
        knex.instance.raw(` 
        org_id AS id,
        org_name AS name,
        org_admin AS created_by,
        org_date AS created_at,
        org_status AS status
        `),
      )
      .from(`organizations`)
      .where(`org_admin`, adminId);

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

  async create(user: AdminDTO, adminId: string): Promise<IAdmin> {
    const { name, username, password, roleId, organisationId } = user;

    if (!name || !username || !password || !roleId || !organisationId) {
      throw new HttpException(
        'NAME and PASSWORD and USERNAME ROLE and ORGANISATION',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await hashPassword(password);

    const [createUser] = await knex
      .instance(`users`)
      .insert({
        user_name: name,
        user_username: username,
        user_password: hashedPassword,
        user_role: roleId,
        user_ref_admin: adminId,
      })
      .returning(
        knex.instance.raw(`
    user_id AS id,
    user_name AS name,
    user_username AS username,
    user_ref_admin AS created_by,
    user_date AS created_at
    `),
      );

    if (!createUser) {
      throw new HttpException('NOT CREATED', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const [userRefOrg] = await knex
      .instance(`org_users`)
      .insert({ org_id: organisationId, user_id: createUser.id })
      .returning([`*`]);

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

    const [refOrgUser] = await knex
      .instance(`org_users`)
      .insert({ org_id: organisationId, user_id: userId })
      .returning([`*`]);

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
