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
