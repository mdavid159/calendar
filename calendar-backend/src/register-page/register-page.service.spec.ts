import { Test, TestingModule } from '@nestjs/testing';
import { RegisterPageService } from './register-page.service';

describe('RegisterPageService', () => {
  let service: RegisterPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterPageService],
    }).compile();

    service = module.get<RegisterPageService>(RegisterPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
