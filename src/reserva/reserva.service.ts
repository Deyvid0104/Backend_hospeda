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

@Injectable()
export class ReservaService {
  constructor(
    // Inyección del repositorio para acceder a la base de datos MySQL con TypeORM
    @InjectRepository(Reserva, 'austral')
    private ReservaRepository: Repository<Reserva>,
  ) {}

  // Crear una nueva reserva en la base de datos
  async crearReserva(createReservaDto: CreateReservaDto): Promise<Reserva> {
    // Iniciar transacción para asegurar que tanto la reserva como sus detalles se guarden correctamente
    return await this.ReservaRepository.manager.transaction(async transactionalEntityManager => {
      // Crear la reserva
      const nuevaReserva = this.ReservaRepository.create({
        fecha_entrada: createReservaDto.fecha_entrada,
        fecha_salida: createReservaDto.fecha_salida,
        estado: createReservaDto.estado,
        id_huesped: createReservaDto.id_huesped
      });
      
      // Guardar la reserva
      const reservaGuardada = await transactionalEntityManager.save(Reserva, nuevaReserva);

      // Si hay detalles de reserva, crearlos
      if (createReservaDto.detalles_reserva && createReservaDto.detalles_reserva.length > 0) {
        const detalles = createReservaDto.detalles_reserva.map(detalle => ({
          ...detalle,
          id_reserva: reservaGuardada.id_reserva
        }));
        
        // Guardar los detalles
        await transactionalEntityManager.save(DetalleReserva, detalles);
      }

      // Retornar la reserva con sus detalles
      const reservaCompleta = await transactionalEntityManager.findOne(Reserva, {
        where: { id_reserva: reservaGuardada.id_reserva },
        relations: ['detalles_reserva', 'detalles_reserva.habitacion']
      });

      if (!reservaCompleta) {
        throw new NotFoundException(`Error al recuperar la reserva creada`);
      }

      return reservaCompleta;
    });
  }

  // Obtener todas las reservas registradas, incluyendo detalles_reserva
  async obtenerTodasLasReservas(): Promise<Reserva[]> {
    const reservas = await this.ReservaRepository
      .createQueryBuilder('reserva')
      .leftJoinAndSelect('reserva.detalles_reserva', 'detalles')
      .leftJoinAndSelect('detalles.habitacion', 'habitacion')
      .orderBy('reserva.id_reserva', 'DESC')
      .getMany();

    console.log('Reservas con detalles:', JSON.stringify(reservas, null, 2));
    return reservas;
  }

  // Obtener una reserva por su identificador único, incluyendo detalles_reserva
  async obtenerReservaPorId(id: number): Promise<Reserva> {
    const reserva = await this.ReservaRepository.findOne({
      where: { id_reserva: id },
      relations: ['detalles_reserva', 'detalles_reserva.habitacion'],
    });
    if (!reserva) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }
    return reserva;
  }

  // Actualizar los datos de una reserva existente por su id
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

  // Eliminar una reserva por su id
  async eliminarReserva(id: number): Promise<void> {
    const resultado = await this.ReservaRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada para eliminar`);
    }
  }
}
