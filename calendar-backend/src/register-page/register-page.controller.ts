import { Controller, Post, Body } from '@nestjs/common';
import { RegisterPageService } from './register-page.service';
import { RegisterPageDto } from '../../dto/register.dto';
import { Throttle } from '@nestjs/throttler';

@Throttle({ default: { limit: 10, ttl: 30000 } })
@Controller('register-page')
export class RegisterPageController {
  constructor(private readonly registerPageService: RegisterPageService) {}

  @Post('register')
  async registerUser(@Body() registerPageDto: RegisterPageDto) {
    return this.registerPageService.registerUser(registerPageDto);
  }
}
