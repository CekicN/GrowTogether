import { IsNotEmpty } from "class-validator";


export class orderDto{

    @IsNotEmpty()
    plantId:number;

    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    quantity:number;
}