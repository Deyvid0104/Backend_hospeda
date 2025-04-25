import { SetMetadata } from '@nestjs/common';

// Decorador para definir roles permitidos en rutas protegidas
export const Roles = (...roles: ('admin' | 'recepcionista')[]) => SetMetadata('roles', roles);
