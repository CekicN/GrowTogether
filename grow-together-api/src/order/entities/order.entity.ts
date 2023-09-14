import { Plant } from "src/plant/entities/plant.entity";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, JoinColumn, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity({name:"orders"})
export class Order extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    quantity:number;

    @ManyToOne(type => User, user => user.orders)
    user:User;

    @Column()
    plant:string

    @Column()
    email:string
}