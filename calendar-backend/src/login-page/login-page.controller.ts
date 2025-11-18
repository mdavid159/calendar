import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginPageService } from './login-page.service';
import { LoginDto } from '../../dto/login.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../models/JwtPayload.model';
import { Throttle } from '@nestjs/throttler';

@Throttle({ default: { limit: 10, ttl: 30000 } })
@Controller('login-page')
export class LoginPageController {
  constructor(
    public loginPageService: LoginPageService,
    public jwtService: JwtService,
  ) {}

  @Post('login')
  async loginUser(
    @Body() loginPageDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, accessToken, refreshToken } =
      await this.loginPageService.loginWithEmailAndPassword(loginPageDto);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/login-page',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { accessToken, user };
  }

  @Post('google')
  async loginUserOauth(@Body('OAuthToken') OAuthToken: string) {
    return this.loginPageService.loginWithOAuth(OAuthToken);
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const refreshToken: string = req.cookies['refresh_token'];
    if (!refreshToken) throw new UnauthorizedException('No refresh token');

    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.loginPageService.refreshTokens(
      payload.sub,
      refreshToken,
    );

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/login-page',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { accessToken: tokens.accessToken };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const refreshToken: string = req.cookies['refresh_token'];
    if (!refreshToken) throw new UnauthorizedException('No refresh token');

    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.loginPageService.logout(payload.sub);

    res.clearCookie('refresh_token');

    return { message: 'Logged out' };
  }
}
