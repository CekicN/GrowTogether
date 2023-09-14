import { Category } from "src/category/entities/category.entity";
import { Order } from "src/order/entities/order.entity";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity({name:"plants"})
export class Plant extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;


    @Column()
    plantType:string;

    @Column()
    address:string;

    @Column()
    description:string;

    @ManyToOne(type => User, user => user.userPlants)
    user:User;

    @ManyToOne(type => Category, category => category.plants)
    category:Category;    
}