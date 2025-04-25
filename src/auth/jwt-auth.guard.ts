import { Injectable } from '@nestjs/common';
// Guardia para proteger rutas con JWT
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
