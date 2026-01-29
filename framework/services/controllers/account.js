import { BaseController } from './base.js';

export class AccountController extends BaseController {

  async createUser(userName, password) {
    return this.post('/Account/v1/User', {
      data: { userName, password }
    });
  }

  async generateToken(userName, password) {
    return this.post('/Account/v1/GenerateToken', {
      data: { userName, password }
    });
  }
}