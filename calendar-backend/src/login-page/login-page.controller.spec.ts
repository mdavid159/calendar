import { Test, TestingModule } from '@nestjs/testing';
import { LoginPageController } from './login-page.controller';
import { LoginPageModule } from './login-page.module';
import { JwtModule } from '@nestjs/jwt';

describe('LoginPageController', () => {
  let controller: LoginPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoginPageModule, JwtModule],
      controllers: [LoginPageController],
    }).compile();

    controller = module.get<LoginPageController>(LoginPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
