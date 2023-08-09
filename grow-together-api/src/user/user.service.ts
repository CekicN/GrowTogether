import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRegistrationDto } from './DTOs/user-register.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {

    async registerUser(userRegisterDto:UserRegistrationDto)
    {
        const u = await this.getUserByEmail(userRegisterDto.email);
        if(u) throw new BadRequestException();

        const crypt = await bcrypt.genSalt();
        const cryptPassword:string = await bcrypt.hash(userRegisterDto.password, crypt);

        const user = new User();
        user.name = userRegisterDto.name;
        user.surname = userRegisterDto.surname;
        user.username = userRegisterDto.username;
        user.email = userRegisterDto.email; 
        user.password = cryptPassword;
        user.role = 'user';
        
        return await user.save();
    }

    async getUserByEmail(email:string)
    {
        return User.findOne({where:{email}});
    }
    async getUserById(id:number)
    {
        return User.findOneBy({id});
    }
}
