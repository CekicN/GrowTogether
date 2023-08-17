import { IsNotEmpty } from "class-validator";


export class plantDto{

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    plantType:string;

    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    category:string;

    newCategory:string;

    parentCategory:string;
    
    @IsNotEmpty()
    userId:number;
}