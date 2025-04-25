import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint POST /auth/login para autenticación
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    // Valida usuario con email y contraseña
    const user = await this.authService.validateUser(loginAuthDto.email, loginAuthDto.contraseña);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    // Retorna token JWT si es válido
    return this.authService.login(user);
  }
}
