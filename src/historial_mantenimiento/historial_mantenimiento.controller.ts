import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorialMantenimientoService } from './historial_mantenimiento.service';
import { CreateHistorialMantenimientoDto } from './dto/create-historial_mantenimiento.dto';
import { UpdateHistorialMantenimientoDto } from './dto/update-historial_mantenimiento.dto';

@Controller('historial-mantenimiento')
export class HistorialMantenimientoController {
  constructor(private readonly historialMantenimientoService: HistorialMantenimientoService) {}

  // Crear un nuevo historial de mantenimiento
  // POST /historial-mantenimiento
  @Post()
  crearHistorial(@Body() createHistorialMantenimientoDto: CreateHistorialMantenimientoDto) {
    return this.historialMantenimientoService.crearHistorial(createHistorialMantenimientoDto);
  }
  /*
  Ejemplo:
  POST http://localhost:4000/historial-mantenimiento
  Content-Type: application/json
  {
    "id_habitacion": 1,
    "fecha_inicio": "2024-01-01T00:00:00Z",
    "fecha_fin": "2024-01-05T00:00:00Z",
    "descripcion": "Reparación de aire acondicionado",
    "estado": "pendiente",
    "tecnico": "Juan Pérez"
  }
  */

  // Obtener todos los historiales de mantenimiento
  // GET /historial-mantenimiento
  @Get()
  obtenerTodosLosHistoriales() {
    return this.historialMantenimientoService.obtenerTodosLosHistoriales();
  }
  /*
  Ejemplo:
  GET http://localhost:4000/historial-mantenimiento
  */

  // Obtener un historial de mantenimiento por ID
  // GET /historial-mantenimiento/:id
  @Get(':id')
  obtenerHistorialPorId(@Param('id') id: string) {
    return this.historialMantenimientoService.obtenerHistorialPorId(+id);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/historial-mantenimiento/1
  */

  // Actualizar un historial de mantenimiento por ID
  // PATCH /historial-mantenimiento/:id
  @Patch(':id')
  actualizarHistorial(@Param('id') id: string, @Body() updateHistorialMantenimientoDto: UpdateHistorialMantenimientoDto) {
    return this.historialMantenimientoService.actualizarHistorial(+id, updateHistorialMantenimientoDto);
  }
  /*
  Ejemplo:
  PATCH http://localhost:4000/historial-mantenimiento/1
  Content-Type: application/json
  {
    "estado": "completado"
  }
  */

  // Eliminar un historial de mantenimiento por ID
  // DELETE /historial-mantenimiento/:id
  @Delete(':id')
  eliminarHistorial(@Param('id') id: string) {
    return this.historialMantenimientoService.eliminarHistorial(+id);
  }
  /*
  Ejemplo:
  DELETE http://localhost:4000/historial-mantenimiento/1
  */
}
