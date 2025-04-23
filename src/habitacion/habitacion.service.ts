import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { UpdateHabitacionDto } from './dto/update-habitacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habitacion } from './entities/habitacion.entity';
import { Repository, Between } from 'typeorm';

@Injectable()
export class HabitacionService {
  constructor(
    // Inyección del repositorio para acceder a la base de datos
    @InjectRepository(Habitacion, 'austral')
    private HabitacionRepository: Repository<Habitacion>,
  ) {}

  // Método para crear una nueva habitación
  async crearHabitacion(createHabitacionDto: CreateHabitacionDto): Promise<Habitacion> {
    const nuevaHabitacion = this.HabitacionRepository.create(createHabitacionDto);
    // Guardar la nueva habitación en la base de datos
    return await this.HabitacionRepository.save(nuevaHabitacion);
  }

  // Método para obtener todas las habitaciones
  async obtenerTodasLasHabitaciones(): Promise<Habitacion[]> {
    return await this.HabitacionRepository.find();
  }

  // Método para obtener una habitación por su id
  async obtenerHabitacionPorId(id: number): Promise<Habitacion> {
    const habitacion = await this.HabitacionRepository.findOneBy({ id_habitacion: id });
    if (!habitacion) {
      // Lanzar excepción si no se encuentra la habitación
      throw new NotFoundException(`Habitación con id ${id} no encontrada`);
    }
    return habitacion;
  }

  // Método para actualizar una habitación por su id
  async actualizarHabitacion(id: number, updateHabitacionDto: UpdateHabitacionDto): Promise<Habitacion> {
    const habitacion = await this.HabitacionRepository.preload({
      id_habitacion: id,
      ...updateHabitacionDto,
    });
    if (!habitacion) {
      // Lanzar excepción si no se encuentra la habitación a actualizar
      throw new NotFoundException(`Habitación con id ${id} no encontrada para actualizar`);
    }
    // Guardar los cambios en la base de datos
    return await this.HabitacionRepository.save(habitacion);
  }

  // Método para eliminar una habitación por su id
  async eliminarHabitacion(id: number): Promise<void> {
    const resultado = await this.HabitacionRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró la habitación para eliminar
      throw new NotFoundException(`Habitación con id ${id} no encontrada para eliminar`);
    }
  }

  // Método para obtener habitaciones por tipo
  async obtenerHabitacionesPorTipo(tipo: 'individual' | 'doble' | 'triple' | 'dormitorio'): Promise<Habitacion[]> {
    return await this.HabitacionRepository.find({ where: { tipo } });
  }

  // Método para obtener habitaciones por estado
  async obtenerHabitacionesPorEstado(estado: 'libre' | 'ocupada' | 'limpieza' | 'mantenimiento'): Promise<Habitacion[]> {
    return await this.HabitacionRepository.find({ where: { estado } });
  }

  // Método para obtener habitaciones por rango de precio_base
  async obtenerHabitacionesPorRangoPrecio(precioMin: number, precioMax: number): Promise<Habitacion[]> {
    return await this.HabitacionRepository.find({
      where: { precio_base: Between(precioMin, precioMax) },
    });
  }

  // Método para buscar habitaciones por número exacto
  async buscarHabitacionesPorNumero(numero: number): Promise<Habitacion[]> {
    return await this.HabitacionRepository.find({
      where: { numero },
    });
  }
}
