# Lista completa de peticiones a la API con ejemplos, ordenada por módulos

## 1. auth
```http
// Endpoint POST /auth/login para autenticación
// POST /auth/login
// Body: { "email": "user@example.com", "contraseña": "password" }
POST /auth/login
```

## 2. habitacion
```http
// Crear una nueva habitación
// POST /habitacion
// Body example:
// {
//   "numero": 101,
//   "tipo": "doble",
//   "precio_base": 120.00,
//   "estado": "libre",
//   "capacidad": 2,
//   "foto": "https://example.com/foto.jpg"
// }
POST /habitacion

// Obtener todas las habitaciones
// GET /habitacion
GET /habitacion

// Obtener una habitación por ID
// GET /habitacion/:id
GET /habitacion/1

// Actualizar una habitación por ID
// PUT /habitacion/:id
// Body example:
// {
//   "estado": "ocupada",
//   "foto": "https://example.com/nueva-foto.jpg"
// }
PUT /habitacion/1

// Eliminar una habitación por ID
// DELETE /habitacion/:id
DELETE /habitacion/1

// Obtener habitaciones por tipo
// GET /habitacion/tipo?tipo=doble
GET /habitacion/tipo?tipo=doble

// Obtener habitaciones por estado
// GET /habitacion/estado?estado=libre
GET /habitacion/estado?estado=libre

// Obtener habitaciones por rango de precio_base
// GET /habitacion/rango-precio?precioMin=50&precioMax=150
GET /habitacion/rango-precio?precioMin=50&precioMax=150

// Buscar habitaciones por número exacto
// GET /habitacion/buscar-numero?numero=101
GET /habitacion/buscar-numero?numero=101
```

## 3. contacto_emergencia
```http
// Crear un nuevo contacto de emergencia
// POST /contacto-emergencia
// Body example:
// {
//   "id_huesped": 1,
//   "nombre": "Juan Perez",
//   "telefono": "123456789",
//   "parentesco": "Hermano"
// }
POST /contacto-emergencia

// Obtener todos los contactos de emergencia
// GET /contacto-emergencia
GET /contacto-emergencia

// Obtener un contacto de emergencia por ID
// GET /contacto-emergencia/:id
GET /contacto-emergencia/1

// Actualizar un contacto de emergencia por ID
// PUT /contacto-emergencia/:id
// Body example:
// {
//   "telefono": "987654321"
// }
PUT /contacto-emergencia/1

// Eliminar un contacto de emergencia por ID
// DELETE /contacto-emergencia/:id
DELETE /contacto-emergencia/1

// Buscar contactos por nombre parcial
// GET /contacto-emergencia/buscar?nombre=Juan
GET /contacto-emergencia/buscar?nombre=Juan

// Obtener contactos por id_huesped
// GET /contacto-emergencia/huesped?id_huesped=1
GET /contacto-emergencia/huesped?id_huesped=1
```

## 4. detalle_factura
```http
// Crear un nuevo detalle de factura
// POST /detalle-factura
// Body example:
// {
//   "id_factura": 1,
//   "id_servicio": 2,
//   "cantidad": 3,
//   "precio_unitario": 100.00
// }
POST /detalle-factura

// Obtener todos los detalles de factura
// GET /detalle-factura
GET /detalle-factura

// Obtener un detalle de factura por ID
// GET /detalle-factura/:id
GET /detalle-factura/1

// Actualizar un detalle de factura por ID
// PUT /detalle-factura/:id
// Body example:
// {
//   "cantidad": 5
// }
PUT /detalle-factura/1

// Eliminar un detalle de factura por ID
// DELETE /detalle-factura/:id
DELETE /detalle-factura/1

// Obtener detalles por id_factura
// GET /detalle-factura/factura?id_factura=1
GET /detalle-factura/factura?id_factura=1

// Obtener detalles por id_servicio
// GET /detalle-factura/servicio?id_servicio=2
GET /detalle-factura/servicio?id_servicio=2
```

## 5. detalle_reserva
```http
// Crear un nuevo detalle de reserva
// POST /detalle-reserva
// Body example:
// {
//   "id_reserva": 1,
//   "id_habitacion": 101,
//   "precio": 120.00
// }
POST /detalle-reserva

// Obtener todos los detalles de reserva
// GET /detalle-reserva
GET /detalle-reserva

// Obtener un detalle de reserva por ID
// GET /detalle-reserva/:id
GET /detalle-reserva/1

// Actualizar un detalle de reserva por ID
// PUT /detalle-reserva/:id
// Body example:
// {
//   "precio": 130.00
// }
PUT /detalle-reserva/1

// Eliminar un detalle de reserva por ID
// DELETE /detalle-reserva/:id
DELETE /detalle-reserva/1

// Obtener detalles por id_reserva
// GET /detalle-reserva/reserva?id_reserva=1
GET /detalle-reserva/reserva?id_reserva=1

// Obtener detalles por id_habitacion
// GET /detalle-reserva/habitacion?id_habitacion=101
GET /detalle-reserva/habitacion?id_habitacion=101
```

## 6. factura
```http
// Crear una nueva factura
// POST /factura
// Body example:
// {
//   "monto_total": 150.00,
//   "metodo_pago": "efectivo"
// }
POST /factura

// Obtener todas las facturas
// GET /factura
GET /factura

// Obtener una factura por ID
// GET /factura/:id
GET /factura/1

// Actualizar una factura por ID
// PUT /factura/:id
// Body example:
// {
//   "monto_total": 160.00
// }
PUT /factura/1

// Eliminar una factura por ID
// DELETE /factura/:id
DELETE /factura/1

// Obtener facturas por rango de monto_total
// GET /factura/rango-monto?montoMin=100&montoMax=200
GET /factura/rango-monto?montoMin=100&montoMax=200

// Obtener facturas por método de pago
// GET /factura/metodo-pago?metodo=efectivo
GET /factura/metodo-pago?metodo=efectivo
```

