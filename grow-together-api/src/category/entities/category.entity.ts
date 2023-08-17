import { Plant } from "src/plant/entities/plant.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity({name:"category"})
export class Category extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @ManyToOne(type => Category, category => category.subcategories)    
    parentCategory:Category;

    @OneToMany(type => Category, category => category.parentCategory)
    subcategories:Category[];

    @OneToMany(type => Plant, plant => plant.category)
    plants:Plant[];

}