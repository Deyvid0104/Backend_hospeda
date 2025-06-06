/**
 * Servicio DetalleFacturaService
 * Maneja la lógica de negocio para los detalles de factura.
 * Incluye métodos para crear, obtener, actualizar y eliminar detalles.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleFacturaDto } from './dto/create-detalle_factura.dto';
import { UpdateDetalleFacturaDto } from './dto/update-detalle_factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleFactura } from './entities/detalle_factura.entity';
import { Repository } from 'typeorm';
import { Factura } from '../factura/entities/factura.entity';
import { ServicioAdicional } from '../servicio_adicional/entities/servicio_adicional.entity';

@Injectable()
export class DetalleFacturaService {
  constructor(
    // Inyección del repositorio para acceder a la base de datos
    @InjectRepository(DetalleFactura, 'austral')
    private DetalleFacturaRepository: Repository<DetalleFactura>,
    @InjectRepository(Factura, 'austral')
    private FacturaRepository: Repository<Factura>,
    @InjectRepository(ServicioAdicional, 'austral')
    private ServicioAdicionalRepository: Repository<ServicioAdicional>,
  ) {}

  /**
   * Crea un nuevo detalle de factura.
   * @param createDetalleFacturaDto DTO con datos del detalle.
   * @returns El detalle creado.
   */
  async crearDetalle(createDetalleFacturaDto: CreateDetalleFacturaDto): Promise<DetalleFactura> {
    // Buscar la factura por id_factura
    const factura = await this.FacturaRepository.findOneBy({ id_factura: createDetalleFacturaDto.id_factura });
    if (!factura) {
      throw new NotFoundException(`Factura con id ${createDetalleFacturaDto.id_factura} no encontrada`);
    }

    // Buscar el servicio adicional por id_servicio
    const servicio = await this.ServicioAdicionalRepository.findOneBy({ id_servicio: createDetalleFacturaDto.id_servicio });
    if (!servicio) {
      throw new NotFoundException(`Servicio adicional con id ${createDetalleFacturaDto.id_servicio} no encontrado`);
    }

    // Crear el detalle con las relaciones factura y servicio
    const nuevoDetalle = this.DetalleFacturaRepository.create({
      concepto: createDetalleFacturaDto.concepto,
      cantidad: createDetalleFacturaDto.cantidad,
      precio_unitario: createDetalleFacturaDto.precio_unitario,
      factura: factura,
      servicio: servicio,
    });
    // Guardar el nuevo detalle en la base de datos
    return await this.DetalleFacturaRepository.save(nuevoDetalle);
  }

  /**
   * Obtiene todos los detalles de factura.
   * @returns Lista de detalles.
   */
  async obtenerTodosLosDetalles(): Promise<DetalleFactura[]> {
    return await this.DetalleFacturaRepository.find();
  }

  /**
   * Obtiene un detalle de factura por su ID.
   * @param id ID del detalle.
   * @returns El detalle encontrado.
   * @throws NotFoundException si no se encuentra el detalle.
   */
  async obtenerDetallePorId(id: number): Promise<DetalleFactura> {
    const detalle = await this.DetalleFacturaRepository.findOneBy({ id_detalle_factura: id });
    if (!detalle) {
      // Lanzar excepción si no se encuentra el detalle
      throw new NotFoundException(`Detalle de factura con id ${id} no encontrado`);
    }
    return detalle;
  }

  /**
   * Actualiza un detalle de factura existente.
   * @param id ID del detalle a actualizar.
   * @param updateDetalleFacturaDto DTO con datos a actualizar.
   * @returns El detalle actualizado.
   * @throws NotFoundException si no se encuentra el detalle.
   */
  async actualizarDetalle(id: number, updateDetalleFacturaDto: UpdateDetalleFacturaDto): Promise<DetalleFactura> {
    // Buscar la factura si se recibe id_factura
    let factura: Factura | null | undefined = undefined;
    if (updateDetalleFacturaDto.id_factura) {
      factura = await this.FacturaRepository.findOneBy({ id_factura: updateDetalleFacturaDto.id_factura });
      if (!factura) {
        throw new NotFoundException(`Factura con id ${updateDetalleFacturaDto.id_factura} no encontrada`);
      }
    }

    // Buscar el servicio adicional si se recibe id_servicio
    let servicio: ServicioAdicional | null | undefined = undefined;
    if (updateDetalleFacturaDto.id_servicio) {
      servicio = await this.ServicioAdicionalRepository.findOneBy({ id_servicio: updateDetalleFacturaDto.id_servicio });
      if (!servicio) {
        throw new NotFoundException(`Servicio adicional con id ${updateDetalleFacturaDto.id_servicio} no encontrado`);
      }
    }

    // Preload para actualizar el detalle
    const detalle = await this.DetalleFacturaRepository.preload({
      id_detalle_factura: id,
      concepto: updateDetalleFacturaDto.concepto,
      cantidad: updateDetalleFacturaDto.cantidad,
      precio_unitario: updateDetalleFacturaDto.precio_unitario,
      factura: factura ?? undefined,
      servicio: servicio ?? undefined,
    });
    if (!detalle) {
      // Lanzar excepción si no se encuentra el detalle a actualizar
      throw new NotFoundException(`Detalle de factura con id ${id} no encontrado para actualizar`);
    }
    // Guardar los cambios en la base de datos
    return await this.DetalleFacturaRepository.save(detalle);
  }

  /**
   * Elimina un detalle de factura por su ID.
   * @param id ID del detalle a eliminar.
   * @throws NotFoundException si no se encuentra el detalle.
   */
  async eliminarDetalle(id: number): Promise<void> {
    const resultado = await this.DetalleFacturaRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró el detalle para eliminar
      throw new NotFoundException(`Detalle de factura con id ${id} no encontrado para eliminar`);
    }
  }

  /**
   * Obtiene detalles de factura por ID de factura.
   * @param id_factura ID de la factura.
   * @returns Lista de detalles asociados.
   */
  async obtenerDetallesPorFactura(id_factura: number): Promise<DetalleFactura[]> {
    return await this.DetalleFacturaRepository.find({
      where: { factura: { id_factura } },
      relations: ['factura', 'servicio'],
    });
  }

  /**
   * Obtiene detalles de factura por ID de servicio.
   * @param id_servicio ID del servicio.
   * @returns Lista de detalles asociados.
   */
  async obtenerDetallesPorServicio(id_servicio: number): Promise<DetalleFactura[]> {
    return await this.DetalleFacturaRepository.find({
      where: { servicio: { id_servicio } },
    });
  }
}
