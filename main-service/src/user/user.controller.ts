import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() userData: CreateUserDto) {
    const userExists = await this.userService.findOne(userData.name);

    if (userExists) {
      throw new HttpException(
        {
          message: 'User already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    return this.userService.create(userData);
  }

  @Delete('/:name')
  async delete(@Param() params) {
    return await this.userService.delete(params.name);
  }
}
