import { Injectable } from '@nestjs/common';
import { UserRegistrationDto } from './DTOs/user-register.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {

    async registerUser(userRegisterDto:UserRegistrationDto)
    {

        const crypt = await bcrypt.genSalt();
        const cryptPassword:string = await bcrypt.hash(userRegisterDto.password, crypt);

        const user = new User();
        user.name = userRegisterDto.name;
        user.surname = userRegisterDto.surname;
        user.username = userRegisterDto.username;
        user.email = userRegisterDto.email; 
        user.password = cryptPassword;

        return await user.save();
    }
}
