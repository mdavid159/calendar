import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('home')
export class HomePageController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getToken(@Request() req) {
    console.log('✅ Guard passed. User payload:', req.user);
    return {
      message: 'Access granted',
      user: req.user,
    };
  }
}
