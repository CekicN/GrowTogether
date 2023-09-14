import { BadRequestException, Injectable } from '@nestjs/common';
import { plantDto } from './DTOs/plant.dto';
import { UserService } from 'src/user/user.service';
import { Plant } from './entities/plant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { categoryDto } from 'src/category/DTOs/category.dto';

@Injectable()
export class PlantService {

    constructor(
        @InjectRepository(Plant) private plantRepository:Repository<Plant>,
        private userService:UserService,
        private categoryService:CategoryService
        ){}

    async addPlant(plantDto:plantDto, id:number)
    {
        try
        {   
            const user = await this.userService.getUserById(plantDto.userId);//user koji postavlja biljke
            if(user == null)
            {
                throw new BadRequestException("user not found");
            }

            let category = await this.categoryService.getCategoryByName(plantDto.category);
            if(category == null)
            {
                const dto:categoryDto = {
                    categoryName:plantDto.newCategory,
                    parentCategoryName:plantDto.parentCategory
                }
                category = await this.categoryService.addCategory(dto);
            }

            let plant = await this.getPlantById(id);
            plant.name = plantDto.name;
            plant.address = plantDto.address;
            plant.plantType = plantDto.plantType;
            plant.description = plantDto.description;
            plant.category = category;
            plant.user = user;

            this.plantRepository.update(plant.id, plant);
            return plant;
        }
        catch(e)
        {
            throw new BadRequestException(e.message);
        }
    }

    async addEmptyPlant()
    {
        let _plant = new Plant();
        _plant.name = "";
        _plant.plantType = "";
        _plant.address = "";
        _plant.category = null;
        _plant.description = "";
        _plant.user = null;

        const plant = this.plantRepository.create(_plant);
        return this.plantRepository.save(plant);
    }

    async getPlantById(id:number)
    {
        return Plant.findOneBy({id});
    }
    async getUserEmail(id:number)
    {
        const plant = await Plant.findOne({relations:['user'], where:{id}})

        return plant.user.email;
    }
    async getAllPlants()
    {
        return Plant.find({relations:['user','category'], select:{
            user:{
                username:true
            },
            category:{
                name:true
            }
        }});
    }

    async deletePlant(id:number)
    {
        return Plant.delete(id);
    }
}
