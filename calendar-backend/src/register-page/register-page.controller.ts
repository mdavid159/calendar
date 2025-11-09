import { Controller, Post, Body } from '@nestjs/common';
import { RegisterPageService } from './register-page.service';
import { RegisterPageDto } from '../../dto/register.dto';

@Controller('register-page')
export class RegisterPageController {
  constructor(private readonly registerPageService: RegisterPageService) {}

  @Post('register')
  async registerUser(@Body() registerPageDto: RegisterPageDto) {
    return this.registerPageService.registerUser(registerPageDto);
  }
}
