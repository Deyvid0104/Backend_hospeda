import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { DetalleFacturaService } from './detalle_factura.service';
import { CreateDetalleFacturaDto } from './dto/create-detalle_factura.dto';
import { UpdateDetalleFacturaDto } from './dto/update-detalle_factura.dto';

@Controller('detalle-factura')
export class DetalleFacturaController {
  constructor(private readonly detalleFacturaService: DetalleFacturaService) {}

  // Crear un nuevo detalle de factura
  // POST /detalle-factura
  @Post()
  crearDetalle(@Body() createDetalleFacturaDto: CreateDetalleFacturaDto) {
    return this.detalleFacturaService.crearDetalle(createDetalleFacturaDto);
  }
  /*
  Ejemplo:
  POST http://localhost:4000/detalle-factura
  Content-Type: application/json
  {
    "id_factura": 1,
    "id_servicio": 2,
    "cantidad": 3,
    "precio_unitario": 100.00
  }
  */

  // Obtener todos los detalles de factura
  // GET /detalle-factura
  @Get()
  obtenerTodosLosDetalles() {
    return this.detalleFacturaService.obtenerTodosLosDetalles();
  }
  /*
  Ejemplo:
  GET http://localhost:4000/detalle-factura
  */

  // Obtener un detalle de factura por ID
  // GET /detalle-factura/:id
  @Get(':id')
  obtenerDetallePorId(@Param('id') id: string) {
    return this.detalleFacturaService.obtenerDetallePorId(+id);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/detalle-factura/1
  */

  // Actualizar un detalle de factura por ID
  // PUT /detalle-factura/:id
  @Put(':id')
  actualizarDetalle(@Param('id') id: string, @Body() updateDetalleFacturaDto: UpdateDetalleFacturaDto) {
    return this.detalleFacturaService.actualizarDetalle(+id, updateDetalleFacturaDto);
  }
  /*
  Ejemplo:
  PUT http://localhost:4000/detalle-factura/1
  Content-Type: application/json
  {
    "cantidad": 5
  }
  */

  // Eliminar un detalle de factura por ID
  // DELETE /detalle-factura/:id
  @Delete(':id')
  eliminarDetalle(@Param('id') id: string) {
    return this.detalleFacturaService.eliminarDetalle(+id);
  }
  /*
  Ejemplo:
  DELETE http://localhost:4000/detalle-factura/1
  */

  // Obtener detalles por id_factura
  // GET /detalle-factura/factura?id_factura=1
  @Get('factura')
  obtenerDetallesPorFactura(@Query('id_factura') id_factura: string) {
    return this.detalleFacturaService.obtenerDetallesPorFactura(+id_factura);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/detalle-factura/factura?id_factura=1
  */

  // Obtener detalles por id_servicio
  // GET /detalle-factura/servicio?id_servicio=2
  @Get('servicio')
  obtenerDetallesPorServicio(@Query('id_servicio') id_servicio: string) {
    return this.detalleFacturaService.obtenerDetallesPorServicio(+id_servicio);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/detalle-factura/servicio?id_servicio=2
  */
}
