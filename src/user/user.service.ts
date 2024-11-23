import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';

type TUser = {
    name: string,
    department: string,
    email: string,
    username: string,
    password: string,
}

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async createUser(user: TUser): Promise<User | null>{
        if(user['password']){
            const salt = await genSalt(10);

            const hashedPassword = await hash(user['password'], salt);
            
            const {password, ...otherProperties} = user;

            return this.userRepository.save({password: hashedPassword, ...otherProperties});
        }
        return this.userRepository.save(user);
    }

    findUserByUsername(username: string): Promise<User | null>{
        return this.userRepository.findOne({where:{username}});
    }

    
}