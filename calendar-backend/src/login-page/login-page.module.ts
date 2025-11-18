import { Module } from '@nestjs/common';
import { LoginPageService } from './login-page.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LoginPageController } from './login-page.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PassportModule, JwtModule.register({}), PrismaModule],
  providers: [LoginPageService, JwtStrategy],
  controllers: [LoginPageController],
  exports: [LoginPageService],
})
export class LoginPageModule {}
