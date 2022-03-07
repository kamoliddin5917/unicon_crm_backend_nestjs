import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dtos/login.dto';
import { ILogin } from './interfaces/login.interface';
import { LoginService } from './login.service';

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: LoginDTO): Promise<ILogin> {
    try {
      const findUser = await this.loginService.login(user);
      return findUser;
    } catch (error) {
      console.log(error);

      if (
        error.status &&
        (error.status === 500 || error.status === 400 || error.status === 404)
      ) {
        throw new HttpException(error.message, error.status);
      }

      throw new HttpException('SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
