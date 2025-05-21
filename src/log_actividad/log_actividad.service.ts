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

  // Crear un nuevo log de actividad en la base de datos
  async crearLog(createLogActividadDto: CreateLogActividadDto): Promise<LogActividad> {
    const nuevoLog = this.LogActividadRepository.create(createLogActividadDto);
    return await this.LogActividadRepository.save(nuevoLog);
  }

  // Obtener todos los logs de actividad registrados
  async obtenerTodosLosLogs(): Promise<LogActividad[]> {
    return await this.LogActividadRepository.find();
  }

  // Obtener un log de actividad por su identificador único
  async obtenerLogPorId(id_log: number): Promise<LogActividad> {
    const log = await this.LogActividadRepository.findOneBy({ id_log });
    if (!log) {
      // Lanzar excepción si no se encuentra el log
      throw new NotFoundException(`Log de actividad con id ${id_log} no encontrado`);
    }
    return log;
  }

  // Actualizar los datos de un log de actividad existente por su id
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

  // Eliminar un log de actividad por su id
  async eliminarLog(id_log: number): Promise<void> {
    const resultado = await this.LogActividadRepository.delete(id_log);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró el log para eliminar
      throw new NotFoundException(`Log de actividad con id ${id_log} no encontrado para eliminar`);
    }
  }

  // Obtener logs filtrados por id_usuario
  async obtenerLogsPorUsuario(id_usuario: number): Promise<LogActividad[]> {
    return await this.LogActividadRepository.find({
      where: { id_usuario },
    });
  }

  // Buscar logs filtrados por acción parcial
  async buscarLogsPorAccion(accion: string): Promise<LogActividad[]> {
    return await this.LogActividadRepository.find({
      where: { accion: Like(`%${accion}%`) },
    });
  }
}
