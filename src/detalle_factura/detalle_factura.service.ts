import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleFacturaDto } from './dto/create-detalle_factura.dto';
import { UpdateDetalleFacturaDto } from './dto/update-detalle_factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleFactura } from './entities/detalle_factura.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetalleFacturaService {
  constructor(
    // Inyección del repositorio para acceder a la base de datos
    @InjectRepository(DetalleFactura, 'austral')
    private DetalleFacturaRepository: Repository<DetalleFactura>,
  ) {}

  // Método para crear un nuevo detalle de factura
  async crearDetalle(createDetalleFacturaDto: CreateDetalleFacturaDto): Promise<DetalleFactura> {
    const nuevoDetalle = this.DetalleFacturaRepository.create(createDetalleFacturaDto);
    // Guardar el nuevo detalle en la base de datos
    return await this.DetalleFacturaRepository.save(nuevoDetalle);
  }

  // Método para obtener todos los detalles de factura
  async obtenerTodosLosDetalles(): Promise<DetalleFactura[]> {
    return await this.DetalleFacturaRepository.find();
  }

  // Método para obtener un detalle de factura por su id
  async obtenerDetallePorId(id: number): Promise<DetalleFactura> {
    const detalle = await this.DetalleFacturaRepository.findOneBy({ id_detalle_factura: id });
    if (!detalle) {
      // Lanzar excepción si no se encuentra el detalle
      throw new NotFoundException(`Detalle de factura con id ${id} no encontrado`);
    }
    return detalle;
  }

  // Método para actualizar un detalle de factura por su id
  async actualizarDetalle(id: number, updateDetalleFacturaDto: UpdateDetalleFacturaDto): Promise<DetalleFactura> {
    const detalle = await this.DetalleFacturaRepository.preload({
      id_detalle_factura: id,
      ...updateDetalleFacturaDto,
    });
    if (!detalle) {
      // Lanzar excepción si no se encuentra el detalle a actualizar
      throw new NotFoundException(`Detalle de factura con id ${id} no encontrado para actualizar`);
    }
    // Guardar los cambios en la base de datos
    return await this.DetalleFacturaRepository.save(detalle);
  }

  // Método para eliminar un detalle de factura por su id
  async eliminarDetalle(id: number): Promise<void> {
    const resultado = await this.DetalleFacturaRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró el detalle para eliminar
      throw new NotFoundException(`Detalle de factura con id ${id} no encontrado para eliminar`);
    }
  }

  // Método para obtener detalles por id_factura
  async obtenerDetallesPorFactura(id_factura: number): Promise<DetalleFactura[]> {
    return await this.DetalleFacturaRepository.find({
      where: { id_factura },
    });
  }

  // Método para obtener detalles por id_servicio
  async obtenerDetallesPorServicio(id_servicio: number): Promise<DetalleFactura[]> {
    return await this.DetalleFacturaRepository.find({
      where: { id_servicio },
    });
  }
}
