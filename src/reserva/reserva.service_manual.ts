/**
 * Servicio ReservaService
 * Maneja la lógica de negocio para la entidad Reserva.
 * Incluye métodos para crear, obtener, actualizar y eliminar reservas.
 * Se modifica para incluir la relación detalles_reserva en las consultas.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservaService {
  constructor(
    // Inyección del repositorio para acceder a la base de datos MySQL con TypeORM
    @InjectRepository(Reserva, 'austral')
    private ReservaRepository: Repository<Reserva>,
  ) {}

  // Crear una nueva reserva en la base de datos
  async crearReserva(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const nuevaReserva = this.ReservaRepository.create(createReservaDto);
    return await this.ReservaRepository.save(nuevaReserva);
  }

  // Obtener todas las reservas registradas, incluyendo detalles_reserva
  async obtenerTodasLasReservas(): Promise<Reserva[]> {
    return await this.ReservaRepository.find({ relations: ['detalles_reserva'] });
  }

  // Obtener una reserva por su identificador único, incluyendo detalles_reserva
  async obtenerReservaPorId(id: number): Promise<Reserva> {
    const reserva = await this.ReservaRepository.findOne({
      where: { id_reserva: id },
      relations: ['detalles_reserva'],
    });
    if (!reserva) {
      // Lanzar excepción si no se encuentra la reserva
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
      // Lanzar excepción si no se encuentra la reserva para actualizar
      throw new NotFoundException(`Reserva con id ${id} no encontrada para actualizar`);
    }
    return await this.ReservaRepository.save(reserva);
  }

  // Eliminar una reserva por su id
  async eliminarReserva(id: number): Promise<void> {
    const resultado = await this.ReservaRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró la reserva para eliminar
      throw new NotFoundException(`Reserva con id ${id} no encontrada para eliminar`);
    }
  }
}
