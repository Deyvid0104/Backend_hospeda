import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extrae token del header Authorization Bearer
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // No ignora expiración
      secretOrKey: 'TU_CLAVE_SECRETA_AQUI', // Clave secreta para validar token (usar variable de entorno)
    });
  }

  // Valida payload del token y retorna datos del usuario
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, rol: payload.rol };
  }
}
