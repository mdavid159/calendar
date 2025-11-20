import { Test, TestingModule } from '@nestjs/testing';
import { LoginPageService } from './login-page.service';
import { PrismockClient } from 'prismock';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from '../../dto/login.dto';
import { JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as R from 'remeda';
import 'jest-extended';

describe('LoginPageService', () => {
  let loginService: LoginPageService;
  let prismock: typeof PrismockClient;
  let prisma: PrismaService;

  beforeEach(async () => {
    //@ts-expect-error https://github.com/morintd/prismock/issues/871
    prismock = new PrismockClient();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env.JWT_ACCESS_SECRET,
        }),
      ],
      providers: [
        LoginPageService,
        {
          provide: PrismaService,
          useValue: prismock,
        },
      ],
    }).compile();

    loginService = module.get(LoginPageService);
    prisma = module.get(PrismaService);
  });

  it('login with email and password', async () => {
    const user = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      password: `Passw0rd!${Math.floor(Math.random() * 10000)}`,
      name: 'John',
      surname: 'Doe',
      birthDate: '1990-05-15',
    };

    await prisma.user.create({
      data: {
        ...user,
        password: bcrypt.hashSync(user.password, 10),
      },
    });

    const loginForm: LoginDto = { email: user.email, password: user.password };
    const result = await loginService.loginWithEmailAndPassword(loginForm);
    const resultUserField = R.pick(result.user, [
      'id',
      'email',
      'name',
      'surname',
      'birthDate',
    ]);
    const userField = R.pick(user, [
      'id',
      'email',
      'name',
      'surname',
      'birthDate',
    ]);
    expect(result).toContainKeys(['accessToken', 'refreshToken', 'user']);
    expect(resultUserField).toEqual(userField); // npm run test
  });
});
