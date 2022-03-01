import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { refDTO } from './dtos/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async findAll(@Req() req: any, @Res() res: any) {
    try {
      const findAll = await this.adminService.findAll(req['headers']);
      return res.status(200).json(findAll);
    } catch (error) {
      console.log(error);
      return res.status(error.status).json(error);
    }
  }

  @Post('register')
  async create(@Req() req: any, @Res() res: any) {
    try {
      const createUser = await this.adminService.create(
        req['body'],
        req['headers'],
      );
      return res.status(201).json(createUser);
    } catch (error) {
      console.log(error);
      return res.status(error.status).json(error);
    }
  }

  @Post('referense')
  async refOrgUser(@Body() ref: refDTO, @Res() res: any) {
    try {
      const refOrgUser = await this.adminService.refOrgUser(ref);
      return res.status(201).json(refOrgUser);
    } catch (error) {
      console.log(error);

      return res.status(error.status).json(error);
    }
  }
}
