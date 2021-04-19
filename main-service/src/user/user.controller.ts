import { Controller, Get } from '@nestjs/common';
import { IUser } from './user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): Array<IUser> {
    return [this.userService.getUser()];
  }
}
