import { Module } from '@nestjs/common';
import { ContactoEmergenciaService } from './contacto_emergencia.service';
import { ContactoEmergenciaController } from './contacto_emergencia.controller';
import { ContactoEmergencia } from './entities/contacto_emergencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Huesped } from '../huesped/entities/huesped.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactoEmergencia, Huesped], 'austral'),],
  controllers: [ContactoEmergenciaController],
  providers: [ContactoEmergenciaService],
  exports: [ContactoEmergenciaService],
})
export class ContactoEmergenciaModule {}
