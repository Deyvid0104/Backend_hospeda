import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  // Valida usuario con email y contraseña
  async validateUser(email: string, password: string): Promise<any> {
    const usuario = await this.usuarioService.buscarUsuarioPorEmail(email);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    // Compara contraseña con hash almacenado
    const passwordValid = await bcrypt.compare(password, usuario.contraseña);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    // Retorna usuario sin la contraseña
    const { contraseña, ...result } = usuario;
    return result;
  }

  // Genera token JWT con payload que incluye email, id y rol
  async login(user: any) {
    const payload = { email: user.email, sub: user.id_usuario, rol: user.rol };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
