import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHuespedDto } from './dto/create-huesped.dto';
import { UpdateHuespedDto } from './dto/update-huesped.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Huesped } from './entities/huesped.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class HuespedService {
  constructor(
    // Inyección del repositorio para acceder a la base de datos
    @InjectRepository(Huesped, 'austral')
    private HuespedRepository: Repository<Huesped>,
  ) {}

  // Método para crear un nuevo huésped
  async crearHuesped(createHuespedDto: CreateHuespedDto): Promise<Huesped> {
    const nuevoHuesped = this.HuespedRepository.create(createHuespedDto);
    // Guardar el nuevo huésped en la base de datos
    return await this.HuespedRepository.save(nuevoHuesped);
  }

  // Método para obtener todos los huéspedes
  async obtenerTodosLosHuespedes(): Promise<Huesped[]> {
    return await this.HuespedRepository.find();
  }

  // Método para obtener un huésped por su id
  async obtenerHuespedPorId(id: number): Promise<Huesped> {
    const huesped = await this.HuespedRepository.findOneBy({ id_huesped: id });
    if (!huesped) {
      // Lanzar excepción si no se encuentra el huésped
      throw new NotFoundException(`Huésped con id ${id} no encontrado`);
    }
    return huesped;
  }

  // Método para actualizar un huésped por su id
  async actualizarHuesped(id: number, updateHuespedDto: UpdateHuespedDto): Promise<Huesped> {
    const huesped = await this.HuespedRepository.preload({
      id_huesped: id,
      ...updateHuespedDto,
    });
    if (!huesped) {
      // Lanzar excepción si no se encuentra el huésped a actualizar
      throw new NotFoundException(`Huésped con id ${id} no encontrado para actualizar`);
    }
    // Guardar los cambios en la base de datos
    return await this.HuespedRepository.save(huesped);
  }

  // Método para eliminar un huésped por su id
  async eliminarHuesped(id: number): Promise<void> {
    const resultado = await this.HuespedRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró el huésped para eliminar
      throw new NotFoundException(`Huésped con id ${id} no encontrado para eliminar`);
    }
  }

  // Método para buscar huéspedes por nombre parcial
  async buscarHuespedesPorNombre(nombre: string): Promise<Huesped[]> {
    return await this.HuespedRepository.find({
      where: { nombre: Like(`%${nombre}%`) },
    });
  }

  // Método para buscar huésped por email exacto
  async buscarHuespedPorEmail(email: string): Promise<Huesped | null> {
    return await this.HuespedRepository.findOneBy({ email });
  }
}
