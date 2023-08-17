import { Module } from '@nestjs/common';
import { PlantService } from './plant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from './entities/plant.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';
import { PlantController } from './plant.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Plant]), UserModule, CategoryModule],
  providers: [PlantService],
  exports:[PlantService],
  controllers: [PlantController]
})
export class PlantModule {}
