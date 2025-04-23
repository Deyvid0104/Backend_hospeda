import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { Factura } from './entities/factura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Factura], 'austral')],
  controllers: [FacturaController],
  providers: [FacturaService],
})
export class FacturaModule {}
