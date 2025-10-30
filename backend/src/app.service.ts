import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getBackend(): string {
    return 'Backend!';
  }
}
