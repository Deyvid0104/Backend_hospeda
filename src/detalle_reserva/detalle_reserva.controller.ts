import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors, BadRequestException } from '@nestjs/common';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { DetalleReservaService } from './detalle_reserva.service';
import { CreateDetalleReservaDto } from './dto/create-detalle_reserva.dto';
import { UpdateDetalleReservaDto } from './dto/update-detalle_reserva.dto';

@UseInterceptors(ErrorInterceptor)
@Controller('detalle-reserva')
export class DetalleReservaController {
  constructor(private readonly detalleReservaService: DetalleReservaService) {}

  /**
   * Crea un nuevo detalle de reserva.
   * @param createDetalleReservaDto DTO con datos del detalle.
   * @returns El detalle creado.
   */
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

  /**
   * Obtiene todos los detalles de reserva.
   * @returns Lista de detalles.
   */
  @Get()
  obtenerTodosLosDetalles() {
    return this.detalleReservaService.obtenerTodosLosDetalles();
  }
  /*
  Ejemplo:
  GET http://localhost:4000/detalle-reserva
  */

  /**
   * Obtiene un detalle de reserva por su ID.
   * @param id ID del detalle.
   * @returns El detalle encontrado.
   */
  @Get(':id')
  obtenerDetallePorId(@Param('id') id: string) {
    return this.detalleReservaService.obtenerDetallePorId(+id);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/detalle-reserva/1
  */

  /**
   * Actualiza un detalle de reserva por su ID.
   * @param id ID del detalle.
   * @param updateDetalleReservaDto DTO con datos a actualizar.
   * @returns El detalle actualizado.
   */
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

  /**
   * Elimina un detalle de reserva por su ID.
   * @param id ID del detalle.
   * @returns Resultado de la eliminación.
   */
  @Delete(':id')
  eliminarDetalle(@Param('id') id: string) {
    return this.detalleReservaService.eliminarDetalle(+id);
  }
  /*
  Ejemplo:
  DELETE http://localhost:4000/detalle-reserva/1
  */

  /**
   * Obtiene detalles de reserva por ID de reserva.
   * @param query Parámetros de consulta con id_reserva.
   * @returns Lista de detalles asociados a la reserva.
   * @throws BadRequestException si el parámetro es inválido o ausente.
   */
  @Get('reserva')
  async obtenerDetallesPorReserva(@Query() query: any) {
    const id_reserva = query.id_reserva;
    if (!id_reserva) {
      throw new BadRequestException('Parámetro id_reserva es requerido');
    }
    const idReservaNum = Number(id_reserva);
    if (isNaN(idReservaNum) || idReservaNum <= 0) {
      throw new BadRequestException('ID de reserva inválido');
    }
    try {
      const detalles = await this.detalleReservaService.obtenerDetallesPorReserva(idReservaNum);
      
      // Log para detectar detalles con habitacion null
      detalles.forEach(detalle => {
        if (!detalle.habitacion) {
          console.warn(`Detalle con id_detalle ${detalle.id_detalle} tiene habitacion null`);
        }
      });
      
      return detalles;
    } catch (error) {
      throw error;
    }
  }
  /*
  Ejemplo:
  GET http://localhost:4000/detalle-reserva/reserva?id_reserva=1
  */

  /**
   * Obtiene detalles de reserva por ID de habitación.
   * @param id_habitacion ID de la habitación.
   * @returns Lista de detalles asociados a la habitación.
   */
  @Get('habitacion')
  obtenerDetallesPorHabitacion(@Query('id_habitacion') id_habitacion: string) {
    return this.detalleReservaService.obtenerDetallesPorHabitacion(+id_habitacion);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/detalle-reserva/habitacion?id_habitacion=101
  */
}
