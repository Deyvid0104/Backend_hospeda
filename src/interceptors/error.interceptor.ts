import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger('ErrorInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        this.logger.error('Error detallado:', {
          message: error.message,
          stack: error.stack,
          query: error.query, // Para errores de base de datos
          parameters: error.parameters, // Para errores de base de datos
          detail: error.detail, // Detalles adicionales de PostgreSQL
        });

        // Personalizar el mensaje de error para el cliente
        const response = {
          statusCode: error.status || 500,
          message: error.message || 'Error interno del servidor',
          error: error.name || 'InternalServerError',
          detail: error.detail || '',
          timestamp: new Date().toISOString(),
        };

        return throwError(() => response);
      }),
    );
  }
}
