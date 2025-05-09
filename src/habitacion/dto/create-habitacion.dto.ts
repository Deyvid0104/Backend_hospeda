import { IsString, IsEnum, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateHabitacionDto {
  // Número identificador de la habitación
  @IsNumber()
  numero: number;

  // Tipo de habitación: individual, doble, triple o dormitorio
  @IsEnum(['individual', 'doble', 'triple', 'dormitorio'])
  tipo: 'individual' | 'doble' | 'triple' | 'dormitorio';

  // Estado actual de la habitación: libre, ocupada, limpieza o mantenimiento
  @IsEnum(['libre', 'ocupada', 'limpieza', 'mantenimiento'])
  estado: 'libre' | 'ocupada' | 'limpieza' | 'mantenimiento';

  // Precio base de la habitación con hasta dos decimales
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01, { message: 'El precio base debe ser un valor positivo' })
  precio_base: number;

  // Capacidad máxima de personas que puede alojar la habitación
  @IsNumber()
  capacidad: number;

  // Foto de la habitación (URL o base64)
  @IsOptional()
  @IsString()
  foto?: string;
}
