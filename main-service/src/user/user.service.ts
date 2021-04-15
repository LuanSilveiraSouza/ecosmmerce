import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  getUser(): IUser {
    return { name: 'John', password: '12345' };
  }
}
