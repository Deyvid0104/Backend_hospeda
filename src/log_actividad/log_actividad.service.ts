/**
 * Servicio LogActividadService
 * Maneja la lógica de negocio para los logs de actividad.
 * Incluye métodos para crear, obtener, actualizar y eliminar logs.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLogActividadDto } from './dto/create-log_actividad.dto';
import { UpdateLogActividadDto } from './dto/update-log_actividad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LogActividad } from './entities/log_actividad.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class LogActividadService {
  constructor(
    // Inyección del repositorio para acceso a la base de datos MySQL con TypeORM
    @InjectRepository(LogActividad, 'austral')
    private LogActividadRepository: Repository<LogActividad>,
  ) {}

  /**
   * Crea un nuevo log de actividad.
   * @param createLogActividadDto DTO con datos del log.
   * @returns El log creado.
   */
  async crearLog(createLogActividadDto: CreateLogActividadDto): Promise<LogActividad> {
    const nuevoLog = this.LogActividadRepository.create(createLogActividadDto);
    return await this.LogActividadRepository.save(nuevoLog);
  }

  /**
   * Obtiene todos los logs de actividad registrados.
   * @returns Lista de logs.
   */
  async obtenerTodosLosLogs(): Promise<LogActividad[]> {
    return await this.LogActividadRepository.find();
  }

  /**
   * Obtiene un log de actividad por su identificador único.
   * @param id_log ID del log.
   * @returns El log encontrado.
   * @throws NotFoundException si no se encuentra el log.
   */
  async obtenerLogPorId(id_log: number): Promise<LogActividad> {
    const log = await this.LogActividadRepository.findOneBy({ id_log });
    if (!log) {
      // Lanzar excepción si no se encuentra el log
      throw new NotFoundException(`Log de actividad con id ${id_log} no encontrado`);
    }
    return log;
  }

  /**
   * Actualiza los datos de un log de actividad existente por su id.
   * @param id_log ID del log.
   * @param updateLogActividadDto DTO con datos a actualizar.
   * @returns El log actualizado.
   * @throws NotFoundException si no se encuentra el log.
   */
  async actualizarLog(id_log: number, updateLogActividadDto: UpdateLogActividadDto): Promise<LogActividad> {
    const log = await this.LogActividadRepository.preload({
      id_log: id_log,
      ...updateLogActividadDto,
    });
    if (!log) {
      // Lanzar excepción si no se encuentra el log para actualizar
      throw new NotFoundException(`Log de actividad con id ${id_log} no encontrado para actualizar`);
    }
    return await this.LogActividadRepository.save(log);
  }

  /**
   * Elimina un log de actividad por su id.
   * @param id_log ID del log.
   * @throws NotFoundException si no se encuentra el log.
   */
  async eliminarLog(id_log: number): Promise<void> {
    const resultado = await this.LogActividadRepository.delete(id_log);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró el log para eliminar
      throw new NotFoundException(`Log de actividad con id ${id_log} no encontrado para eliminar`);
    }
  }

  /**
   * Obtiene logs filtrados por id_usuario.
   * @param id_usuario ID del usuario.
   * @returns Lista de logs asociados.
   */
  async obtenerLogsPorUsuario(id_usuario: number): Promise<LogActividad[]> {
    return await this.LogActividadRepository.find({
      where: { usuario: { id_usuario } },
    });
  }

  /**
   * Busca logs filtrados por acción parcial.
   * @param accion Acción parcial para búsqueda.
   * @returns Lista de logs que coinciden.
   */
  async buscarLogsPorAccion(accion: string): Promise<LogActividad[]> {
    return await this.LogActividadRepository.find({
      where: { accion: Like(`%${accion}%`) },
    });
  }
}
