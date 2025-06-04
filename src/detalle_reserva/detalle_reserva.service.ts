/**
 * Servicio DetalleReservaService
 * Maneja la lógica de negocio para los detalles de reserva.
 * Incluye métodos para crear, obtener, actualizar y eliminar detalles.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleReservaDto } from './dto/create-detalle_reserva.dto';
import { UpdateDetalleReservaDto } from './dto/update-detalle_reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleReserva } from './entities/detalle_reserva.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetalleReservaService {
  constructor(
    @InjectRepository(DetalleReserva, 'austral')
    private DetalleReservaRepository: Repository<DetalleReserva>,
    @InjectRepository(Reserva, 'austral')
    private reservaRepository: Repository<Reserva>,
    @InjectRepository(Habitacion, 'austral')
    private habitacionRepository: Repository<Habitacion>,
  ) {}

  /**
   * Elimina todos los detalles asociados a una reserva.
   * @param id_reserva ID de la reserva cuyos detalles se eliminarán.
   */
  async eliminarDetallesPorReserva(id_reserva: number): Promise<void> {
    await this.DetalleReservaRepository.createQueryBuilder()
      .delete()
      .where("reserva = :id_reserva", { id_reserva })
      .execute();
  }

  /**
   * Crea un nuevo detalle de reserva.
   * @param createDetalleReservaDto DTO con datos del detalle.
   * @returns El detalle creado con la relación a la habitación cargada.
   * @throws NotFoundException si la reserva o habitación no existen.
   */
  async crearDetalle(createDetalleReservaDto: CreateDetalleReservaDto): Promise<DetalleReserva> {
    try {
      // Buscar la reserva asociada
      const reserva = await this.reservaRepository.findOneBy({ id_reserva: createDetalleReservaDto.id_reserva });
      if (!reserva) {
        throw new NotFoundException(`Reserva con id ${createDetalleReservaDto.id_reserva} no encontrada`);
      }

      // Buscar la habitación asociada
      const habitacion = await this.habitacionRepository.findOneBy({ id_habitacion: createDetalleReservaDto.id_habitacion });
      if (!habitacion) {
        throw new NotFoundException(`Habitacion con id ${createDetalleReservaDto.id_habitacion} no encontrada`);
      }

      // Crear la entidad detalle de reserva
      const nuevoDetalle = this.DetalleReservaRepository.create({
        noches: createDetalleReservaDto.noches,
        precio_aplicado: createDetalleReservaDto.precio_aplicado,
        reserva: reserva,
        habitacion: habitacion,
      });

      // Guardar el detalle en la base de datos
      const detalleGuardado = await this.DetalleReservaRepository.save(nuevoDetalle);

      // Cargar el detalle con la relación a la habitación para devolverlo
      const detalleConHabitacion = await this.DetalleReservaRepository.findOne({
        where: { id_detalle: detalleGuardado.id_detalle },
        relations: ['habitacion']
      });

      if (!detalleConHabitacion) {
        throw new NotFoundException(`No se pudo cargar el detalle de reserva recién creado con id ${detalleGuardado.id_detalle}`);
      }

      return detalleConHabitacion;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene todos los detalles de reserva con sus relaciones.
   * @returns Lista de detalles con habitaciones y reservas.
   */
  async obtenerTodosLosDetalles(): Promise<DetalleReserva[]> {
    try {
      const detalles = await this.DetalleReservaRepository.find({
        relations: ['habitacion', 'reserva', 'reserva.huesped']
      });
      return detalles;
    } catch (error) {
      throw new Error(`Error al obtener todos los detalles: ${error.message}`);
    }
  }

  /**
   * Obtiene un detalle de reserva por su ID.
   * @param id ID del detalle.
   * @returns El detalle encontrado.
   * @throws NotFoundException si no se encuentra el detalle.
   */
  async obtenerDetallePorId(id: number): Promise<DetalleReserva> {
    try {
      if (isNaN(id) || id <= 0) {
        throw new NotFoundException('ID de detalle inválido');
      }
      
      const detalle = await this.DetalleReservaRepository.findOne({
        where: { id_detalle: id },
        relations: ['habitacion']
      });

      if (!detalle) {
        throw new NotFoundException(`Detalle de reserva con id ${id} no encontrado`);
      }

      return detalle;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Actualiza un detalle de reserva existente.
   * @param id ID del detalle a actualizar.
   * @param updateDetalleReservaDto DTO con los datos a actualizar.
   * @returns El detalle actualizado.
   * @throws NotFoundException si no se encuentra el detalle.
   */
  async actualizarDetalle(id: number, updateDetalleReservaDto: UpdateDetalleReservaDto): Promise<DetalleReserva> {
    try {
      // Buscar el detalle existente
      const detalleExistente = await this.DetalleReservaRepository.findOne({
        where: { id_detalle: id },
      });

      if (!detalleExistente) {
        throw new NotFoundException(`Detalle de reserva con id ${id} no encontrado para actualizar`);
      }

      // Actualizar relaciones si se proporcionan nuevos IDs
      let reserva = detalleExistente.reserva;
      let habitacion = detalleExistente.habitacion;

      if (updateDetalleReservaDto.id_reserva) {
        const reservaEncontrada = await this.reservaRepository.findOneBy({ id_reserva: updateDetalleReservaDto.id_reserva });
        if (!reservaEncontrada) {
          throw new NotFoundException(`Reserva con id ${updateDetalleReservaDto.id_reserva} no encontrada`);
        }
        reserva = reservaEncontrada;
      }

      if (updateDetalleReservaDto.id_habitacion) {
        const habitacionEncontrada = await this.habitacionRepository.findOneBy({ id_habitacion: updateDetalleReservaDto.id_habitacion });
        if (!habitacionEncontrada) {
          throw new NotFoundException(`Habitacion con id ${updateDetalleReservaDto.id_habitacion} no encontrada`);
        }
        habitacion = habitacionEncontrada;
      }

      // Crear la entidad actualizada
      const detalleParaActualizar = this.DetalleReservaRepository.create({
        ...detalleExistente,
        ...updateDetalleReservaDto,
        reserva,
        habitacion,
      });

      // Guardar el detalle actualizado
      const detalleActualizado = await this.DetalleReservaRepository.save(detalleParaActualizar);

      // Cargar el detalle actualizado con la relación a la habitación
      const detalleConHabitacion = await this.DetalleReservaRepository.findOne({
        where: { id_detalle: detalleActualizado.id_detalle },
        relations: ['habitacion']
      });

      if (!detalleConHabitacion) {
        throw new NotFoundException(`No se pudo cargar el detalle actualizado con id ${id}`);
      }

      return detalleConHabitacion;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Elimina un detalle de reserva por su ID.
   * @param id ID del detalle a eliminar.
   * @throws NotFoundException si no se encuentra el detalle.
   */
  async eliminarDetalle(id: number): Promise<void> {
    const resultado = await this.DetalleReservaRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Detalle de reserva con id ${id} no encontrado para eliminar`);
    }
  }

  /**
   * Obtiene los detalles de reserva asociados a una reserva específica.
   * @param id_reserva ID de la reserva.
   * @returns Lista de detalles asociados.
   * @throws Error si el ID de reserva es inválido.
   */
  async obtenerDetallesPorReserva(id_reserva: number): Promise<DetalleReserva[]> {
    if (isNaN(id_reserva) || id_reserva <= 0) {
      throw new Error('ID de reserva inválido en servicio');
    }
    try {
      const detalles = await this.DetalleReservaRepository.createQueryBuilder('detalle')
        .innerJoinAndSelect('detalle.habitacion', 'habitacion')
        .innerJoinAndSelect('detalle.reserva', 'reserva')
        .innerJoinAndSelect('reserva.huesped', 'huesped')
        .leftJoinAndSelect('detalle.factura', 'factura')
        .leftJoinAndSelect('factura.detalles_factura', 'detalles_factura')
        .where('reserva.id_reserva = :id_reserva', { id_reserva })
        .getMany();
      
      if (!detalles || detalles.length === 0) {
        return [];
      }

      return detalles;
    } catch (error) {
      throw new Error(`Error al obtener detalles completos de reserva: ${error.message}`);
    }
  }

  /**
   * Obtiene los detalles de reserva asociados a una habitación específica.
   * @param id_habitacion ID de la habitación.
   * @returns Lista de detalles asociados.
   * @throws Error si ocurre un problema en la consulta.
   */
  async obtenerDetallesPorHabitacion(id_habitacion: number): Promise<DetalleReserva[]> {
    try {
      const detalles = await this.DetalleReservaRepository.createQueryBuilder('detalle')
        .leftJoinAndSelect('detalle.habitacion', 'habitacion')
        .where('habitacion.id_habitacion = :id_habitacion', { id_habitacion })
        .getMany();
      
      return detalles;
    } catch (error) {
      throw new Error(`Error al obtener detalles por habitación: ${error.message}`);
    }
  }
}
