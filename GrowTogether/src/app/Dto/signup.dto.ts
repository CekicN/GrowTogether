import { Skill } from "../Models/user.model";

export interface signupDto{
    name:string,
    surname:string,
    username:string,
    email:string,
    password:string,
    confirmPassword:string,
    skill:string
}