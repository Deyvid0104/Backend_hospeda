import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';

// Controlador para manejar las rutas relacionadas con la entidad Factura
@Controller('factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  // Obtener factura por id_reserva
  // GET /factura/por-reserva/:id_reserva
  @Get('por-reserva/:id_reserva')
  obtenerFacturaPorReserva(@Param('id_reserva') id_reserva: string) {
    return this.facturaService.obtenerFacturaPorReserva(+id_reserva);
  }

  // Crear una nueva factura
  // POST /factura
  @Post()
  crearFactura(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturaService.crearFactura(createFacturaDto);
  }
  /*
  Ejemplo:
  POST http://localhost:4000/factura
  Content-Type: application/json
  {
    "monto_total": 150.00,
    "metodo_pago": "efectivo"
  }
  */

  // Obtener todas las facturas o filtradas por estado y método de pago
  // GET /factura?estado=pendiente&metodo_pago=efectivo
  @Get()
  obtenerFacturasFiltradas(
    @Query('estado') estado?: string,
    @Query('metodo_pago') metodo_pago?: string,
  ) {
    if (estado || metodo_pago) {
      return this.facturaService.obtenerFacturasFiltradas(estado, metodo_pago);
    }
    return this.facturaService.obtenerTodasLasFacturas();
  }
  /*
  Ejemplo:
  GET http://localhost:4000/factura
  */

  // Obtener una factura por ID
  // GET /factura/:id
  @Get(':id')
  obtenerFacturaPorId(@Param('id') id: string) {
    return this.facturaService.obtenerFacturaPorId(+id);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/factura/1
  */

  // Actualizar una factura por ID
  // PUT /factura/:id
  @Put(':id')
  actualizarFactura(@Param('id') id: string, @Body() updateFacturaDto: UpdateFacturaDto) {
    return this.facturaService.actualizarFactura(+id, updateFacturaDto);
  }
  /*
  Ejemplo:
  PUT http://localhost:4000/factura/1
  Content-Type: application/json
  {
    "monto_total": 160.00
  }
  */

  // Eliminar una factura por ID
  // DELETE /factura/:id
  @Delete(':id')
  eliminarFactura(@Param('id') id: string) {
    return this.facturaService.eliminarFactura(+id);
  }
  /*
  Ejemplo:
  DELETE http://localhost:4000/factura/1
  */

  // Obtener facturas por rango de monto_total
  // GET /factura/rango-monto?montoMin=100&montoMax=200
  @Get('rango-monto')
  obtenerFacturasPorRangoMonto(@Query('montoMin') montoMin: string, @Query('montoMax') montoMax: string) {
    return this.facturaService.obtenerFacturasPorRangoMonto(+montoMin, +montoMax);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/factura/rango-monto?montoMin=100&montoMax=200
  */

  // Obtener facturas por método de pago
  // GET /factura/metodo-pago?metodo=efectivo
  @Get('metodo-pago')
  obtenerFacturasPorMetodoPago(@Query('metodo') metodo: 'efectivo' | 'tarjeta' | 'transferencia') {
    return this.facturaService.obtenerFacturasPorMetodoPago(metodo);
  }
  /*
  Ejemplo:
  GET http://localhost:4000/factura/metodo-pago?metodo=efectivo
  */
}
