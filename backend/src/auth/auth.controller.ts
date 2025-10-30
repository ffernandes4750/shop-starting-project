import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiBody,
} from '@nestjs/swagger';
import type { Response, Request } from 'express';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Autenticar utilizador' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Autenticado com sucesso; cookie httpOnly é definido',
    schema: {
      example: {
        user: {
          id: '6716a2e3bcd1234abcd56789',
          name: 'Admin',
          email: 'admin@example.com',
          role: 'admin',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Pedido inválido (por ex., payload mal formatado)',
    schema: {
      example: {
        statusCode: 400,
        error: 'Bad Request',
        message: ['email must be an email'],
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciais inválidas',
    schema: {
      example: {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Invalid credentials',
      },
    },
  })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.authService.loginWithEmailPassword(
      dto.email,
      dto.password,
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60, // 1h
    });

    return { user };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter utilizador autenticado (via cookie JWT)' })
  @ApiCookieAuth('accessToken')
  @ApiOkResponse({
    description: 'Utilizador autenticado',
    schema: {
      example: {
        user: {
          id: '6716a2e3bcd1234abcd56789',
          name: 'Admin',
          email: 'admin@example.com',
          role: 'admin',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Não autenticado (cookie ausente ou inválido)',
    schema: {
      example: {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Unauthorized',
      },
    },
  })
  async me(@Req() req: Request) {
    return { user: (req as any).user };
  }

  @Post('logout')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Terminar sessão (limpar cookie JWT)' })
  @ApiCookieAuth('accessToken')
  @ApiNoContentResponse({ description: 'Sessão terminada' })
  @ApiUnauthorizedResponse({
    description: 'Não autenticado',
    schema: {
      example: {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Unauthorized',
      },
    },
  })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }
}
