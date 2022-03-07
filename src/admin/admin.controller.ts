import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/decorators/user.decorator';
import { AdminService } from './admin.service';
import { AdminDTO, refDTO } from './dtos/admin.dto';
import { IAdmin, IRefOrgUser } from './interfaces/admin.interface';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async findAll(@UserId() id: string) {
    try {
      const findAll = await this.adminService.findAll(id);
      return findAll;
    } catch (error) {
      throw new HttpException('SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  async create(@Body() user: AdminDTO, @UserId() id: string): Promise<IAdmin> {
    try {
      const createUser = await this.adminService.create(user, id);
      return createUser;
    } catch (error) {
      if (error.status && (error.status === 500 || error.status === 400)) {
        throw new HttpException(error.message, error.status);
      }

      throw new HttpException('SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('referense')
  async refOrgUser(@Body() ref: refDTO): Promise<IRefOrgUser> {
    try {
      const refOrgUser = await this.adminService.refOrgUser(ref);
      return refOrgUser;
    } catch (error) {
      if (error.status && (error.status === 500 || error.status === 400)) {
        throw new HttpException(error.message, error.status);
      }

      throw new HttpException('SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
