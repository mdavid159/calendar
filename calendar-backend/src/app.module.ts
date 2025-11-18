import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { LoginPageModule } from './login-page/login-page.module';
import { RegisterPageModule } from './register-page/register-page.module';
import { PrismaModule } from './prisma/prisma.module';
import { HomePageModule } from './home-page/home-page.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    LoginPageModule,
    RegisterPageModule,
    PrismaModule,
    HomePageModule,
    ThrottlerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
