import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ContactoEmergenciaService } from './contacto_emergencia.service';
import { CreateContactoEmergenciaDto } from './dto/create-contacto_emergencia.dto';
import { UpdateContactoEmergenciaDto } from './dto/update-contacto_emergencia.dto';

@Controller('contacto-emergencia')
export class ContactoEmergenciaController {
  constructor(private readonly contactoEmergenciaService: ContactoEmergenciaService) {}

  // Crear un nuevo contacto de emergencia
  // POST /contacto-emergencia
  @Post()
  crearContacto(@Body() createContactoEmergenciaDto: CreateContactoEmergenciaDto) {
    return this.contactoEmergenciaService.crearContacto(createContactoEmergenciaDto);
  }
  /*
  Ejemplo:
  POST http://localhost:4000/contacto-emergencia
  Content-Type: application/json
  {
    "id_huesped": 1,
    "nombre": "Juan Perez",
    "telefono": "123456789",
    "parentesco": "Hermano"
  }
  */

  // Obtener todos los contactos de emergencia
  // GET /contacto-emergencia
  @Get()
  obtenerTodosLosContactos() {
    return this.contactoEmergenciaService.obtenerTodosLosContactos();
  }
  /*
  Ejemplo:
  GET http://localhost:4000/contacto-emergencia
  */

  // Obtener un contacto de emergencia por ID
  // GET /contacto-emergencia/:id
  @Get(':id')
  obtenerContactoPorId(@Param('id') id: string) {
    return this.contactoEmergenciaService.obtenerContactoPorId(+id);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/contacto-emergencia/1
  */

  // Actualizar un contacto de emergencia por ID
  // PUT /contacto-emergencia/:id
  @Put(':id')
  actualizarContacto(@Param('id') id: string, @Body() updateContactoEmergenciaDto: UpdateContactoEmergenciaDto) {
    return this.contactoEmergenciaService.actualizarContacto(+id, updateContactoEmergenciaDto);
  }
  /*
  Ejemplo:
  PUT http://localhost:4000/contacto-emergencia/1
  Content-Type: application/json
  {
    "telefono": "987654321"
  }
  */

  // Eliminar un contacto de emergencia por ID
  // DELETE /contacto-emergencia/:id
  @Delete(':id')
  eliminarContacto(@Param('id') id: string) {
    return this.contactoEmergenciaService.eliminarContacto(+id);
  }
  /*
  Ejemplo:
  DELETE http://localhost:4000/contacto-emergencia/1
  */

  // Buscar contactos por nombre parcial
  // GET /contacto-emergencia/buscar?nombre=Juan
  @Get('buscar')
  buscarContactosPorNombre(@Query('nombre') nombre: string) {
    return this.contactoEmergenciaService.buscarContactosPorNombre(nombre);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/contacto-emergencia/buscar?nombre=Juan
  */

  // Obtener contactos por id_huesped
  // GET /contacto-emergencia/huesped?id_huesped=1
  @Get('huesped')
  obtenerContactosPorHuesped(@Query('id_huesped') id_huesped: string) {
    return this.contactoEmergenciaService.obtenerContactosPorHuesped(+id_huesped);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/contacto-emergencia/huesped?id_huesped=1
  */
}
