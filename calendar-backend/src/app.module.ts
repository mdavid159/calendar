import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { LoginPageModule } from './login-page/login-page.module';
import { RegisterPageModule } from './register-page/register-page.module';
import { PrismaModule } from './prisma/prisma.module';
import { HomePageModule } from './home-page/home-page.module';

@Module({
  imports: [LoginPageModule, RegisterPageModule, PrismaModule, HomePageModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
