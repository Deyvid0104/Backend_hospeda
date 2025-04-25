import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
// Guardia para validar roles de usuario en rutas protegidas
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // Valida si el usuario tiene el rol requerido
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Obtiene roles requeridos del decorador @Roles
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Si no hay roles requeridos, permite acceso
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // Verifica si el rol del usuario está en la lista de roles permitidos
    const hasRole = requiredRoles.includes(user.rol);
    if (!hasRole) {
      // Si el usuario no tiene el rol, lanza excepción con mensaje personalizado
      // Si la ruta pertenece al módulo habitacion y es método POST, PUT o DELETE, mensaje específico
      const method = request.method;
      const url = request.url;
      if (url.startsWith('/habitacion') && ['POST', 'PUT', 'DELETE'].includes(method)) {
        throw new ForbiddenException('Acceso denegado: solo el administrador puede crear, modificar o eliminar habitaciones.');
      }
      // Si la ruta pertenece al módulo log-actividad, mensaje específico
      if (url.startsWith('/log-actividad')) {
        throw new ForbiddenException('Acceso denegado: solo el administrador puede acceder a los logs de actividad.');
      }
      throw new ForbiddenException('Acceso denegado: no tiene permisos para esta acción.');
    }
    return true;
  }
}
