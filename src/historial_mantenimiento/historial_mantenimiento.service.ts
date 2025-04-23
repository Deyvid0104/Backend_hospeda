import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHistorialMantenimientoDto } from './dto/create-historial_mantenimiento.dto';
import { UpdateHistorialMantenimientoDto } from './dto/update-historial_mantenimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialMantenimiento } from './entities/historial_mantenimiento.entity';
import { Repository, Between } from 'typeorm';

@Injectable()
export class HistorialMantenimientoService {
  constructor(
    // Inyección del repositorio para acceder a la base de datos
    @InjectRepository(HistorialMantenimiento, 'austral')
    private HistorialMantenimientoRepository: Repository<HistorialMantenimiento>,
  ) {}

  // Método para crear un nuevo historial de mantenimiento
  async crearHistorial(createHistorialMantenimientoDto: CreateHistorialMantenimientoDto): Promise<HistorialMantenimiento> {
    const nuevoHistorial = this.HistorialMantenimientoRepository.create(createHistorialMantenimientoDto);
    // Guardar el nuevo historial en la base de datos
    return await this.HistorialMantenimientoRepository.save(nuevoHistorial);
  }

  // Método para obtener todos los historiales de mantenimiento
  async obtenerTodosLosHistoriales(): Promise<HistorialMantenimiento[]> {
    return await this.HistorialMantenimientoRepository.find();
  }

  // Método para obtener un historial de mantenimiento por su id
  async obtenerHistorialPorId(id: number): Promise<HistorialMantenimiento> {
    const historial = await this.HistorialMantenimientoRepository.findOneBy({ id_mantenimiento: id });
    if (!historial) {
      // Lanzar excepción si no se encuentra el historial
      throw new NotFoundException(`Historial de mantenimiento con id ${id} no encontrado`);
    }
    return historial;
  }

  // Método para actualizar un historial de mantenimiento por su id
  async actualizarHistorial(id: number, updateHistorialMantenimientoDto: UpdateHistorialMantenimientoDto): Promise<HistorialMantenimiento> {
    const historial = await this.HistorialMantenimientoRepository.preload({
      id_mantenimiento: id,
      ...updateHistorialMantenimientoDto,
    });
    if (!historial) {
      // Lanzar excepción si no se encuentra el historial a actualizar
      throw new NotFoundException(`Historial de mantenimiento con id ${id} no encontrado para actualizar`);
    }
    // Guardar los cambios en la base de datos
    return await this.HistorialMantenimientoRepository.save(historial);
  }

  // Método para eliminar un historial de mantenimiento por su id
  async eliminarHistorial(id: number): Promise<void> {
    const resultado = await this.HistorialMantenimientoRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró el historial para eliminar
      throw new NotFoundException(`Historial de mantenimiento con id ${id} no encontrado para eliminar`);
    }
  }

  // Método para obtener historiales por id_habitacion
  async obtenerHistorialesPorHabitacion(id_habitacion: number): Promise<HistorialMantenimiento[]> {
    return await this.HistorialMantenimientoRepository.find({
      where: { id_habitacion },
    });
  }

  // Método para obtener historiales por rango de fechas
  async obtenerHistorialesPorRangoFechas(fechaInicio: Date, fechaFin: Date): Promise<HistorialMantenimiento[]> {
    return await this.HistorialMantenimientoRepository.find({
      where: {
        fecha_inicio: Between(fechaInicio, fechaFin),
      },
    });
  }
}
