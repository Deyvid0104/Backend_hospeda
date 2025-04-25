import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    UsuarioModule,                        // Importa módulo de usuario para validar credenciales
    PassportModule,                       // Módulo para estrategias de autenticación
    JwtModule.register({
      secret: 'TU_CLAVE_SECRETA_AQUI',    // Clave secreta para firmar tokens (usar variable de entorno)
      signOptions: { expiresIn: '1h' },   // Tiempo de expiración del token
    }),
  ],
  controllers: [AuthController],          // Controlador de autenticación
  providers: [AuthService, JwtStrategy],  // Proveedores: servicio y estrategia JWT
  exports: [AuthService],                 // Exporta servicio para uso externo
})
export class AuthModule {}
