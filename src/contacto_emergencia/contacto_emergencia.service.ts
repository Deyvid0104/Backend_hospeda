import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactoEmergenciaDto } from './dto/create-contacto_emergencia.dto';
import { UpdateContactoEmergenciaDto } from './dto/update-contacto_emergencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactoEmergencia } from './entities/contacto_emergencia.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class ContactoEmergenciaService {
  constructor(
    // Inyección del repositorio para acceso a la base de datos MySQL con TypeORM
    @InjectRepository(ContactoEmergencia, 'austral')
    private ContactoEmergenciaRepository: Repository<ContactoEmergencia>,
  ) {}

  // Crear un nuevo contacto de emergencia en la base de datos
  async crearContacto(createContactoEmergenciaDto: CreateContactoEmergenciaDto): Promise<ContactoEmergencia> {
    const nuevoContacto = this.ContactoEmergenciaRepository.create(createContactoEmergenciaDto);
    return await this.ContactoEmergenciaRepository.save(nuevoContacto);
  }

  // Obtener todos los contactos de emergencia registrados
  async obtenerTodosLosContactos(): Promise<ContactoEmergencia[]> {
    return await this.ContactoEmergenciaRepository.find();
  }

  // Obtener un contacto de emergencia por su identificador único
  async obtenerContactoPorId(id: number): Promise<ContactoEmergencia> {
    const contacto = await this.ContactoEmergenciaRepository.findOneBy({ id_contacto: id });
    if (!contacto) {
      // Lanzar excepción si no se encuentra el contacto
      throw new NotFoundException(`Contacto de emergencia con id ${id} no encontrado`);
    }
    return contacto;
  }

  // Actualizar los datos de un contacto de emergencia existente por su id
  async actualizarContacto(id: number, updateContactoEmergenciaDto: UpdateContactoEmergenciaDto): Promise<ContactoEmergencia> {
    const contacto = await this.ContactoEmergenciaRepository.preload({
      id_contacto: id,
      ...updateContactoEmergenciaDto,
    });
    if (!contacto) {
      // Lanzar excepción si no se encuentra el contacto para actualizar
      throw new NotFoundException(`Contacto de emergencia con id ${id} no encontrado para actualizar`);
    }
    return await this.ContactoEmergenciaRepository.save(contacto);
  }

  // Eliminar un contacto de emergencia por su id
  async eliminarContacto(id: number): Promise<void> {
    const resultado = await this.ContactoEmergenciaRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró el contacto para eliminar
      throw new NotFoundException(`Contacto de emergencia con id ${id} no encontrado para eliminar`);
    }
  }

  // Buscar contactos por nombre parcial
  async buscarContactosPorNombre(nombre: string): Promise<ContactoEmergencia[]> {
    return await this.ContactoEmergenciaRepository.find({
      where: { nombre: Like(`%${nombre}%`) },
    });
  }

  // Obtener contactos filtrados por id_huesped
  async obtenerContactosPorHuesped(id_huesped: number): Promise<ContactoEmergencia[]> {
    return await this.ContactoEmergenciaRepository.find({
      where: { id_huesped },
    });
  }
}
