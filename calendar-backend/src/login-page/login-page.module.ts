import { Module } from '@nestjs/common';
import { LoginPageService } from './login-page.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { jwtConstants } from './constants/jwt/jwt-constants';
import { LoginPageController } from './login-page.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    PrismaModule,
  ],
  providers: [LoginPageService, JwtStrategy],
  controllers: [LoginPageController],
  exports: [LoginPageService],
})
export class LoginPageModule {}
