import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterPageDto } from '../../dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterPageService {
  constructor(private readonly prismaService: PrismaService) {}

  async registerUser(registerPageDto: RegisterPageDto) {
    const password = registerPageDto.password;
    const passwordHash = bcrypt.hashSync(password, 10);
    await this.prismaService.user.create({
      data: {
        ...registerPageDto,
        password: passwordHash,
      },
    });
  }
}
