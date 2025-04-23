# Hospeda+ Backend

Sistema backend para la gestión de huéspedes en establecimientos hoteleros, desarrollado con NestJS y TypeScript, con arquitectura modular y escalable.

---

## Requisitos

- Node.js v16 o superior
- npm v8 o superior
- MySQL (configurado y en ejecución)

---

## Instalación

1. Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd hospeda
```

2. Instala las dependencias:

```bash
npm install
```

---

## Configuración

Copia el archivo de ejemplo de variables de entorno y configura los valores necesarios:

```bash
copy .env.ejemplo .env
```

Configura las variables para la conexión a la base de datos MySQL:

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=nombre_base_de_datos
```

---

## Comandos disponibles

- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run start:dev` - Ejecuta la aplicación en modo desarrollo con recarga automática
- `npm run start:debug` - Ejecuta la aplicación en modo debug
- `npm run build` - Compila el proyecto
- `npm run lint` - Ejecuta ESLint para análisis y corrección de código
- `npm run format` - Formatea el código con Prettier
- `npm run test` - Ejecuta pruebas unitarias
- `npm run test:e2e` - Ejecuta pruebas end-to-end
- `npm run test:cov` - Genera reporte de cobertura de pruebas

---

## Dependencias

Dependencias principales:

- @nestjs/common
- @nestjs/config
- @nestjs/core
- @nestjs/jwt
- @nestjs/mapped-types
- @nestjs/passport
- @nestjs/platform-express
- @nestjs/typeorm
- @types/bcrypt
- @types/passport-jwt
- @types/passport-local
- bcrypt
- class-validator
- mysql
- passport
- passport-jwt
- passport-local
- reflect-metadata
- rxjs
- typeorm

Dependencias de desarrollo:

- @eslint/eslintrc
- @eslint/js
- @nestjs/cli
- @nestjs/schematics
- @nestjs/testing
- @swc/cli
- @swc/core
- @types/express
- @types/jest
- @types/node
- @types/supertest
- eslint
- eslint-config-prettier
- eslint-plugin-prettier
- globals
- jest
- prettier
- source-map-support
- supertest
- ts-jest
- ts-loader
- ts-node
- tsconfig-paths
- typescript
- typescript-eslint

---

## Tecnologías usadas

- NestJS
- TypeScript
- TypeORM
- MySQL
- Passport (JWT y local)
- RxJS
- ESLint
- Prettier
- Jest

---

## Endpoints disponibles

### Huéspedes

- `POST /huesped` - Crear un huésped
- `GET /huesped` - Obtener todos los huéspedes
- `GET /huesped/:id` - Obtener un huésped por ID
- `PATCH /huesped/:id` - Actualizar un huésped por ID
- `DELETE /huesped/:id` - Eliminar un huésped por ID

### Habitaciones

- `POST /habitacion` - Crear una nueva habitación
- `GET /habitacion` - Obtener todas las habitaciones
- `GET /habitacion/:id` - Obtener una habitación por ID
- `PATCH /habitacion/:id` - Actualizar una habitación por ID
- `DELETE /habitacion/:id` - Eliminar una habitación por ID
- `GET /habitacion/tipo?tipo=...` - Obtener habitaciones por tipo
- `GET /habitacion/estado?estado=...` - Obtener habitaciones por estado
- `GET /habitacion/rango-precio?precioMin=...&precioMax=...` - Obtener habitaciones por rango de precio
- `GET /habitacion/buscar-numero?numero=...` - Buscar habitaciones por número exacto

### Reservas

- `POST /reserva` - Crear una nueva reserva
- `GET /reserva` - Obtener todas las reservas
- `GET /reserva/:id` - Obtener una reserva por ID
- `PATCH /reserva/:id` - Actualizar una reserva por ID
- `DELETE /reserva/:id` - Eliminar una reserva por ID

### Servicios Adicionales

- `POST /servicio-adicional` - Crear un nuevo servicio adicional
- `GET /servicio-adicional` - Obtener todos los servicios adicionales
- `GET /servicio-adicional/:id` - Obtener un servicio adicional por ID
- `PATCH /servicio-adicional/:id` - Actualizar un servicio adicional por ID
- `DELETE /servicio-adicional/:id` - Eliminar un servicio adicional por ID

### Contactos de Emergencia

- `POST /contacto-emergencia` - Crear un nuevo contacto de emergencia
- `GET /contacto-emergencia` - Obtener todos los contactos de emergencia
- `GET /contacto-emergencia/:id` - Obtener un contacto de emergencia por ID
- `PATCH /contacto-emergencia/:id` - Actualizar un contacto de emergencia por ID
- `DELETE /contacto-emergencia/:id` - Eliminar un contacto de emergencia por ID
- `GET /contacto-emergencia/buscar?nombre=...` - Buscar contactos por nombre parcial
- `GET /contacto-emergencia/huesped?id_huesped=...` - Obtener contactos por huésped

### Facturas

- `POST /factura` - Crear una nueva factura
- `GET /factura` - Obtener todas las facturas
- `GET /factura/:id` - Obtener una factura por ID
- `PATCH /factura/:id` - Actualizar una factura por ID
- `DELETE /factura/:id` - Eliminar una factura por ID
- `GET /factura/rango-monto?montoMin=...&montoMax=...` - Obtener facturas por rango de monto
- `GET /factura/metodo-pago?metodo=...` - Obtener facturas por método de pago

### Detalles de Factura

- `POST /detalle-factura` - Crear un nuevo detalle de factura
- `GET /detalle-factura` - Obtener todos los detalles de factura
- `GET /detalle-factura/:id` - Obtener un detalle de factura por ID
- `PATCH /detalle-factura/:id` - Actualizar un detalle de factura por ID
- `DELETE /detalle-factura/:id` - Eliminar un detalle de factura por ID
- `GET /detalle-factura/factura?id_factura=...` - Obtener detalles por factura
- `GET /detalle-factura/servicio?id_servicio=...` - Obtener detalles por servicio

### Detalles de Reserva

- `POST /detalle-reserva` - Crear un nuevo detalle de reserva
- `GET /detalle-reserva` - Obtener todos los detalles de reserva
- `GET /detalle-reserva/:id` - Obtener un detalle de reserva por ID
- `PATCH /detalle-reserva/:id` - Actualizar un detalle de reserva por ID
- `DELETE /detalle-reserva/:id` - Eliminar un detalle de reserva por ID
- `GET /detalle-reserva/reserva?id_reserva=...` - Obtener detalles por reserva
- `GET /detalle-reserva/habitacion?id_habitacion=...` - Obtener detalles por habitación

### Historial de Mantenimiento

- `POST /historial-mantenimiento` - Crear un nuevo historial de mantenimiento
- `GET /historial-mantenimiento` - Obtener todos los historiales de mantenimiento
- `GET /historial-mantenimiento/:id` - Obtener un historial de mantenimiento por ID
- `PATCH /historial-mantenimiento/:id` - Actualizar un historial de mantenimiento por ID
- `DELETE /historial-mantenimiento/:id` - Eliminar un historial de mantenimiento por ID

### Logs de Actividad

- `POST /log-actividad` - Crear un nuevo log de actividad
- `GET /log-actividad` - Obtener todos los logs de actividad
- `GET /log-actividad/:id` - Obtener un log de actividad por ID
- `GET /log-actividad/usuario/:id_usuario` - Obtener logs por usuario
- `GET /log-actividad/buscar/:accion` - Buscar logs por acción parcial
- `PATCH /log-actividad/:id` - Actualizar un log de actividad por ID
- `DELETE /log-actividad/:id` - Eliminar un log de actividad por ID

### Usuarios

- `POST /usuario` - Crear un usuario
- `GET /usuario` - Obtener todos los usuarios
- `GET /usuario/:id` - Obtener un usuario por ID
- `PATCH /usuario/:id` - Actualizar un usuario por ID
- `DELETE /usuario/:id` - Eliminar un usuario por ID
- `GET /usuario/rol?rol=...` - Obtener usuarios por rol
- `GET /usuario/buscar?nombre=...` - Buscar usuarios por nombre parcial
- `GET /usuario/email?email=...` - Buscar usuario por email exacto
- `GET /usuario/activos-recientes?fecha=...` - Obtener usuarios con último acceso después de una fecha dada

---

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
