import { Plant } from "src/plant/entities/plant.entity";
import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

export enum Skill{
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced"
}

@Entity({name:"users"})
export class User extends BaseEntity{

    //Podaci pri registraciji
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    surname:string;

    @Column()
    username:string;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column({
        type:"enum",
        enum:Skill,
        default:Skill.BEGINNER
    })
    skill:Skill;
    
    @Column()
    role:string;
    
    @CreateDateColumn()
    createdAt:Date;

    //Podaci za profil

    @Column({nullable:true})
    profileImagePath:string;

    @OneToMany(type => Plant, plant => plant.user)
    userPlants:Plant[];
}

