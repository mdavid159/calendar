import { Body, Controller, Post } from '@nestjs/common';
import { LoginPageService } from './login-page.service';
import { LoginDto } from '../../dto/login.dto';

@Controller('login-page')
export class LoginPageController {
  constructor(public loginPageService: LoginPageService) {}

  @Post('login')
  async loginUser(@Body() loginPageDto: LoginDto) {
    return this.loginPageService.loginWithEmailAndPassword(loginPageDto);
  }

  @Post('google')
  async loginUserOauth(@Body('OAuthToken') OAuthToken: string) {
    return this.loginPageService.loginWithOAuth(OAuthToken);
  }
}
