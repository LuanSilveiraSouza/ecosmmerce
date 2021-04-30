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
import { createHash } from 'crypto';
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
        const userExists = await this.userService.findByName(userData.name);

        if (userExists) {
            throw new HttpException(
                {
                    message: 'User already exists',
                },
                HttpStatus.CONFLICT,
            );
        }

        return this.userService.create({
            name: userData.name,
            password: userData.password,
        });
    }

    @Delete('/:name')
    async delete(@Param() params) {
        return await this.userService.delete(params.name);
    }

    @UsePipes(new ValidationPipe())
    @Post('/login')
    async login(@Body() userData: CreateUserDto) {
        const user = await this.userService.findByName(userData.name);

        if (!user) {
            throw new HttpException(
                {
                    message: `User don't exists`,
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        const hashedPassword = createHash('sha256')
            .update(userData.password, 'utf-8')
            .digest('hex');

        if (user.password !== hashedPassword) {
            throw new HttpException(
                {
                    message: `Wrong password`,
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        const token = await this.userService.generateToken(user);

        return { token };
    }
}
