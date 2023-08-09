import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PlantModule } from './plant/plant.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, AuthModule, PlantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
