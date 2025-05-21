import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { LogActividadService } from './log_actividad.service';
import { CreateLogActividadDto } from './dto/create-log_actividad.dto';
import { UpdateLogActividadDto } from './dto/update-log_actividad.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

// Controlador para manejar las rutas relacionadas con la entidad LogActividad
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('log-actividad')
export class LogActividadController {
  constructor(private readonly logActividadService: LogActividadService) {}

  // Crear un nuevo log de actividad
  // POST /log-actividad
  @Post()
  crear(@Body() createLogActividadDto: CreateLogActividadDto) {
    return this.logActividadService.crearLog(createLogActividadDto);
  }
  /*
  Ejemplo:
  POST http://localhost:4000/log-actividad
  Content-Type: application/json
  {
    "id_usuario": 1,
    "accion": "Login exitoso",
    "fecha": "2024-06-01T12:00:00Z"
  }
  */

  // Obtener todos los logs de actividad
  // GET /log-actividad
  @Get()
  obtenerTodos() {
    return this.logActividadService.obtenerTodosLosLogs();
  }
  /*
  Ejemplo:
  GET http://localhost:4000/log-actividad
  */

  // Obtener un log de actividad por ID
  // GET /log-actividad/:id
  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.logActividadService.obtenerLogPorId(+id);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/log-actividad/1
  */

  // Obtener logs por usuario
  // GET /log-actividad/usuario/:id_usuario
  @Get('usuario/:id_usuario')
  obtenerPorUsuario(@Param('id_usuario') id_usuario: string) {
    return this.logActividadService.obtenerLogsPorUsuario(+id_usuario);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/log-actividad/usuario/1
  */

  // Buscar logs por acción parcial
  // GET /log-actividad/buscar/:accion
  @Get('buscar/:accion')
  buscarPorAccion(@Param('accion') accion: string) {
    return this.logActividadService.buscarLogsPorAccion(accion);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/log-actividad/buscar/Login
  */

  // Actualizar un log de actividad por ID
  // PUT /log-actividad/:id
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() updateLogActividadDto: UpdateLogActividadDto) {
    return this.logActividadService.actualizarLog(+id, updateLogActividadDto);
  }
  /*
  Ejemplo:
  PUT http://localhost:4000/log-actividad/1
  Content-Type: application/json
  {
    "accion": "Logout"
  }
  */

  // Eliminar un log de actividad por ID
  // DELETE /log-actividad/:id
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.logActividadService.eliminarLog(+id);
  }
  /*
  Ejemplo:
  DELETE http://localhost:4000/log-actividad/1
  */
}
