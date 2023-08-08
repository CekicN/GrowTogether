import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {

    async validateUserCred(email:string, password:string):Promise<User | undefined>
    {
        return undefined;
    }
}
