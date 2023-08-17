import { Body, Controller, Get, Post } from '@nestjs/common';
import { categoryDto } from './DTOs/category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

    constructor(private categoryService:CategoryService) {
        
    }

    @Post('addCategory')
    async addCategory(@Body() categoryDto:categoryDto)
    {
        return this.categoryService.addCategory(categoryDto);
    }

    @Get('getCategories')
    async getCategories()
    {
        return this.categoryService.getCategories();
    }
}
