import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { Repository, Between } from 'typeorm';
import { DetalleFactura } from '../detalle_factura/entities/detalle_factura.entity';

@Injectable()
export class FacturaService {
  constructor(
    // Inyección del repositorio para acceder a la base de datos MySQL con TypeORM
    @InjectRepository(Factura, 'austral')
    private FacturaRepository: Repository<Factura>,
    @InjectRepository(DetalleFactura, 'austral')
    private DetalleFacturaRepository: Repository<DetalleFactura>,
  ) {}

  // Crear una nueva factura en la base de datos
  async crearFactura(createFacturaDto: CreateFacturaDto): Promise<Factura> {
    // Calcular monto_total basado en detalles de factura antes de guardar
    let montoTotal = createFacturaDto.monto_total || 0;
    if (createFacturaDto.id_reserva) {
      // Obtener detalles de factura asociados a la reserva
      const detalles = await this.DetalleFacturaRepository.find({
        where: { factura: { id_factura: createFacturaDto.id_reserva } },
      });
      if (detalles.length > 0) {
        montoTotal = detalles.reduce((total, detalle) => {
          return total + detalle.cantidad * Number(detalle.precio_unitario);
        }, 0);
        // Aplicar descuento si existe
        if (createFacturaDto.descuento) {
          montoTotal = montoTotal - (montoTotal * createFacturaDto.descuento) / 100;
        }
      }
    }
    createFacturaDto.monto_total = montoTotal;
    const nuevaFactura = this.FacturaRepository.create({
      ...createFacturaDto,
      reserva: { id_reserva: createFacturaDto.id_reserva },
    });
    return await this.FacturaRepository.save(nuevaFactura);
  }

  // Obtener todas las facturas registradas o filtradas por estado y método de pago
  async obtenerFacturasFiltradas(estado?: string, metodo_pago?: string): Promise<Factura[]> {
    const where: any = {};
    if (estado) {
      where.estado = estado;
    }
    if (metodo_pago) {
      where.metodo_pago = metodo_pago;
    }
    return await this.FacturaRepository.find({
      where,
      relations: ['reserva', 'reserva.detalles_reserva', 'reserva.detalles_reserva.habitacion', 'detalles_factura'],
    });
  }

  // Obtener todas las facturas registradas
  async obtenerTodasLasFacturas(): Promise<Factura[]> {
    return await this.FacturaRepository.find({
      relations: ['reserva', 'reserva.detalles_reserva', 'reserva.detalles_reserva.habitacion', 'detalles_factura'],
    });
  }

  // Obtener una factura por su identificador único
  async obtenerFacturaPorId(id: number): Promise<Factura> {
    const factura = await this.FacturaRepository.findOne({
      where: { id_factura: id },
      relations: [
        'reserva',
        'reserva.huesped',
        'reserva.detalles_reserva',
        'reserva.detalles_reserva.habitacion',
        'detalles_factura',
      ],
    });
    if (!factura) {
      // Lanzar excepción si no se encuentra la factura
      throw new NotFoundException(`Factura con id ${id} no encontrada`);
    }
    return factura;
  }

  // Actualizar los datos de una factura existente por su id
  async actualizarFactura(id: number, updateFacturaDto: UpdateFacturaDto): Promise<Factura> {
    // Calcular monto_total basado en detalles de factura antes de actualizar
    let montoTotal = updateFacturaDto.monto_total || 0;
    if (updateFacturaDto.id_reserva) {
      // Obtener detalles de factura asociados a la reserva
      const detalles = await this.DetalleFacturaRepository.find({
        where: { factura: { id_factura: id } },
      });
      if (detalles.length > 0) {
        montoTotal = detalles.reduce((total, detalle) => {
          return total + detalle.cantidad * Number(detalle.precio_unitario);
        }, 0);
        // Aplicar descuento si existe
        if (updateFacturaDto.descuento) {
          montoTotal = montoTotal - (montoTotal * updateFacturaDto.descuento) / 100;
        }
      }
    }
    updateFacturaDto.monto_total = montoTotal;
    const factura = await this.FacturaRepository.preload({
      id_factura: id,
      ...updateFacturaDto,
      reserva: updateFacturaDto.id_reserva ? { id_reserva: updateFacturaDto.id_reserva } : undefined,
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
