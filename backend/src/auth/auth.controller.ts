import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private users: UsersService,
  ) {}

  @HttpCode(200)
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() dto: LoginDto) {
    return this.auth.loginWithEmailPassword(dto.email, dto.password);
  }

  // FEITO DE UMA MANEIRA PARA DEBUG (EM VEZ DE DAR ERROS E PARAR A EXECUÇÃO RETORNAS NULOS)
  @Get('me')
  async me(@Headers('authorization') authHeader?: string) {
    if (!authHeader?.startsWith('Bearer ')) {
      return { user: null };
    }
    const token = authHeader.slice('Bearer '.length);
    const payload = await this.auth.verifyToken(token);
    const user = await this.users.findByEmail(payload.email);
    if (!user) return { user: null };
    return {
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
