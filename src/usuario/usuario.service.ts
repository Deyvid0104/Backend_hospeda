import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository, Like, MoreThan } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    // Inyección del repositorio de Usuario para acceso a la base de datos
    @InjectRepository(Usuario, 'austral')
    private UsuarioRepository: Repository<Usuario>,
  ) {}

  // Método para crear un nuevo usuario en la base de datos
  async crearUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = this.UsuarioRepository.create(createUsuarioDto);
    return await this.UsuarioRepository.save(nuevoUsuario);
  }

  // Método para obtener todos los usuarios registrados
  async obtenerTodosLosUsuarios(): Promise<Usuario[]> {
    return await this.UsuarioRepository.find();
  }

  // Método para obtener un usuario por su ID
  async obtenerUsuarioPorId(id_usuario: number): Promise<Usuario> {
    const usuario = await this.UsuarioRepository.findOneBy({ id_usuario });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado`);
    }
    return usuario;
  }

  // Método para actualizar un usuario existente por su ID
  async actualizarUsuario(id_usuario: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.UsuarioRepository.preload({
      id_usuario: id_usuario,
      ...updateUsuarioDto,
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado para actualizar`);
    }
    return await this.UsuarioRepository.save(usuario);
  }

  // Método para eliminar un usuario por su ID
  async eliminarUsuario(id_usuario: number): Promise<void> {
    const usuario = await this.obtenerUsuarioPorId(id_usuario);
    await this.UsuarioRepository.remove(usuario);
  }

  // Método para obtener usuarios por rol (admin, recepcionista)
  async obtenerUsuariosPorRol(rol: 'admin' | 'recepcionista'): Promise<Usuario[]> {
    return await this.UsuarioRepository.find({ where: { rol } });
  }

  // Método para buscar usuarios por nombre parcial
  async buscarUsuariosPorNombre(nombre: string): Promise<Usuario[]> {
    return await this.UsuarioRepository.find({
      where: { nombre_usuario: Like(`%${nombre}%`) },
    });
  }

  // Método para buscar usuario por email exacto
  async buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
    return await this.UsuarioRepository.findOneBy({ email });
  }

  // Método para obtener usuarios con último acceso después de una fecha dada
  async obtenerUsuariosActivosRecientes(fecha: Date): Promise<Usuario[]> {
    return await this.UsuarioRepository.find({
      where: { ultimo_acceso: MoreThan(fecha) },
    });
  }
}
