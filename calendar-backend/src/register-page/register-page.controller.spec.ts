import { Test, TestingModule } from '@nestjs/testing';
import { RegisterPageController } from './register-page.controller';

describe('RegisterPageController', () => {
  let controller: RegisterPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterPageController],
    }).compile();

    controller = module.get<RegisterPageController>(RegisterPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
