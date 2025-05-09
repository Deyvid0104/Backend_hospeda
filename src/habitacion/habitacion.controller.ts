import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { HabitacionService } from './habitacion.service';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { UpdateHabitacionDto } from './dto/update-habitacion.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('habitacion')
export class HabitacionController {
  constructor(private readonly habitacionService: HabitacionService) {}

  // Crear una nueva habitación
  // POST /habitacion
  @Post()
  @Roles('admin')
  crearHabitacion(@Body() createHabitacionDto: CreateHabitacionDto) {
    return this.habitacionService.crearHabitacion(createHabitacionDto);
  }
  /*
  Ejemplo:
  POST http://localhost:4000/habitacion
  Content-Type: application/json
  {
    "numero": 101,
    "tipo": "doble",
    "precio_base": 120.00,
    "estado": "libre",
    "capacidad": 2,
    "foto": "https://example.com/foto.jpg"
  }
  */

  // Obtener todas las habitaciones
  // GET /habitacion
  @Get()
  obtenerTodasLasHabitaciones() {
    return this.habitacionService.obtenerTodasLasHabitaciones();
  }
  /*
  Ejemplo:
  GET http://localhost:4000/habitacion
  */

  // Obtener una habitación por ID
  // GET /habitacion/:id
  @Get(':id')
  obtenerHabitacionPorId(@Param('id') id: string) {
    return this.habitacionService.obtenerHabitacionPorId(+id);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/habitacion/1
  */

  // Actualizar una habitación por ID
  // PUT /habitacion/:id
  // Cuerpo de la petición: JSON con los campos a actualizar según UpdateHabitacionDto
  @Put(':id')
  @Roles('admin')
  actualizarHabitacion(@Param('id') id: string, @Body() updateHabitacionDto: UpdateHabitacionDto) {
    return this.habitacionService.actualizarHabitacion(+id, updateHabitacionDto);
  }
  /*
  Ejemplo:
  PUT http://localhost:4000/habitacion/1
  Content-Type: application/json
  {
    "estado": "ocupada",
    "foto": "https://example.com/nueva-foto.jpg"
  }
  */

  // Eliminar una habitación por ID
  // DELETE /habitacion/:id
  @Delete(':id')
  @Roles('admin')
  eliminarHabitacion(@Param('id') id: string) {
    return this.habitacionService.eliminarHabitacion(+id);
  }
  /*
  Ejemplo:
  DELETE http://localhost:4000/habitacion/1
  */

  // Obtener habitaciones por tipo
  // GET /habitacion/tipo?tipo=doble
  @Get('tipo')
  obtenerHabitacionesPorTipo(@Query('tipo') tipo: 'individual' | 'doble' | 'triple' | 'dormitorio') {
    return this.habitacionService.obtenerHabitacionesPorTipo(tipo);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/habitacion/tipo?tipo=doble
  */

  // Obtener habitaciones por estado
  // GET /habitacion/estado?estado=libre
  @Get('estado')
  obtenerHabitacionesPorEstado(@Query('estado') estado: 'libre' | 'ocupada' | 'limpieza' | 'mantenimiento') {
    return this.habitacionService.obtenerHabitacionesPorEstado(estado);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/habitacion/estado?estado=libre
  */

  // Obtener habitaciones por rango de precio_base
  // GET /habitacion/rango-precio?precioMin=50&precioMax=150
  @Get('rango-precio')
  obtenerHabitacionesPorRangoPrecio(@Query('precioMin') precioMin: string, @Query('precioMax') precioMax: string) {
    return this.habitacionService.obtenerHabitacionesPorRangoPrecio(+precioMin, +precioMax);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/habitacion/rango-precio?precioMin=50&precioMax=150
  */

  // Buscar habitaciones por número exacto
  // GET /habitacion/buscar-numero?numero=101
  @Get('buscar-numero')
  buscarHabitacionesPorNumero(@Query('numero') numero: string) {
    return this.habitacionService.buscarHabitacionesPorNumero(+numero);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/habitacion/buscar-numero?numero=101
  */
}
