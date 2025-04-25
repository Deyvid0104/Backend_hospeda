import { IsString, IsEmail, IsEnum } from 'class-validator';

export class CreateUsuarioDto {
  // Nombre de usuario
  @IsString()
  nombre_usuario: string;

  // Rol del usuario: admin o recepcionista
  @IsEnum(['admin', 'recepcionista'])
  rol: 'admin' | 'recepcionista';

  // Contraseña en texto plano (se hasheará en el servicio)
  @IsString()
  contraseña: string;

  // Correo electrónico
  @IsEmail()
  email: string;

  // Fecha y hora del último acceso
  @IsString()
  ultimo_acceso: Date;
}
