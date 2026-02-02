import { BaseController } from './base.js';

interface AuthRequest {
  userName: string;
  password: string;
};

export class AccountController extends BaseController {
  async createUser(userName: string, password: string) {
    return this.post('/Account/v1/User', {
      data: { userName, password } as AuthRequest,
    });
  }

  async generateToken(userName: string, password: string) {
    return this.post('/Account/v1/GenerateToken', {
      data: { userName, password } as AuthRequest,
    });
  }
}