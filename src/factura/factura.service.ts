import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { Repository, Between } from 'typeorm';

@Injectable()
export class FacturaService {
  constructor(
    // Inyección del repositorio para acceder a la base de datos MySQL con TypeORM
    @InjectRepository(Factura, 'austral')
    private FacturaRepository: Repository<Factura>,
  ) {}

  // Crear una nueva factura en la base de datos
  async crearFactura(createFacturaDto: CreateFacturaDto): Promise<Factura> {
    const nuevaFactura = this.FacturaRepository.create(createFacturaDto);
    return await this.FacturaRepository.save(nuevaFactura);
  }

  // Obtener todas las facturas registradas
  async obtenerTodasLasFacturas(): Promise<Factura[]> {
    return await this.FacturaRepository.find();
  }

  // Obtener una factura por su identificador único
  async obtenerFacturaPorId(id: number): Promise<Factura> {
    const factura = await this.FacturaRepository.findOneBy({ id_factura: id });
    if (!factura) {
      // Lanzar excepción si no se encuentra la factura
      throw new NotFoundException(`Factura con id ${id} no encontrada`);
    }
    return factura;
  }

  // Actualizar los datos de una factura existente por su id
  async actualizarFactura(id: number, updateFacturaDto: UpdateFacturaDto): Promise<Factura> {
    const factura = await this.FacturaRepository.preload({
      id_factura: id,
      ...updateFacturaDto,
    });
    if (!factura) {
      // Lanzar excepción si no se encuentra la factura para actualizar
      throw new NotFoundException(`Factura con id ${id} no encontrada para actualizar`);
    }
    return await this.FacturaRepository.save(factura);
  }

  // Eliminar una factura por su id
  async eliminarFactura(id: number): Promise<void> {
    const resultado = await this.FacturaRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró la factura para eliminar
      throw new NotFoundException(`Factura con id ${id} no encontrada para eliminar`);
    }
  }

  // Obtener facturas filtradas por rango de monto_total
  async obtenerFacturasPorRangoMonto(montoMin: number, montoMax: number): Promise<Factura[]> {
    return await this.FacturaRepository.find({
      where: { monto_total: Between(montoMin, montoMax) },
    });
  }

  // Obtener facturas filtradas por método de pago
  async obtenerFacturasPorMetodoPago(metodo: 'efectivo' | 'tarjeta' | 'transferencia'): Promise<Factura[]> {
    return await this.FacturaRepository.find({ where: { metodo_pago: metodo } });
  }
}
