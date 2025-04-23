import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservaService {
  constructor(
    // Inyección del repositorio para acceder a la base de datos
    @InjectRepository(Reserva, 'austral')
    private ReservaRepository: Repository<Reserva>,
  ) {}

  // Método para crear una nueva reserva
  async crearReserva(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const nuevaReserva = this.ReservaRepository.create(createReservaDto);
    // Guardar la nueva reserva en la base de datos
    return await this.ReservaRepository.save(nuevaReserva);
  }

  // Método para obtener todas las reservas
  async obtenerTodasLasReservas(): Promise<Reserva[]> {
    return await this.ReservaRepository.find();
  }

  // Método para obtener una reserva por su id
  async obtenerReservaPorId(id: number): Promise<Reserva> {
    const reserva = await this.ReservaRepository.findOneBy({ id_reserva: id });
    if (!reserva) {
      // Lanzar excepción si no se encuentra la reserva
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }
    return reserva;
  }

  // Método para actualizar una reserva por su id
  async actualizarReserva(id: number, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    const reserva = await this.ReservaRepository.preload({
      id_reserva: id,
      ...updateReservaDto,
    });
    if (!reserva) {
      // Lanzar excepción si no se encuentra la reserva a actualizar
      throw new NotFoundException(`Reserva con id ${id} no encontrada para actualizar`);
    }
    // Guardar los cambios en la base de datos
    return await this.ReservaRepository.save(reserva);
  }

  // Método para eliminar una reserva por su id
  async eliminarReserva(id: number): Promise<void> {
    const resultado = await this.ReservaRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró la reserva para eliminar
      throw new NotFoundException(`Reserva con id ${id} no encontrada para eliminar`);
    }
  }
}
