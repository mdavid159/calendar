import { Module } from '@nestjs/common';
import { RegisterPageController } from './register-page.controller';
import { RegisterPageService } from './register-page.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RegisterPageController],
  providers: [RegisterPageService],
  exports: [RegisterPageService],
})
export class RegisterPageModule {}
