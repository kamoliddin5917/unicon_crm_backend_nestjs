import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { ILogin } from './interfaces/login.interface';
import { comparePassword } from '../utils/bcrypt';
import { jwtSign } from '../utils/jwt';
import knex from 'src/utils/knex';

@Injectable()
export class LoginService {
  async login(user: LoginDTO): Promise<ILogin> {
    const { username, password } = user;

    if (!username || !password) {
      throw new HttpException('PASSWORD and USERNAME', HttpStatus.BAD_REQUEST);
    }

    const [findUser] = await knex.instance
      .select(
        knex.instance.raw(`
      u.user_id as id,
      u.user_password as password,
      u.user_name as name,
      u.user_username as username,
      u.user_ref_admin as created_by,
      u.user_date as created_at,
      r.role_name as role,
      r.role_id
  `),
      )
      .from(`roles as r`)
      .join(`users as u`, `r.role_id`, `u.user_role`)
      .where(`u.user_username`, username);

    if (!findUser) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }

    const comparedPassword = await comparePassword(password, findUser.password);

    if (!comparedPassword) {
      throw new HttpException('PASSWORD ERROR', HttpStatus.BAD_REQUEST);
    }

    let token: string;

    if (findUser.role === 'admin') {
      token = jwtSign({ adminId: findUser.id });
    } else if (findUser.role === 'leader') {
      token = jwtSign({ leaderId: findUser.id });
    } else if (findUser.role === 'worker') {
      token = jwtSign({ workerId: findUser.id });
    }

    return {
      message: 'OK',
      data: {
        token,
        user: {
          id: findUser.id,
          name: findUser.name,
          username: findUser.username,
          role: findUser.role,
          role_id: findUser.role_id,
          created_at: findUser.created_at,
          created_by: findUser.created_by,
        },
      },
    };
  }
}
