import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HuespedModule } from './huesped/huesped.module';
import { ServicioAdicionalModule } from './servicio_adicional/servicio_adicional.module';
import { AuthModule } from './auth/auth.module';
import { DetalleFacturaModule } from './detalle_factura/detalle_factura.module';
import { FacturaModule } from './factura/factura.module';
import { ContactoEmergenciaModule } from './contacto_emergencia/contacto_emergencia.module';
import { ReservaModule } from './reserva/reserva.module';
import { DetalleReservaModule } from './detalle_reserva/detalle_reserva.module';
import { UsuarioModule } from './usuario/usuario.module';
import { LogActividadModule } from './log_actividad/log_actividad.module';
import { HabitacionModule } from './habitacion/habitacion.module';
import { HistorialMantenimientoModule } from './historial_mantenimiento/historial_mantenimiento.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,}), 
    TypeOrmModule.forRoot({
      name:'austral',                 //Nombre de la conexión a la base de datos. Se puede usar para varias conexiones a la misma base de datos.
      type:'mysql',                   //Tipo de base de datos
      host:process.env.URL,           //URL de la base de datos
      port:30306,                     //Puerto de la base de datos
      username:process.env.USUARIO,   //Usuario de la base de datos
      password:process.env.PASSWORD,  //Contraseña de la base de datos
      database: process.env.DBNAME,   //Nombre de la base de datos
      autoLoadEntities:true,          //Esta es la mejor opción para que coja sólo las que haya en módulo
      synchronize:true,               //Esto es para que cada vez que se inicie la app, se sincronice con la base de datos. No usar en producción.
    }),
    HuespedModule,
    ServicioAdicionalModule,
    AuthModule,
    DetalleFacturaModule,
    FacturaModule,
    ContactoEmergenciaModule,
    ReservaModule,
    DetalleReservaModule,
    UsuarioModule,
    LogActividadModule,
    HabitacionModule,
    HistorialMantenimientoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
