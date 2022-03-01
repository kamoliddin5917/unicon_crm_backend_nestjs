import { Test, TestingModule } from '@nestjs/testing';
import { LeaderController } from './leader.controller';

describe('LeaderController', () => {
  let controller: LeaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaderController],
    }).compile();

    controller = module.get<LeaderController>(LeaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
