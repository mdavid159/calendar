import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from '../../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OauthTokenDto } from '../../dto/OauthToken.dto';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class LoginPageService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  async loginWithEmailAndPassword(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prismaService.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        birthDate: true,
        name: true,
        surname: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userPassword = await this.prismaService.user.findUnique({
      where: { email: email },
      select: { password: true },
    });

    const isPasswordValid = await bcrypt.compare(
      password,
      userPassword!.password,
    );

    if (isPasswordValid) {
      const payload = { sub: user.id, username: user.email };
      return {
        access_token: this.jwtService.sign(payload),
        user,
      };
    } else {
      throw new UnauthorizedException('Invalid password');
    }
  }

  async loginWithOAuth(OAuthToken: string) {
    console.log('OAuthToken:', OAuthToken);
    const ticket = await this.googleClient.verifyIdToken({
      idToken: OAuthToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid Google token');
    }
    const { sub, email } = payload;
    const account = await this.prismaService.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: 'google',
          providerAccountId: sub,
        },
      },
      include: {
        user: true,
      },
    });

    const user = await this.prismaService.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        birthDate: true,
        name: true,
        surname: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    if (!account) {
      await this.prismaService.account.create({
        data: {
          provider: 'google',
          providerAccountId: sub,
          userId: user.id,
        },
        include: { user: true },
      });
    }

    const payloadJwt = { sub: user.id, username: user.email };

    return {
      access_token: this.jwtService.sign(payloadJwt),
      user,
    };
  }
}
