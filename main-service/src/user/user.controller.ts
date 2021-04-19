import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { IUser } from './user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() userData: IUser) {
    return this.userService.create(userData);
  }

  @Delete('/:name')
  async delete(@Param() params) {
    return await this.userService.delete(params.name);
  }
}
