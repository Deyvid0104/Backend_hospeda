import { Module } from '@nestjs/common';
import { ContactoEmergenciaService } from './contacto_emergencia.service';
import { ContactoEmergenciaController } from './contacto_emergencia.controller';
import { ContactoEmergencia } from './entities/contacto_emergencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ContactoEmergencia],'austral')],
  controllers: [ContactoEmergenciaController],
  providers: [ContactoEmergenciaService],
})
export class ContactoEmergenciaModule {}
