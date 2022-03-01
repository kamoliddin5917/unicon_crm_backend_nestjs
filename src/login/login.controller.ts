import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
// import { ILogin } from './interfaces/login.interface';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() user: LoginDTO, @Res() res: any) {
    try {
      const findUser = await this.loginService.login(user);
      return res.status(200).json(findUser);
    } catch (error) {
      console.log(error);
      return res.status(error.status).json(error);
    }
  }
}
