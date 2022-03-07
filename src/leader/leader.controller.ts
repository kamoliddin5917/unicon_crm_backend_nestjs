import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/decorators/user.decorator';
import { LeaderService } from './leader.service';

@ApiTags('leader')
@Controller('leader')
export class LeaderController {
  constructor(private readonly leaderService: LeaderService) {}
  @Get()
  async findAll(@UserId() id: string) {
    try {
      const findAll = await this.leaderService.findAll(id);
      return findAll;
    } catch (error) {
      throw new HttpException('SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
