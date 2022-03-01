import { Controller, Get, Req, Res } from '@nestjs/common';
import { LeaderService } from './leader.service';

@Controller('leader')
export class LeaderController {
  constructor(private readonly leaderService: LeaderService) {}
  @Get()
  async findAll(@Req() req: any, @Res() res: any) {
    try {
      const findAll = await this.leaderService.findAll(req['headers']);
      return res.status(200).json(findAll);
    } catch (error) {
      console.log(error);
      return res.status(error.status).json(error);
    }
  }
}
