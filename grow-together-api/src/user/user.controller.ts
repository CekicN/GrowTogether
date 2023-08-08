import { Body, Controller, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistrationDto } from './DTOs/user-register.dto';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @Post('/register')
    async registerUser(
        @Body(new ValidationPipe({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})) userRegisterDto:UserRegistrationDto
        ){

        return await this.userService.registerUser(userRegisterDto);
    }
}
