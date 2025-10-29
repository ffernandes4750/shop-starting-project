import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import type { Role } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async loginWithEmailPassword(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user || user.status !== 'active') {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload = {
      sub: String(user._id),
      email: user.email,
      role: user.role as Role,
    };
    const accessToken = await this.jwt.signAsync(payload);
    return {
      accessToken,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async verifyToken(token: string) {
    return this.jwt.verifyAsync(token);
  }
}
