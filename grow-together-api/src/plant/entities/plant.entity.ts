import { User } from "src/user/entities/user.entity";
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity({name:"plants"})
export class Plant extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id:number;
    //...

    @ManyToOne(type => User, user => user.userPlants)
    user:User;
}