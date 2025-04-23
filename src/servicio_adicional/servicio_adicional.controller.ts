import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicioAdicionalService } from './servicio_adicional.service';
import { CreateServicioAdicionalDto } from './dto/create-servicio_adicional.dto';
import { UpdateServicioAdicionalDto } from './dto/update-servicio_adicional.dto';

@Controller('servicio-adicional')
export class ServicioAdicionalController {
  constructor(private readonly servicioAdicionalService: ServicioAdicionalService) {}

  // Crear un nuevo servicio adicional
  // POST /servicio-adicional
  @Post()
  crearServicio(@Body() createServicioAdicionalDto: CreateServicioAdicionalDto) {
    return this.servicioAdicionalService.create(createServicioAdicionalDto);
  }
  /*
  Ejemplo:
  POST http://localhost:4000/servicio-adicional
  Content-Type: application/json
  {
    "nombre": "Desayuno",
    "precio": 10.00
  }
  */

  // Obtener todos los servicios adicionales
  // GET /servicio-adicional
  @Get()
  obtenerServicios() {
    return this.servicioAdicionalService.findAll();
  }
  /*
  Ejemplo:
  GET http://localhost:4000/servicio-adicional
  */

  // Obtener un servicio adicional por ID
  // GET /servicio-adicional/:id
  @Get(':id')
  obtenerServicioPorId(@Param('id') id: string) {
    return this.servicioAdicionalService.findOne(+id);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/servicio-adicional/1
  */

  // Actualizar un servicio adicional por ID
  // PATCH /servicio-adicional/:id
  @Patch(':id')
  actualizarServicio(@Param('id') id: string, @Body() updateServicioAdicionalDto: UpdateServicioAdicionalDto) {
    return this.servicioAdicionalService.update(+id, updateServicioAdicionalDto);
  }
  /*
  Ejemplo:
  PATCH http://localhost:4000/servicio-adicional/1
  Content-Type: application/json
  {
    "precio": 12.00
  }
  */

  // Eliminar un servicio adicional por ID
  // DELETE /servicio-adicional/:id
  @Delete(':id')
  eliminarServicio(@Param('id') id: string) {
    return this.servicioAdicionalService.remove(+id);
  }
  /*
  Ejemplo:
  DELETE http://localhost:4000/servicio-adicional/1
  */
}
