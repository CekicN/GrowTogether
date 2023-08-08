import {IsEmail, IsNotEmpty, Length, Matches} from 'class-validator';
import { MESSAGES, REGEX } from 'src/app.utils';

export class UserRegistrationDto
{
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    surname:string;

    @IsNotEmpty()
    username:string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_REG, {message:MESSAGES.PASSWORD_MSG})
    password:string;

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_REG, {message:MESSAGES.PASSWORD_MSG})
    confirmPassword:string;
}