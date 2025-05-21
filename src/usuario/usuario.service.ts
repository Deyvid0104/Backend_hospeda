import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository, Like, MoreThan } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    // Inyección del repositorio de Usuario para acceso a la base de datos MySQL con TypeORM
    @InjectRepository(Usuario, 'austral')
    private UsuarioRepository: Repository<Usuario>,
  ) {}

  // Crear un nuevo usuario en la base de datos
  async crearUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = this.UsuarioRepository.create(createUsuarioDto);
    // Validar longitud mínima de contraseña
    if (createUsuarioDto.contraseña) {
      const trimmedPassword = createUsuarioDto.contraseña.trim();
      if (trimmedPassword.length >= 5) {
        const saltRounds = 10;
        nuevoUsuario.contraseña = await bcrypt.hash(trimmedPassword, saltRounds);
      } else {
        throw new BadRequestException('La contraseña debe tener al menos 5 caracteres.');
      }
    } else {
      throw new BadRequestException('La contraseña es requerida.');
    }
    try {
      return await this.UsuarioRepository.save(nuevoUsuario);
    } catch (error) {
      // Maneja error de clave única para email duplicado
      if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
        // Lanza excepción HTTP con mensaje claro para que sea devuelto como respuesta
        throw new BadRequestException('El correo electrónico ya está registrado.');
      }
      throw error;
    }
  }

  // Obtener todos los usuarios registrados, ocultando la contraseña
  async obtenerTodosLosUsuarios(): Promise<Partial<Usuario>[]> {
    const usuarios = await this.UsuarioRepository.find();
    return usuarios.map(({ contraseña, ...resto }) => resto);
  }

  // Obtener un usuario por su ID, ocultando la contraseña
  async obtenerUsuarioPorId(id_usuario: number): Promise<Partial<Usuario>> {
    const usuario = await this.UsuarioRepository.findOneBy({ id_usuario });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado`);
    }
    const { contraseña, ...resto } = usuario;
    return resto;
  }

  // Actualizar un usuario existente por su ID
  async actualizarUsuario(id_usuario: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.UsuarioRepository.preload({
      id_usuario: id_usuario,
      ...updateUsuarioDto,
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado para actualizar`);
    }
    // Validar longitud mínima de contraseña si se proporciona
    if (updateUsuarioDto.contraseña) {
      if (updateUsuarioDto.contraseña.length < 5) {
        throw new BadRequestException('La contraseña debe tener al menos 5 caracteres.');
      }
      const saltRounds = 10;
      usuario.contraseña = await bcrypt.hash(updateUsuarioDto.contraseña, saltRounds);
    }
    return await this.UsuarioRepository.save(usuario);
  }

  // Eliminar un usuario por su ID
  async eliminarUsuario(id_usuario: number): Promise<void> {
    const usuario = await this.UsuarioRepository.findOneBy({ id_usuario });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado para eliminar`);
    }
    await this.UsuarioRepository.remove(usuario);
  }

  // Obtener usuarios filtrados por rol (admin, recepcionista)
  async obtenerUsuariosPorRol(rol: 'admin' | 'recepcionista'): Promise<Usuario[]> {
    return await this.UsuarioRepository.find({ where: { rol } });
  }

  // Buscar usuarios por nombre parcial
  async buscarUsuariosPorNombre(nombre: string): Promise<Usuario[]> {
    return await this.UsuarioRepository.find({
      where: { nombre_usuario: Like(`%${nombre}%`) },
    });
  }

  // Buscar usuario por email exacto
  async buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
    return await this.UsuarioRepository.findOneBy({ email });
  }

  // Obtener usuarios con último acceso después de una fecha dada
  async obtenerUsuariosActivosRecientes(fecha: Date): Promise<Usuario[]> {
    return await this.UsuarioRepository.find({
      where: { ultimo_acceso: MoreThan(fecha) },
    });
  }
}
