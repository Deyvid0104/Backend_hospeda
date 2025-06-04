/**
 * Servicio HistorialMantenimientoService
 * Maneja la lógica de negocio para el historial de mantenimiento.
 * Incluye métodos para crear, obtener, actualizar y eliminar registros.
 */

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

  /**
   * Crea un nuevo registro de historial de mantenimiento.
   * @param createHistorialMantenimientoDto DTO con datos del historial.
   * @returns El registro creado.
   */
  async crearHistorial(createHistorialMantenimientoDto: CreateHistorialMantenimientoDto): Promise<HistorialMantenimiento> {
    const nuevoHistorial = this.HistorialMantenimientoRepository.create(createHistorialMantenimientoDto);
    // Guardar el nuevo historial en la base de datos
    return await this.HistorialMantenimientoRepository.save(nuevoHistorial);
  }

  /**
   * Obtiene todos los registros de historial de mantenimiento.
   * @returns Lista de registros.
   */
  async obtenerTodosLosHistoriales(): Promise<HistorialMantenimiento[]> {
    return await this.HistorialMantenimientoRepository.find();
  }

  /**
   * Obtiene un registro de historial por su ID.
   * @param id ID del registro.
   * @returns El registro encontrado.
   * @throws NotFoundException si no se encuentra el registro.
   */
  async obtenerHistorialPorId(id: number): Promise<HistorialMantenimiento> {
    const historial = await this.HistorialMantenimientoRepository.findOneBy({ id_mantenimiento: id });
    if (!historial) {
      // Lanzar excepción si no se encuentra el historial
      throw new NotFoundException(`Historial de mantenimiento con id ${id} no encontrado`);
    }
    return historial;
  }

  /**
   * Actualiza un registro de historial existente.
   * @param id ID del registro a actualizar.
   * @param updateHistorialMantenimientoDto DTO con datos a actualizar.
   * @returns El registro actualizado.
   * @throws NotFoundException si no se encuentra el registro.
   */
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

  /**
   * Elimina un registro de historial por su ID.
   * @param id ID del registro a eliminar.
   * @throws NotFoundException si no se encuentra el registro.
   */
  async eliminarHistorial(id: number): Promise<void> {
    const resultado = await this.HistorialMantenimientoRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró el historial para eliminar
      throw new NotFoundException(`Historial de mantenimiento con id ${id} no encontrado para eliminar`);
    }
  }

  /**
   * Obtiene historiales por ID de habitación.
   * @param id_habitacion ID de la habitación.
   * @returns Lista de historiales asociados.
   */
  async obtenerHistorialesPorHabitacion(id_habitacion: number): Promise<HistorialMantenimiento[]> {
    return await this.HistorialMantenimientoRepository.find({
      where: { habitacion: { id_habitacion } },
    });
  }

  /**
   * Obtiene historiales por rango de fechas.
   * @param fechaInicio Fecha de inicio del rango.
   * @param fechaFin Fecha de fin del rango.
   * @returns Lista de historiales dentro del rango.
   */
  async obtenerHistorialesPorRangoFechas(fechaInicio: Date, fechaFin: Date): Promise<HistorialMantenimiento[]> {
    return await this.HistorialMantenimientoRepository.find({
      where: {
        fecha_inicio: Between(fechaInicio, fechaFin),
      },
    });
  }
}
