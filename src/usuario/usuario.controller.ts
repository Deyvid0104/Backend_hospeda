import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Crear un usuario
  // POST /usuario
  @Post()
  crearUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.crearUsuario(createUsuarioDto);
  }
  /*
  Ejemplo:
  POST http://localhost:4000/usuario
  Content-Type: application/json
  {
    "nombre_usuario": "admin",
    "rol": "admin",
    "password": "123456"
  }
  */

  // Obtener todos los usuarios
  // GET /usuario
  @Get()
  obtenerTodosLosUsuarios() {
    return this.usuarioService.obtenerTodosLosUsuarios();
  }
  /*
  Ejemplo:
  GET http://localhost:4000/usuario
  */

  // Obtener un usuario por ID
  // GET /usuario/:id
  @Get(':id')
  obtenerUsuarioPorId(@Param('id') id: string) {
    return this.usuarioService.obtenerUsuarioPorId(+id);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/usuario/1
  */

  // Actualizar un usuario por ID
  // PATCH /usuario/:id
  // Cuerpo de la petición: JSON con los campos a actualizar según UpdateUsuarioDto
  @Patch(':id')
  actualizarUsuario(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.actualizarUsuario(+id, updateUsuarioDto);
  }
  /*
  Ejemplo:
  PATCH http://localhost:4000/usuario/1
  Content-Type: application/json
  {
    "password": "newpassword"
  }
  */

  // Eliminar un usuario por ID
  // DELETE /usuario/:id
  @Delete(':id')
  eliminarUsuario(@Param('id') id: string) {
    return this.usuarioService.eliminarUsuario(+id);
  }
  /*
  Ejemplo:
  DELETE http://localhost:4000/usuario/1
  */

  // Obtener usuarios por rol
  // GET /usuario/rol?rol=admin
  @Get('rol')
  obtenerUsuariosPorRol(@Query('rol') rol: 'admin' | 'recepcionista') {
    return this.usuarioService.obtenerUsuariosPorRol(rol);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/usuario/rol?rol=admin
  */

  // Buscar usuarios por nombre parcial
  // GET /usuario/buscar?nombre=Juan
  @Get('buscar')
  buscarUsuariosPorNombre(@Query('nombre') nombre: string) {
    return this.usuarioService.buscarUsuariosPorNombre(nombre);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/usuario/buscar?nombre=Juan
  */

  // Buscar usuario por email exacto
  // GET /usuario/email?email=correo@example.com
  @Get('email')
  buscarUsuarioPorEmail(@Query('email') email: string) {
    return this.usuarioService.buscarUsuarioPorEmail(email);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/usuario/email?email=correo@example.com
  */

  // Obtener usuarios con último acceso después de una fecha dada
  // GET /usuario/activos-recientes?fecha=2023-01-01T00:00:00Z
  @Get('activos-recientes')
  obtenerUsuariosActivosRecientes(@Query('fecha') fecha: string) {
    return this.usuarioService.obtenerUsuariosActivosRecientes(new Date(fecha));
  }
  /*
  Ejemplo:
  GET http://localhost:4000/usuario/activos-recientes?fecha=2023-01-01T00:00:00Z
  */
}
