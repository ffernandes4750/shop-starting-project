export type JwtUser = {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  iat?: number;
  exp?: number;
};

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtUser;
  }
}