## 7. historial_mantenimiento
```http
// Crear un nuevo historial de mantenimiento
// POST /historial-mantenimiento
// Body example:
// {
//   "id_habitacion": 1,
//   "fecha_inicio": "2024-01-01T00:00:00Z",
//   "fecha_fin": "2024-01-05T00:00:00Z",
//   "descripcion": "Reparación de aire acondicionado",
//   "estado": "pendiente",
//   "tecnico": "Juan Pérez"
// }
POST /historial-mantenimiento

// Obtener todos los historiales de mantenimiento
// GET /historial-mantenimiento
GET /historial-mantenimiento

// Obtener un historial de mantenimiento por ID
// GET /historial-mantenimiento/:id
GET /historial-mantenimiento/1

// Actualizar un historial de mantenimiento por ID
// PUT /historial-mantenimiento/:id
// Body example:
// {
//   "estado": "completado"
// }
PUT /historial-mantenimiento/1

// Eliminar un historial de mantenimiento por ID
// DELETE /historial-mantenimiento/:id
DELETE /historial-mantenimiento/1
```

## 8. huesped
```http
// Crear un huésped
// POST /huesped
// Body example:
// {
//   "nombre": "Carlos",
//   "apellidos": "Gomez",
//   "email": "carlos@example.com",
//   "telefono": "555-9876"
// }
POST /huesped

// Obtener todos los huéspedes
// GET /huesped
GET /huesped

// Obtener un huésped por ID
// GET /huesped/:id
GET /huesped/1

// Actualizar un huésped por ID
// PUT /huesped/:id
// Body example:
// {
//   "telefono": "555-4321"
// }
PUT /huesped/1

// Eliminar un huésped por ID
// DELETE /huesped/:id
DELETE /huesped/1
```

## 9. log_actividad
```http
// Crear un nuevo log de actividad
// POST /log-actividad
// Body example:
// {
//   "id_usuario": 1,
//   "accion": "Login exitoso",
//   "fecha": "2024-06-01T12:00:00Z"
// }
POST /log-actividad

// Obtener todos los logs de actividad
// GET /log-actividad
GET /log-actividad

// Obtener un log de actividad por ID
// GET /log-actividad/:id
GET /log-actividad/1

// Obtener logs por usuario
// GET /log-actividad/usuario/:id_usuario
GET /log-actividad/usuario/1

// Buscar logs por acción parcial
// GET /log-actividad/buscar/:accion
GET /log-actividad/buscar/Login

// Actualizar un log de actividad por ID
// PUT /log-actividad/:id
// Body example:
// {
//   "accion": "Logout"
// }
PUT /log-actividad/1

// Eliminar un log de actividad por ID
// DELETE /log-actividad/:id
DELETE /log-actividad/1
```

## 10. reserva
```http
// Crear una nueva reserva
// POST /reserva
// Body example:
// {
//   "fecha_inicio": "2023-07-01",
//   "fecha_fin": "2023-07-05",
//   "id_huesped": 1,
//   "id_habitacion": 2
// }
POST /reserva

// Obtener todas las reservas
// GET /reserva
GET /reserva

// Obtener una reserva por ID
// GET /reserva/:id
GET /reserva/1

// Actualizar una reserva por ID
// PUT /reserva/:id
// Body example:
// {
//   "fecha_fin": "2023-07-06"
// }
PUT /reserva/1

// Eliminar una reserva por ID
// DELETE /reserva/:id
DELETE /reserva/1
```

## 11. servicio_adicional
```http
// Crear un nuevo servicio adicional
// POST /servicio-adicional
// Body example:
// {
//   "nombre": "Desayuno",
//   "precio": 10.00
// }
POST /servicio-adicional

// Obtener todos los servicios adicionales
// GET /servicio-adicional
GET /servicio-adicional

// Obtener un servicio adicional por ID
// GET /servicio-adicional/:id
GET /servicio-adicional/1

// Actualizar un servicio adicional por ID
// PUT /servicio-adicional/:id
// Body example:
// {
//   "precio": 12.00
// }
PUT /servicio-adicional/1

// Eliminar un servicio adicional por ID
// DELETE /servicio-adicional/:id
DELETE /servicio-adicional/1
```

## 12. usuario
```http
// Crear un usuario
// POST /usuario
// Body example:
// {
//   "nombre_usuario": "admin",
//   "rol": "admin",
//   "password": "123456"
// }
POST /usuario

// Obtener todos los usuarios
// GET /usuario
GET /usuario

// Obtener un usuario por ID
// GET /usuario/:id
GET /usuario/1

// Actualizar un usuario por ID
// PUT /usuario/:id
// Body example:
// {
//   "password": "newpassword"
// }
PUT /usuario/1

// Eliminar un usuario por ID
// DELETE /usuario/:id
DELETE /usuario/1

// Obtener usuarios por rol
// GET /usuario/rol?rol=admin
GET /usuario/rol?rol=admin

// Buscar usuarios por nombre parcial
// GET /usuario/buscar?nombre=Juan
GET /usuario/buscar?nombre=Juan

// Buscar usuario por email exacto
// GET /usuario/email?email=correo@example.com
GET /usuario/email?email=correo@example.com

// Obtener usuarios con último acceso después de una fecha dada
// GET /usuario/activos-recientes?fecha=2023-01-01T00:00:00Z
GET /usuario/activos-recientes?fecha=2023-01-01T00:00:00Z
