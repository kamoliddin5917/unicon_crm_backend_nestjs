import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { ILogin } from './interfaces/login.interface';
import { pg } from '../utils/pg';
import { comparePassword } from '../utils/bcrypt';
import { jwtSign } from '../utils/jwt';

@Injectable()
export class LoginService {
  async login(user: LoginDTO): Promise<ILogin> {
    const { username, password } = user;

    if (!username || !password) {
      throw new HttpException('PASSWORD and USERNAME', HttpStatus.BAD_REQUEST);
    }

    const findUser = await pg(
      `
    SELECT
        u.user_id AS id,
        u.user_password AS password,
        u.user_name AS name,
        u.user_username AS username,
        u.user_ref_admin AS created_by,
        u.user_date AS created_at,
        r.role_name AS role,
        r.role_id
    
    FROM roles AS r INNER JOIN users AS u 
        ON r.role_id = u.user_role
    WHERE u.user_username = $1
    `,
      [username],
    );

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
