import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import type { JwtUser } from '../types/jwtUser';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    // 1) tentar cookie
    let token = req.cookies?.accessToken;

    // 2) fallback: Authorization: Bearer <token>
    if (!token) {
      const authHeader = req.headers['authorization'];
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.slice('Bearer '.length).trim();
      }
    }

    if (!token) {
      throw new UnauthorizedException('Missing access token');
    }

    try {
      const payload = await this.auth.verifyToken(token);
      // Disponibilizar o utilizador para os handlers
      (req as any).user = payload as JwtUser;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
