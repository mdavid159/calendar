import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from '../../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import * as R from 'remeda';

@Injectable()
export class LoginPageService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  async generateTokens(userId: string, email: string) {
    const accessToken = await this.jwtService.signAsync(
      { sub: userId, username: email },
      { expiresIn: '15m', secret: process.env.JWT_ACCESS_SECRET },
    );

    const refreshToken = await this.jwtService.signAsync(
      { sub: userId, username: email },
      { expiresIn: '7d', secret: process.env.JWT_REFRESH_SECRET },
    );

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: hash,
      },
    });
  }

  async loginWithEmailAndPassword(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const userWithPassword = await this.prismaService.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        birthDate: true,
        name: true,
        surname: true,
        password: true,
      },
    });

    if (!userWithPassword) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      userWithPassword.password,
    );

    if (isPasswordValid) {
      const tokens = await this.generateTokens(
        userWithPassword.id,
        userWithPassword.email,
      );
      await this.updateRefreshToken(userWithPassword.id, tokens.refreshToken);
      const user = R.pick(userWithPassword, [
        'id',
        'email',
        'birthDate',
        'name',
        'surname',
      ]);
      return { user, ...tokens };
    } else {
      throw new UnauthorizedException('Invalid password');
    }
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user || !user.refreshTokenHash)
      throw new UnauthorizedException('Access denied');

    const tokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );
    if (!tokenMatches) {
      throw new UnauthorizedException('Access denied');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
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

    const userWithPassword = await this.prismaService.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        birthDate: true,
        name: true,
        surname: true,
        password: true,
      },
    });

    if (!userWithPassword) {
      throw new NotFoundException('User not found!');
    }

    if (!account) {
      await this.prismaService.account.create({
        data: {
          provider: 'google',
          providerAccountId: sub,
          userId: userWithPassword.id,
        },
        include: { user: true },
      });
    }

    const tokens = await this.generateTokens(
      userWithPassword.id,
      userWithPassword.email,
    );
    await this.updateRefreshToken(userWithPassword.id, tokens.refreshToken);
    const user = R.pick(userWithPassword, [
      'id',
      'email',
      'birthDate',
      'name',
      'surname',
    ]);

    return {
      user,
      ...tokens,
    };
  }

  async logout(userId: string) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        refreshTokenHash: null,
      },
    });
  }
}
