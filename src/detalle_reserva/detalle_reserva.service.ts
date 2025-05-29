import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleReservaDto } from './dto/create-detalle_reserva.dto';
import { UpdateDetalleReservaDto } from './dto/update-detalle_reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleReserva } from './entities/detalle_reserva.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetalleReservaService {
  constructor(
    @InjectRepository(DetalleReserva, 'austral')
    private DetalleReservaRepository: Repository<DetalleReserva>
  ) {}

  async crearDetalle(createDetalleReservaDto: CreateDetalleReservaDto): Promise<DetalleReserva> {
    try {
      console.log('Iniciando creación de detalle de reserva:', createDetalleReservaDto);
      
      const nuevoDetalle = this.DetalleReservaRepository.create(createDetalleReservaDto);
      const detalleGuardado = await this.DetalleReservaRepository.save(nuevoDetalle);
      
      const detalleConHabitacion = await this.DetalleReservaRepository.findOne({
        where: { id_detalle: detalleGuardado.id_detalle },
        relations: ['habitacion']
      });

      if (!detalleConHabitacion) {
        throw new NotFoundException(`No se pudo cargar el detalle de reserva recién creado con id ${detalleGuardado.id_detalle}`);
      }

      console.log('Detalle creado:', JSON.stringify(detalleConHabitacion, null, 2));
      return detalleConHabitacion;
    } catch (error) {
      console.error('Error al crear detalle de reserva:', error);
      console.error('Stack trace:', error.stack);
      throw error;
    }
  }

  async obtenerTodosLosDetalles(): Promise<DetalleReserva[]> {
    try {
      console.log('Iniciando consulta para obtener todos los detalles');
      
      const detalles = await this.DetalleReservaRepository.find({
        relations: ['habitacion']
      });
      
      console.log('Detalles encontrados:', JSON.stringify(detalles, null, 2));
      return detalles;
    } catch (error) {
      console.error('Error al obtener todos los detalles:', error);
      console.error('Stack trace:', error.stack);
      throw new Error(`Error al obtener todos los detalles: ${error.message}`);
    }
  }

  async obtenerDetallePorId(id: number): Promise<DetalleReserva> {
    try {
      console.log('Iniciando consulta para obtener detalle por ID:', id);
      
      const detalle = await this.DetalleReservaRepository.findOne({
        where: { id_detalle: id },
        relations: ['habitacion']
      });

      if (!detalle) {
        console.log(`No se encontró detalle con id ${id}`);
        throw new NotFoundException(`Detalle de reserva con id ${id} no encontrado`);
      }

      console.log('Detalle encontrado:', JSON.stringify(detalle, null, 2));
      return detalle;
    } catch (error) {
      console.error('Error al obtener detalle por ID:', error);
      console.error('Stack trace:', error.stack);
      throw error;
    }
  }

  async actualizarDetalle(id: number, updateDetalleReservaDto: UpdateDetalleReservaDto): Promise<DetalleReserva> {
    try {
      console.log('Iniciando actualización de detalle de reserva:', { id, updateDetalleReservaDto });
      
      const detalle = await this.DetalleReservaRepository.preload({
        id_detalle: id,
        ...updateDetalleReservaDto,
      });

      if (!detalle) {
        console.log(`No se encontró detalle con id ${id} para actualizar`);
        throw new NotFoundException(`Detalle de reserva con id ${id} no encontrado para actualizar`);
      }

      const detalleActualizado = await this.DetalleReservaRepository.save(detalle);
      
      const detalleConHabitacion = await this.DetalleReservaRepository.findOne({
        where: { id_detalle: detalleActualizado.id_detalle },
        relations: ['habitacion']
      });

      if (!detalleConHabitacion) {
        throw new NotFoundException(`No se pudo cargar el detalle actualizado con id ${id}`);
      }

      console.log('Detalle actualizado:', JSON.stringify(detalleConHabitacion, null, 2));
      return detalleConHabitacion;
    } catch (error) {
      console.error('Error al actualizar detalle de reserva:', error);
      console.error('Stack trace:', error.stack);
      throw error;
    }
  }

  async eliminarDetalle(id: number): Promise<void> {
    const resultado = await this.DetalleReservaRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Detalle de reserva con id ${id} no encontrado para eliminar`);
    }
  }

  async obtenerDetallesPorReserva(id_reserva: number): Promise<DetalleReserva[]> {
    if (isNaN(id_reserva) || id_reserva <= 0) {
      console.error(`ID de reserva inválido recibido en servicio: ${id_reserva}`);
      throw new Error('ID de reserva inválido en servicio');
    }
    try {
      console.log('Iniciando consulta para obtener detalles de reserva:', id_reserva);
      
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

  async obtenerDetallesPorHabitacion(id_habitacion: number): Promise<DetalleReserva[]> {
    try {
      console.log('Iniciando consulta para obtener detalles por habitación:', id_habitacion);
      
      const detalles = await this.DetalleReservaRepository.find({
        where: { id_habitacion },
        relations: ['habitacion']
      });
      
      console.log('Detalles encontrados:', JSON.stringify(detalles, null, 2));
      return detalles;
    } catch (error) {
      console.error('Error al obtener detalles por habitación:', error);
      console.error('Stack trace:', error.stack);
      throw new Error(`Error al obtener detalles por habitación: ${error.message}`);
    }
  }
}
