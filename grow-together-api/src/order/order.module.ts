import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {ConfigService} from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { PlantModule } from 'src/plant/plant.module';

@Module({
  imports:[UserModule, PlantModule],
  controllers: [OrderController],
  providers: [OrderService, ConfigService]
})
export class OrderModule {}
