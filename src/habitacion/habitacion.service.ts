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

  // Obtener habitaciones disponibles en un rango de fechas
  async obtenerHabitacionesDisponibles(fechaInicio: Date, fechaFin: Date): Promise<Habitacion[]> {
    // Query para obtener habitaciones que no estén reservadas en el rango dado
    const habitacionesOcupadas = await this.HabitacionRepository
      .createQueryBuilder('habitacion')
      .innerJoin('habitacion.detalles_reserva', 'detalle')
      .innerJoin('detalle.reserva', 'reserva')
      .where('reserva.fecha_entrada <= :fechaFin AND reserva.fecha_salida >= :fechaInicio', { fechaInicio, fechaFin })
      .select('habitacion.id_habitacion')
      .getRawMany();

    const idsOcupados = habitacionesOcupadas.map(h => h.habitacion_id_habitacion);

    if (idsOcupados.length === 0) {
      return this.HabitacionRepository.find();
    }

    return this.HabitacionRepository
      .createQueryBuilder('habitacion')
      .where('habitacion.id_habitacion NOT IN (:...ids)', { ids: idsOcupados })
      .getMany();
  }

  // Obtener todas las habitaciones registradas
  async obtenerTodasLasHabitaciones(): Promise<Habitacion[]> {
    return await this.HabitacionRepository.find();
  }

  // Nuevo método para obtener fechas de ocupación por habitación
  async obtenerFechasOcupacionPorHabitacion(): Promise<any[]> {
    // Consulta para obtener id de habitación y sus rangos de fechas ocupadas basadas en reservas activas
    const query = this.HabitacionRepository
      .createQueryBuilder('habitacion')
      .leftJoin('habitacion.detalles_reserva', 'detalle')
      .leftJoin('detalle.reserva', 'reserva')
      .select('habitacion.id_habitacion', 'id_habitacion')
      .addSelect('GROUP_CONCAT(CONCAT(reserva.fecha_entrada, " a ", reserva.fecha_salida) SEPARATOR ", ")', 'fechas_ocupacion')
      .groupBy('habitacion.id_habitacion');

    const result = await query.getRawMany();
    return result;
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
