import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

// Controlador para manejar las rutas relacionadas con la entidad Reserva
@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  // Crear una nueva reserva
  // POST /reserva
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

  // Obtener todas las reservas
  // GET /reserva
  @Get()
  obtenerTodasLasReservas() {
    return this.reservaService.obtenerTodasLasReservas();
  }
  /*
  Ejemplo:
  GET http://localhost:4000/reserva
  */

  // Obtener una reserva por ID
  // GET /reserva/:id
  @Get(':id')
  obtenerReservaPorId(@Param('id') id: string) {
    return this.reservaService.obtenerReservaPorId(+id);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/reserva/1
  */

  // Actualizar una reserva por ID
  // PUT /reserva/:id
  // Cuerpo de la petición: JSON con los campos a actualizar según UpdateReservaDto
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

  // Eliminar una reserva por ID
  // DELETE /reserva/:id
  @Delete(':id')
  eliminarReserva(@Param('id') id: string) {
    return this.reservaService.eliminarReserva(+id);
  }
  /*
  Ejemplo:
  DELETE http://localhost:4000/reserva/1
  */
}
