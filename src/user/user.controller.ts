import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService : UserService){}

    @Post('signup')
    async createUser(
        @Body()user
    ){
        return await this.userService.createUser(user);
    }
    }
