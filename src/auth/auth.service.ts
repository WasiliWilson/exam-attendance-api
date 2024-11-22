import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

export type TUser = {
    username: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async login(username: string, pass: string){
        const user = await this.userService.findUserByUsername(username);

        if(!user){
            throw new TypeError('user not found');
        }

        const res = await bcrypt.compare(pass, user?.password);

        if(!res){
            throw new UnauthorizedException();
        }

        const payload = {sub: user.id, username: user.username};
        //generate jwt
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
