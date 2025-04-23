import { Module } from '@nestjs/common';
import { HuespedService } from './huesped.service';
import { HuespedController } from './huesped.controller';
import { Huesped } from './entities/huesped.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Huesped],"austral")],
  controllers: [HuespedController],
  providers: [HuespedService],
})
export class HuespedModule {}
