import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, TUser } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    login(@Body() user: TUser){
        return this.authService.login(user.username, user.password);
    }
}
