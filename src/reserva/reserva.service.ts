/**
 * Servicio ReservaService
 * Maneja la lógica de negocio para la entidad Reserva.
 * Incluye métodos para crear, obtener, actualizar y eliminar reservas.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Repository } from 'typeorm';
import { DetalleReserva } from '../detalle_reserva/entities/detalle_reserva.entity';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';
import { DetalleReservaService } from '../detalle_reserva/detalle_reserva.service';

@Injectable()
export class ReservaService {
  constructor(
    // Inyección del repositorio para acceder a la base de datos MySQL con TypeORM
    @InjectRepository(Reserva, 'austral')
    private ReservaRepository: Repository<Reserva>,
    private detalleReservaService: DetalleReservaService,
  ) {}

  /**
   * Crea una nueva reserva junto con sus detalles asociados en una transacción.
   * @param createReservaDto DTO con datos de la reserva y detalles.
   * @returns La reserva creada con sus detalles cargados.
   * @throws NotFoundException si el huésped o alguna habitación no existe.
   */
  async crearReserva(createReservaDto: CreateReservaDto): Promise<Reserva> {
    // Iniciar transacción para asegurar la atomicidad de la operación
    return await this.ReservaRepository.manager.transaction(async transactionalEntityManager => {
      // Buscar el huésped asociado a la reserva
      const huesped = await transactionalEntityManager.findOne('Huesped', {
        where: { id_huesped: createReservaDto.huespedId }
      });
      if (!huesped) {
        throw new NotFoundException(`Huésped con id ${createReservaDto.huespedId} no encontrado`);
      }

      // Crear la entidad reserva con los datos proporcionados
      const nuevaReserva = this.ReservaRepository.create({
        fecha_entrada: createReservaDto.fecha_entrada,
        fecha_salida: createReservaDto.fecha_salida,
        estado: createReservaDto.estado,
        huesped: huesped
      });
      
      // Guardar la reserva en la base de datos
      const reservaGuardada = await transactionalEntityManager.save(Reserva, nuevaReserva);

      // Si se proporcionan detalles de reserva, crear y guardar cada uno
      if (createReservaDto.detalles_reserva && createReservaDto.detalles_reserva.length > 0) {
        const detalles: DetalleReserva[] = [];
        for (const detalleDto of createReservaDto.detalles_reserva) {
          // Buscar la habitación asociada a cada detalle
          const habitacion = await transactionalEntityManager.findOne(Habitacion, {
            where: { id_habitacion: detalleDto.id_habitacion }
          });
          if (!habitacion) {
            throw new NotFoundException(`Habitacion con id ${detalleDto.id_habitacion} no encontrada`);
          }
          // Crear la entidad detalle de reserva
          const detalleReserva = new DetalleReserva();
          detalleReserva.noches = detalleDto.noches;
          detalleReserva.precio_aplicado = detalleDto.precio_aplicado;
          detalleReserva.reserva = reservaGuardada;
          detalleReserva.habitacion = habitacion;
          detalles.push(detalleReserva);
        }
        
        // Guardar todos los detalles de reserva en la base de datos
        await transactionalEntityManager.save(DetalleReserva, detalles);
      }

      // Recuperar la reserva completa con sus detalles y relaciones para devolverla
      const reservaCompleta = await transactionalEntityManager.findOne(Reserva, {
        where: { id_reserva: reservaGuardada.id_reserva },
        relations: ['detalles_reserva', 'detalles_reserva.habitacion', 'huesped']
      });

      if (!reservaCompleta) {
        throw new NotFoundException(`Error al recuperar la reserva creada`);
      }

      return reservaCompleta;
    });
  }

  /**
   * Obtiene todas las reservas con sus detalles y relaciones.
   * @returns Lista de reservas con detalles y habitaciones.
   */
  async obtenerTodasLasReservas(
    fechaEntrada?: string,
    fechaSalida?: string,
    nombreHuesped?: string,
  ): Promise<Reserva[]> {
    const query = this.ReservaRepository
      .createQueryBuilder('reserva')
      .leftJoinAndSelect('reserva.detalles_reserva', 'detalles')
      .leftJoinAndSelect('detalles.habitacion', 'habitacion')
      .leftJoinAndSelect('reserva.huesped', 'huesped');

    if (fechaEntrada) {
      query.andWhere('reserva.fecha_entrada >= :fechaEntrada', { fechaEntrada });
    }
    if (fechaSalida) {
      query.andWhere('reserva.fecha_salida <= :fechaSalida', { fechaSalida });
    }
    if (nombreHuesped) {
      query.andWhere(
        '(huesped.nombre LIKE :nombre OR huesped.apellidos LIKE :nombre)',
        { nombre: `%${nombreHuesped}%` },
      );
    }

    query.orderBy('reserva.id_reserva', 'DESC');

    const reservas = await query.getMany();
    return reservas;
  }

  /**
   * Obtiene una reserva por su ID, incluyendo detalles y relaciones.
   * @param id ID de la reserva.
   * @returns La reserva encontrada.
   * @throws NotFoundException si no se encuentra la reserva.
   */
  async obtenerReservaPorId(id: number): Promise<Reserva> {
    const reserva = await this.ReservaRepository.findOne({
      where: { id_reserva: id },
      relations: ['detalles_reserva', 'detalles_reserva.habitacion', 'huesped'],
    });
    if (!reserva) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }
    return reserva;
  }

  /**
   * Actualiza una reserva existente con nuevos datos.
   * @param id ID de la reserva a actualizar.
   * @param updateReservaDto DTO con los datos a actualizar.
   * @returns La reserva actualizada.
   * @throws NotFoundException si no se encuentra la reserva.
   */
  async actualizarReserva(id: number, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    const reserva = await this.ReservaRepository.preload({
      id_reserva: id,
      ...updateReservaDto,
    });
    if (!reserva) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada para actualizar`);
    }
    return await this.ReservaRepository.save(reserva);
  }

  /**
   * Elimina una reserva y sus detalles asociados.
   * @param id ID de la reserva a eliminar.
   * @throws NotFoundException si no se encuentra la reserva.
   */
  async eliminarReserva(id: number): Promise<void> {
    try {
      // Primero eliminar detalles asociados para evitar errores de restricción
      await this.detalleReservaService.eliminarDetallesPorReserva(id);

      // Eliminar la reserva
      const resultado = await this.ReservaRepository.delete(id);
      if (resultado.affected === 0) {
        throw new NotFoundException(`Reserva con id ${id} no encontrada para eliminar`);
      }
    } catch (error) {
      // Registrar error para depuración y relanzar
      console.error(`Error al eliminar reserva con id ${id}:`, error);
      throw error;
    }
  }
}
