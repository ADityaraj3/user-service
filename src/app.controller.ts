import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { SignUpDTO } from './modules/auth/dto/signup-dto';
import { AuthService } from './modules/auth/auth.service';
import { LoginDTO } from './modules/auth/dto/login-dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'auth.sign-up' })
  async signUp(@Payload() body: SignUpDTO) {
    return this.authService.signUp(body);
  }

  @MessagePattern({ cmd: 'auth.login' })
  async login(@Payload() body: LoginDTO) {
    return this.authService.login(body);
  }

}
