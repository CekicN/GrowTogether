import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(private userService:UserService, private jwtService:JwtService){}

    async validateUserCred(email:string, password:string):Promise<any>
    {
        const user = await this.userService.getUserByEmail(email);
        if(!user) throw new BadRequestException();

        if(!(await bcrypt.compare(password,user.password))) throw new UnauthorizedException();

        return user;
    }

    async generateToken(user:User)
    {
        return {
            token: this.jwtService.sign({
                username:user.username,
                email:user.email,
                role:user.role,
                sub: user.id
            })
        }
    }
}
