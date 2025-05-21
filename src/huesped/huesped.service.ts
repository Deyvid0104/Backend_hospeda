import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHuespedDto } from './dto/create-huesped.dto';
import { UpdateHuespedDto } from './dto/update-huesped.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Huesped } from './entities/huesped.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class HuespedService {
  constructor(
    // Inyección del repositorio para acceso a la base de datos MySQL con TypeORM
    @InjectRepository(Huesped, 'austral')
    private HuespedRepository: Repository<Huesped>,
  ) {}

  // Crear un nuevo huésped en la base de datos
  async crearHuesped(createHuespedDto: CreateHuespedDto): Promise<Huesped> {
    const nuevoHuesped = this.HuespedRepository.create(createHuespedDto);
    return await this.HuespedRepository.save(nuevoHuesped);
  }

  // Obtener todos los huéspedes registrados
  async obtenerTodosLosHuespedes(): Promise<Huesped[]> {
    return await this.HuespedRepository.find();
  }

  // Obtener un huésped por su identificador único
  async obtenerHuespedPorId(id: number): Promise<Huesped> {
    const huesped = await this.HuespedRepository.findOneBy({ id_huesped: id });
    if (!huesped) {
      // Lanzar excepción si no se encuentra el huésped
      throw new NotFoundException(`Huésped con id ${id} no encontrado`);
    }
    return huesped;
  }

  // Actualizar los datos de un huésped existente por su id
  async actualizarHuesped(id: number, updateHuespedDto: UpdateHuespedDto): Promise<Huesped> {
    const huesped = await this.HuespedRepository.preload({
      id_huesped: id,
      ...updateHuespedDto,
    });
    if (!huesped) {
      // Lanzar excepción si no se encuentra el huésped para actualizar
      throw new NotFoundException(`Huésped con id ${id} no encontrado para actualizar`);
    }
    return await this.HuespedRepository.save(huesped);
  }

  // Eliminar un huésped por su id
  async eliminarHuesped(id: number): Promise<void> {
    const resultado = await this.HuespedRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró el huésped para eliminar
      throw new NotFoundException(`Huésped con id ${id} no encontrado para eliminar`);
    }
  }

  // Buscar huéspedes por nombre parcial
  async buscarHuespedesPorNombre(nombre: string): Promise<Huesped[]> {
    return await this.HuespedRepository.find({
      where: { nombre: Like(`%${nombre}%`) },
    });
  }

  // Buscar huésped por email exacto
  async buscarHuespedPorEmail(email: string): Promise<Huesped | null> {
    return await this.HuespedRepository.findOneBy({ email });
  }
}
