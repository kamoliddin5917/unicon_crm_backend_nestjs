import { Test, TestingModule } from '@nestjs/testing';
import { LeaderService } from './leader.service';

describe('LeaderService', () => {
  let service: LeaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaderService],
    }).compile();

    service = module.get<LeaderService>(LeaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
