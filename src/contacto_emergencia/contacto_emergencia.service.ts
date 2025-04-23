import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactoEmergenciaDto } from './dto/create-contacto_emergencia.dto';
import { UpdateContactoEmergenciaDto } from './dto/update-contacto_emergencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactoEmergencia } from './entities/contacto_emergencia.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class ContactoEmergenciaService {
  constructor(
    // Inyección del repositorio para acceder a la base de datos
    @InjectRepository(ContactoEmergencia, 'austral')
    private ContactoEmergenciaRepository: Repository<ContactoEmergencia>,
  ) {}

  // Método para crear un nuevo contacto de emergencia
  async crearContacto(createContactoEmergenciaDto: CreateContactoEmergenciaDto): Promise<ContactoEmergencia> {
    const nuevoContacto = this.ContactoEmergenciaRepository.create(createContactoEmergenciaDto);
    // Guardar el nuevo contacto en la base de datos
    return await this.ContactoEmergenciaRepository.save(nuevoContacto);
  }

  // Método para obtener todos los contactos de emergencia
  async obtenerTodosLosContactos(): Promise<ContactoEmergencia[]> {
    return await this.ContactoEmergenciaRepository.find();
  }

  // Método para obtener un contacto de emergencia por su id
  async obtenerContactoPorId(id: number): Promise<ContactoEmergencia> {
    const contacto = await this.ContactoEmergenciaRepository.findOneBy({ id_contacto: id });
    if (!contacto) {
      // Lanzar excepción si no se encuentra el contacto
      throw new NotFoundException(`Contacto de emergencia con id ${id} no encontrado`);
    }
    return contacto;
  }

  // Método para actualizar un contacto de emergencia por su id
  async actualizarContacto(id: number, updateContactoEmergenciaDto: UpdateContactoEmergenciaDto): Promise<ContactoEmergencia> {
    const contacto = await this.ContactoEmergenciaRepository.preload({
      id_contacto: id,
      ...updateContactoEmergenciaDto,
    });
    if (!contacto) {
      // Lanzar excepción si no se encuentra el contacto a actualizar
      throw new NotFoundException(`Contacto de emergencia con id ${id} no encontrado para actualizar`);
    }
    // Guardar los cambios en la base de datos
    return await this.ContactoEmergenciaRepository.save(contacto);
  }

  // Método para eliminar un contacto de emergencia por su id
  async eliminarContacto(id: number): Promise<void> {
    const resultado = await this.ContactoEmergenciaRepository.delete(id);
    if (resultado.affected === 0) {
      // Lanzar excepción si no se encontró el contacto para eliminar
      throw new NotFoundException(`Contacto de emergencia con id ${id} no encontrado para eliminar`);
    }
  }

  // Método para buscar contactos por nombre parcial
  async buscarContactosPorNombre(nombre: string): Promise<ContactoEmergencia[]> {
    return await this.ContactoEmergenciaRepository.find({
      where: { nombre: Like(`%${nombre}%`) },
    });
  }

  // Método para obtener contactos por id_huesped
  async obtenerContactosPorHuesped(id_huesped: number): Promise<ContactoEmergencia[]> {
    return await this.ContactoEmergenciaRepository.find({
      where: { id_huesped },
    });
  }
}
