/**
 * Controlador AppController
 * Controlador principal para manejar la ruta raíz y otras rutas generales.
 * Proporciona un endpoint simple para verificar que el servicio está activo.
 */

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Endpoint GET raíz.
   * @returns Mensaje de bienvenida o estado del servicio.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
