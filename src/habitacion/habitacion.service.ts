import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { UpdateHabitacionDto } from './dto/update-habitacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habitacion } from './entities/habitacion.entity';
import { Repository, Between } from 'typeorm';

@Injectable()
export class HabitacionService {
  constructor(
    // Inyección del repositorio para acceso a la base de datos MySQL con TypeORM
    @InjectRepository(Habitacion, 'austral')
    private HabitacionRepository: Repository<Habitacion>,
  ) {}

  // Crear una nueva habitación en la base de datos
  async crearHabitacion(createHabitacionDto: CreateHabitacionDto): Promise<Habitacion> {
    const nuevaHabitacion = this.HabitacionRepository.create(createHabitacionDto);
    return await this.HabitacionRepository.save(nuevaHabitacion);
  }

  // Obtener todas las habitaciones registradas
  async obtenerTodasLasHabitaciones(): Promise<Habitacion[]> {
    return await this.HabitacionRepository.find();
  }

  // Obtener una habitación por su identificador único
  async obtenerHabitacionPorId(id: number): Promise<Habitacion> {
    const habitacion = await this.HabitacionRepository.findOneBy({ id_habitacion: id });
    if (!habitacion) {
      // Lanzar excepción si no se encuentra la habitación
      throw new NotFoundException(`Habitación con id ${id} no encontrada`);
    }
    return habitacion;
  }

  // Actualizar los datos de una habitación existente por su id
  async actualizarHabitacion(id: number, updateHabitacionDto: UpdateHabitacionDto): Promise<Habitacion> {
    const habitacion = await this.HabitacionRepository.preload({
      id_habitacion: id,
      ...updateHabitacionDto,
    });
    if (!habitacion) {
      // Lanzar excepción si no se encuentra la habitación para actualizar
      throw new NotFoundException(`Habitación con id ${id} no encontrada para actualizar`);
    }
    return await this.HabitacionRepository.save(habitacion);
  }

  // Eliminar una habitación por su id
  async eliminarHabitacion(id: number): Promise<void> {
    const resultado = await this.HabitacionRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró la habitación para eliminar
      throw new NotFoundException(`Habitación con id ${id} no encontrada para eliminar`);
    }
  }

  // Obtener habitaciones filtradas por tipo
  async obtenerHabitacionesPorTipo(tipo: 'individual' | 'doble' | 'triple' | 'dormitorio'): Promise<Habitacion[]> {
    return await this.HabitacionRepository.find({ where: { tipo } });
  }

  // Obtener habitaciones filtradas por estado
  async obtenerHabitacionesPorEstado(estado: 'libre' | 'ocupada' | 'limpieza' | 'mantenimiento'): Promise<Habitacion[]> {
    return await this.HabitacionRepository.find({ where: { estado } });
  }

  // Obtener habitaciones filtradas por rango de precio_base
  async obtenerHabitacionesPorRangoPrecio(precioMin: number, precioMax: number): Promise<Habitacion[]> {
    return await this.HabitacionRepository.find({
      where: { precio_base: Between(precioMin, precioMax) },
    });
  }

  // Buscar habitaciones por número exacto
  async buscarHabitacionesPorNumero(numero: number): Promise<Habitacion[]> {
    return await this.HabitacionRepository.find({
      where: { numero },
    });
  }
}
