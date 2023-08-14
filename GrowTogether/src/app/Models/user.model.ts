
export enum Skill
{
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced"
}

export interface User{
    id:number,
    name:string,
    surname:string,
    username:string,
    email:string,
    role:string,
    skill:Skill,
    createdAt:string,
    profileImagePath:string
}