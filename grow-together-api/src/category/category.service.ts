import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { categoryDto } from './DTOs/category.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(Category) private categoryRepository:Repository<Category>){}

    async addCategory(categoryDto:categoryDto)
    {
        const category = await this.getCategoryByName(categoryDto.categoryName);
        if(category)
        {
            throw new BadRequestException("This category already exist");
        }

        const parentCategory = await this.getCategoryByName(categoryDto.parentCategoryName);
        
        const subcategory = {
            name:categoryDto.categoryName,
            parentCategory: parentCategory || null
        }

        return await this.createCategory(subcategory);

    }

    async getCategories()
    {
        try{
            const categories = await this.categoryRepository.find({relations:['subcategories','parentCategory']});
            console.log(categories);

            const result:Category[] = [];
            const rez:Category[] = [];
            const processedCategoryIds:Set<number> = new Set();

            for(const category of categories)
            {
                
                if(!processedCategoryIds.has(category.id))
                {
                    result.push(category);
                    processedCategoryIds.add(category.id);
                    this.addSubcategoriesRecursive(category.subcategories, result, processedCategoryIds);
                }
            }
            console.log(result)
            for(const res of result)
            {
                if(res.parentCategory === null)
                {
                    rez.push(res)
                }
            }

            return rez;
        }catch(e)
        {
            throw new BadRequestException(e.message);
        }
    }

    private addSubcategoriesRecursive(subcategories:Category[]|undefined, result:Category[], processedCategoryIds:Set<number>)
    {
        if(subcategories !== undefined)
        {
            for(const subcategory of subcategories)
            {
                if(!processedCategoryIds.has(subcategory.id))
                {
                    result.push(subcategory);
                    processedCategoryIds.add(subcategory.id);

                    this.addSubcategoriesRecursive(subcategory.subcategories, result, processedCategoryIds);
                }
            }
        }
        
    }
    async getCategoryByName(name:string)
    {
        return Category.findOne({where:{name}});
    }

    async createCategory(data: Partial<Category>):Promise<Category>
    {
        const category = this.categoryRepository.create(data);
        return this.categoryRepository.save(category);
    }
}
