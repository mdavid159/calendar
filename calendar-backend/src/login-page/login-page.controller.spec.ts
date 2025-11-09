import { Test, TestingModule } from '@nestjs/testing';
import { LoginPageController } from './login-page.controller';

describe('LoginPageController', () => {
  let controller: LoginPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginPageController],
    }).compile();

    controller = module.get<LoginPageController>(LoginPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
