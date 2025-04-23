import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicioAdicionalDto } from './dto/create-servicio_adicional.dto';
import { UpdateServicioAdicionalDto } from './dto/update-servicio_adicional.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicioAdicional } from './entities/servicio_adicional.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicioAdicionalService {
  constructor(
    // Inyección del repositorio para acceder a la base de datos
    @InjectRepository(ServicioAdicional, 'austral')
    private ServicioAdicionalRepository: Repository<ServicioAdicional>,
  ) {}

  // Método para crear un nuevo servicio adicional
  async create(createServicioAdicionalDto: CreateServicioAdicionalDto): Promise<ServicioAdicional> {
    const nuevoServicio = this.ServicioAdicionalRepository.create(createServicioAdicionalDto);
    // Guardar el nuevo servicio en la base de datos
    return await this.ServicioAdicionalRepository.save(nuevoServicio);
  }

  // Método para obtener todos los servicios adicionales
  async findAll(): Promise<ServicioAdicional[]> {
    return await this.ServicioAdicionalRepository.find();
  }

  // Método para obtener un servicio adicional por su id
  async findOne(id: number): Promise<ServicioAdicional> {
    const servicio = await this.ServicioAdicionalRepository.findOneBy({ id_servicio: id });
    if (!servicio) {
      // Lanzar excepción si no se encuentra el servicio
      throw new NotFoundException(`Servicio adicional con id ${id} no encontrado`);
    }
    return servicio;
  }

  // Método para actualizar un servicio adicional por su id
  async update(id: number, updateServicioAdicionalDto: UpdateServicioAdicionalDto): Promise<ServicioAdicional> {
    const servicio = await this.ServicioAdicionalRepository.preload({
      id_servicio: id,
      ...updateServicioAdicionalDto,
    });
    if (!servicio) {
      // Lanzar excepción si no se encuentra el servicio a actualizar
      throw new NotFoundException(`Servicio adicional con id ${id} no encontrado para actualizar`);
    }
    // Guardar los cambios en la base de datos
    return await this.ServicioAdicionalRepository.save(servicio);
  }

  // Método para eliminar un servicio adicional por su id
  async remove(id: number): Promise<void> {
    const resultado = await this.ServicioAdicionalRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró el servicio para eliminar
      throw new NotFoundException(`Servicio adicional con id ${id} no encontrado para eliminar`);
    }
  }
}
