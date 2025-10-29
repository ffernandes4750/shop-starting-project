import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

export type JwtUser = {
  sub: string;
  email: string;
  role: 'admin' | 'user';
  iat?: number;
  exp?: number;
};

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtUser;
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const authHeader = req.header('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing Bearer token');
    }

    const token = authHeader.slice('Bearer '.length).trim();
    try {
      const payload = await this.auth.verifyToken(token);
      req.user = payload as JwtUser;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
