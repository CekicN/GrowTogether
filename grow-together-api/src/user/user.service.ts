import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRegistrationDto } from './DTOs/user-register.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
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
        user.skill = userRegisterDto.skill;
        user.role = 'user';
        
        return await user.save();
    }

    async updateUser(id:number, user:User)
    {
        return User.update(id, user);
    }
    async getUserByEmail(email:string)
    {
        return User.findOne({where:{email}});
    }
    async getUserById(id:number)
    {
        return User.findOneBy({id});
    }
    async getProfileData(id:number)
    {
        return User.createQueryBuilder('user')
                    .where("user.id = :id", { id: id })
                    .select(
                        'user.id, user.name, user.surname, user.username, user.email, user.skill'
                    ).getRawOne();
    }

}
