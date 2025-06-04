import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './entities/reserva.entity';


/**
 * Controlador ReservaController
 * Maneja las rutas y solicitudes HTTP relacionadas con la entidad Reserva.
 * Incluye endpoints para crear, obtener, actualizar y eliminar reservas.
 */
@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  /**
   * Crea una nueva reserva.
   * @param createReservaDto DTO con datos de la reserva.
   * @returns La reserva creada.
   */
  @Post()
  crearReserva(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.crearReserva(createReservaDto);
  }
  /*
  Ejemplo:
  POST http://localhost:4000/reserva
  Content-Type: application/json
  {
    "fecha_inicio": "2023-07-01",
    "fecha_fin": "2023-07-05",
    "id_huesped": 1,
    "id_habitacion": 2
  }
  */

  /**
   * Obtiene todas las reservas.
   * @returns Lista de reservas.
   */

  @Get()
  async obtenerTodasLasReservas(
    @Query('fecha_entrada') fecha_entrada?: string,
    @Query('fecha_salida') fecha_salida?: string,
    @Query('nombre_huesped') nombre_huesped?: string,
  ) {
    const filtros = { fecha_entrada, fecha_salida, nombre_huesped };
    const reservas = await this.reservaService.obtenerTodasLasReservas(filtros.fecha_entrada, filtros.fecha_salida, filtros.nombre_huesped);
    return plainToInstance(Reserva, reservas);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/reserva
  */

  /**
   * Obtiene una reserva por su ID.
   * @param id ID de la reserva.
   * @returns La reserva encontrada.
   */
  @Get(':id')
  async obtenerReservaPorId(@Param('id') id: string) {
    const reserva = await this.reservaService.obtenerReservaPorId(+id);
    return plainToInstance(Reserva, reserva);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/reserva/1
  */

  /**
   * Actualiza una reserva por su ID.
   * @param id ID de la reserva.
   * @param updateReservaDto DTO con datos a actualizar.
   * @returns La reserva actualizada.
   */
  @Put(':id')
  actualizarReserva(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservaService.actualizarReserva(+id, updateReservaDto);
  }
  /*
  Ejemplo:
  PUT http://localhost:4000/reserva/1
  Content-Type: application/json
  {
    "fecha_fin": "2023-07-06"
  }
  */

  /**
   * Elimina una reserva por su ID.
   * @param id ID de la reserva.
   * @returns Resultado de la eliminación.
   */
  @Delete(':id')
  eliminarReserva(@Param('id') id: string) {
    return this.reservaService.eliminarReserva(+id);
  }
  /*
  Ejemplo:
  DELETE http://localhost:4000/reserva/1
  */
}
