import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { DetalleReservaService } from './detalle_reserva.service';
import { CreateDetalleReservaDto } from './dto/create-detalle_reserva.dto';
import { UpdateDetalleReservaDto } from './dto/update-detalle_reserva.dto';

@UseInterceptors(ErrorInterceptor)
@Controller('detalle-reserva')
export class DetalleReservaController {
  constructor(private readonly detalleReservaService: DetalleReservaService) {}

  // Crear un nuevo detalle de reserva
  // POST /detalle-reserva
  @Post()
  crearDetalle(@Body() createDetalleReservaDto: CreateDetalleReservaDto) {
    return this.detalleReservaService.crearDetalle(createDetalleReservaDto);
  }
  /*
  Ejemplo:
  POST http://localhost:4000/detalle-reserva
  Content-Type: application/json
  {
    "id_reserva": 1,
    "id_habitacion": 101,
    "precio": 120.00
  }
  */

  // Obtener todos los detalles de reserva
  // GET /detalle-reserva
  @Get()
  obtenerTodosLosDetalles() {
    return this.detalleReservaService.obtenerTodosLosDetalles();
  }
  /*
  Ejemplo:
  GET http://localhost:4000/detalle-reserva
  */

  // Obtener un detalle de reserva por ID
  // GET /detalle-reserva/:id
  @Get(':id')
  obtenerDetallePorId(@Param('id') id: string) {
    return this.detalleReservaService.obtenerDetallePorId(+id);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/detalle-reserva/1
  */

  // Actualizar un detalle de reserva por ID
  // PUT /detalle-reserva/:id
  @Put(':id')
  actualizarDetalle(@Param('id') id: string, @Body() updateDetalleReservaDto: UpdateDetalleReservaDto) {
    return this.detalleReservaService.actualizarDetalle(+id, updateDetalleReservaDto);
  }
  /*
  Ejemplo:
  PUT http://localhost:4000/detalle-reserva/1
  Content-Type: application/json
  {
    "precio": 130.00
  }
  */

  // Eliminar un detalle de reserva por ID
  // DELETE /detalle-reserva/:id
  @Delete(':id')
  eliminarDetalle(@Param('id') id: string) {
    return this.detalleReservaService.eliminarDetalle(+id);
  }
  /*
  Ejemplo:
  DELETE http://localhost:4000/detalle-reserva/1
  */

  // Obtener detalles por id_reserva
  // GET /detalle-reserva/reserva?id_reserva=1
  @Get('reserva')
  async obtenerDetallesPorReserva(@Query('id_reserva') id_reserva: string) {
    if (!id_reserva) {
      console.error('ID de reserva no proporcionado');
      throw new Error('ID de reserva es requerido');
    }

    const idReservaNum = Number(id_reserva);
    if (isNaN(idReservaNum) || idReservaNum <= 0) {
      console.error(`ID de reserva inválido recibido: ${id_reserva}`);
      throw new Error('ID de reserva debe ser un número válido mayor que 0');
    }

    try {
      console.log(`Buscando detalles para reserva ${idReservaNum}`);
      const detalles = await this.detalleReservaService.obtenerDetallesPorReserva(idReservaNum);
      
      // Log para detectar detalles con habitacion null después del fallback
      const detallesNulos = detalles.filter(d => !d.habitacion);
      if (detallesNulos.length > 0) {
        console.warn(`${detallesNulos.length} detalles sin habitación después del fallback:`, 
          detallesNulos.map(d => d.id_detalle));
      }
      
      console.log('Detalles encontrados:', JSON.stringify(detalles, null, 2));
      return detalles;
    } catch (error) {
      console.error('Error al obtener detalles de reserva:', error);
      throw error;
    }
  }
  /*
  Ejemplo:
  GET http://localhost:4000/detalle-reserva/reserva?id_reserva=1
  */

  // Obtener detalles por id_habitacion
  // GET /detalle-reserva/habitacion?id_habitacion=101
  @Get('habitacion')
  async obtenerDetallesPorHabitacion(@Query('id_habitacion') id_habitacion: string) {
    if (!id_habitacion) {
      console.error('ID de habitación no proporcionado');
      throw new Error('ID de habitación es requerido');
    }

    const idHabitacionNum = Number(id_habitacion);
    if (isNaN(idHabitacionNum) || idHabitacionNum <= 0) {
      console.error(`ID de habitación inválido recibido: ${id_habitacion}`);
      throw new Error('ID de habitación debe ser un número válido mayor que 0');
    }

    try {
      console.log(`Buscando detalles para habitación ${idHabitacionNum}`);
      const detalles = await this.detalleReservaService.obtenerDetallesPorHabitacion(idHabitacionNum);
      
      // Log para detectar detalles con habitacion null después del fallback
      const detallesNulos = detalles.filter(d => !d.habitacion);
      if (detallesNulos.length > 0) {
        console.warn(`${detallesNulos.length} detalles sin habitación después del fallback:`, 
          detallesNulos.map(d => d.id_detalle));
      }
      
      console.log('Detalles encontrados:', JSON.stringify(detalles, null, 2));
      return detalles;
    } catch (error) {
      console.error('Error al obtener detalles por habitación:', error);
      throw error;
    }
  }
  /*
  Ejemplo:
  GET http://localhost:4000/detalle-reserva/habitacion?id_habitacion=101
  */
}
