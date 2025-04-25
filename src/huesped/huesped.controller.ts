import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { HuespedService } from './huesped.service';
import { CreateHuespedDto } from './dto/create-huesped.dto';
import { UpdateHuespedDto } from './dto/update-huesped.dto';

@Controller('huesped')
export class HuespedController {
  constructor(private readonly huespedService: HuespedService) {}

  // Crear un huésped
  // POST /huesped
  @Post()
  crearHuesped(@Body() createHuespedDto: CreateHuespedDto) {
    return this.huespedService.crearHuesped(createHuespedDto);
  }
  /*
  Ejemplo:
  POST http://localhost:4000/huesped
  Content-Type: application/json
  {
    "nombre": "Carlos",
    "apellidos": "Gomez",
    "email": "carlos@example.com",
    "telefono": "555-9876"
  }
  */

  // Obtener todos los huéspedes
  // GET /huesped
  @Get()
  obtenerTodosLosHuespedes() {
    return this.huespedService.obtenerTodosLosHuespedes();
  }
  /*
  Ejemplo:
  GET http://localhost:4000/huesped
  */

  // Obtener un huésped por ID
  // GET /huesped/:id
  @Get(':id')
  obtenerHuespedPorId(@Param('id') id: string) {
    return this.huespedService.obtenerHuespedPorId(+id);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/huesped/1
  */

  // Actualizar un huésped por ID
  // PUT /huesped/:id
  // Cuerpo de la petición: JSON con los campos a actualizar según UpdateHuespedDto
  @Put(':id')
  actualizarHuesped(@Param('id') id: string, @Body() updateHuespedDto: UpdateHuespedDto) {
    return this.huespedService.actualizarHuesped(+id, updateHuespedDto);
  }
  /*
  Ejemplo:
  PUT http://localhost:4000/huesped/1
  Content-Type: application/json
  {
    "telefono": "555-4321"
  }
  */

  // Eliminar un huésped por ID
  // DELETE /huesped/:id
  @Delete(':id')
  eliminarHuesped(@Param('id') id: string) {
    return this.huespedService.eliminarHuesped(+id);
  }
  /*
  Ejemplo:
  DELETE http://localhost:4000/huesped/1
  */
}
