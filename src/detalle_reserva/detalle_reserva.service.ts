import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleReservaDto } from './dto/create-detalle_reserva.dto';
import { UpdateDetalleReservaDto } from './dto/update-detalle_reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleReserva } from './entities/detalle_reserva.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetalleReservaService {
  constructor(
    // Inyección del repositorio para acceder a la base de datos
    @InjectRepository(DetalleReserva, 'austral')
    private DetalleReservaRepository: Repository<DetalleReserva>,
  ) {}

  // Método para crear un nuevo detalle de reserva
  async crearDetalle(createDetalleReservaDto: CreateDetalleReservaDto): Promise<DetalleReserva> {
    const nuevoDetalle = this.DetalleReservaRepository.create(createDetalleReservaDto);
    // Guardar el nuevo detalle en la base de datos
    return await this.DetalleReservaRepository.save(nuevoDetalle);
  }

  // Método para obtener todos los detalles de reserva
  async obtenerTodosLosDetalles(): Promise<DetalleReserva[]> {
    return await this.DetalleReservaRepository.find();
  }

  // Método para obtener un detalle de reserva por su id
  async obtenerDetallePorId(id: number): Promise<DetalleReserva> {
    const detalle = await this.DetalleReservaRepository.findOneBy({ id_detalle: id });
    if (!detalle) {
      // Lanzar excepción si no se encuentra el detalle
      throw new NotFoundException(`Detalle de reserva con id ${id} no encontrado`);
    }
    return detalle;
  }

  // Método para actualizar un detalle de reserva por su id
  async actualizarDetalle(id: number, updateDetalleReservaDto: UpdateDetalleReservaDto): Promise<DetalleReserva> {
    const detalle = await this.DetalleReservaRepository.preload({
      id_detalle: id,
      ...updateDetalleReservaDto,
    });
    if (!detalle) {
      // Lanzar excepción si no se encuentra el detalle a actualizar
      throw new NotFoundException(`Detalle de reserva con id ${id} no encontrado para actualizar`);
    }
    // Guardar los cambios en la base de datos
    return await this.DetalleReservaRepository.save(detalle);
  }

  // Método para eliminar un detalle de reserva por su id
  async eliminarDetalle(id: number): Promise<void> {
    const resultado = await this.DetalleReservaRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró el detalle para eliminar
      throw new NotFoundException(`Detalle de reserva con id ${id} no encontrado para eliminar`);
    }
  }

  // Método para obtener detalles por id_reserva
  async obtenerDetallesPorReserva(id_reserva: number): Promise<DetalleReserva[]> {
    try {
      console.log('Iniciando consulta para obtener detalles de reserva:', id_reserva);
      
      // Obtener detalles con la relación de habitación en una sola consulta
      const detalles = await this.DetalleReservaRepository.find({
        where: { id_reserva },
        relations: ['habitacion']
      });
      
      console.log('Detalles encontrados:', JSON.stringify(detalles, null, 2));
      
      if (!detalles || detalles.length === 0) {
        console.log(`No se encontraron detalles para la reserva ${id_reserva}`);
        return [];
      }

      return detalles;
    } catch (error) {
      console.error('Error al obtener detalles de reserva:', error);
      console.error('Stack trace:', error.stack);
      throw new Error(`Error al obtener detalles de reserva: ${error.message}`);
    }
  }

  // Método para obtener detalles por id_habitacion
  async obtenerDetallesPorHabitacion(id_habitacion: number): Promise<DetalleReserva[]> {
    return await this.DetalleReservaRepository.find({
      where: { id_habitacion },
    });
  }
}
