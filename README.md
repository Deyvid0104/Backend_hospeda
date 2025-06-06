# Hospeda+ Backend

API RESTful robusta y escalable para el sistema de gestión hotelera Hospeda+, desarrollada con NestJS y TypeScript. Proporciona una arquitectura modular con autenticación JWT, gestión de base de datos MySQL mediante TypeORM y un completo conjunto de endpoints para la administración hotelera.

## 🚀 Características Principales

### 1. Sistema de Autenticación y Autorización
- Autenticación JWT con Passport
- Control de acceso basado en roles
- Encriptación de contraseñas con bcrypt
- Validación de tokens
- Protección de rutas por roles
- Manejo de sesiones seguro

### 2. Gestión de Reservas
- CRUD completo de reservas
- Validación de disponibilidad en tiempo real
- Manejo transaccional para integridad de datos
- Estados de reserva (confirmada, cancelada)
- Asignación automática de habitaciones
- Validaciones de negocio:
  - Disponibilidad de habitaciones
  - Fechas válidas
  - Capacidad de habitaciones
  - Existencia de huésped

### 3. Sistema de Facturación
- Generación automática de facturas
- Múltiples métodos de pago:
  - Efectivo
  - Tarjeta
  - Transferencia
- Estados de factura:
  - Pendiente
  - Pagada
  - Anulada
- Cálculo automático de:
  - Montos totales
  - Descuentos
  - Impuestos
- Detalles itemizados de servicios

### 4. Gestión de Huéspedes
- Registro completo de información
- Validación de datos únicos:
  - Email
  - Documento de identidad
- Historial de reservas
- Contactos de emergencia
- Búsqueda y filtrado avanzado

### 5. Sistema de Habitaciones
- Gestión de estados:
  - Libre
  - Ocupada
  - Limpieza
  - Mantenimiento
- Tipos de habitación:
  - Individual
  - Doble
  - Triple
  - Dormitorio
- Control de:
  - Precios base
  - Capacidad
  - Mantenimiento
  - Disponibilidad

## 🛠️ Tecnologías Utilizadas

### Core
- **NestJS**: ^11.0.1
- **TypeScript**: ^5.7.3
- **MySQL**: ^2.18.1
- **TypeORM**: ^0.3.22

### Autenticación y Seguridad
- **@nestjs/jwt**: ^11.0.0
- **@nestjs/passport**: ^11.0.5
- **bcrypt**: ^5.1.1
- **passport-jwt**: ^4.0.1

### Validación y Transformación
- **class-validator**: ^0.14.1
- **class-transformer**: ^0.5.1

### Testing
- **Jest**: ^29.7.0
- **Supertest**: ^7.0.0

## 📦 Instalación y Configuración

### Requisitos del Sistema
- Node.js 18.17 o superior
- npm 9.x o superior
- MySQL 8.0+
- Git

### Pasos de Instalación

1. **Clonar el Repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd hospeda-backend
```

2. **Instalar Dependencias**
```bash
npm install
```

3. **Configurar Variables de Entorno**
```bash
# Crear archivo .env
URL=localhost
USUARIO=tu_usuario
PASSWORD=tu_contraseña
DBNAME=hospeda_db
JWT_SECRET=tu_secret_key
```

## 🚦 Comandos Disponibles

### Desarrollo
```bash
# Desarrollo con hot-reload
npm run start:dev

# Modo debug
npm run start:debug

# Producción
npm run start:prod
```

### Testing
```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura
npm run test:cov
```

### Calidad de Código
```bash
# Linting
npm run lint

# Formateo
npm run format
```

## 📡 API Endpoints

### Autenticación
```http
POST /auth/login
# Body: { "email": "user@example.com", "contraseña": "password" }
```

### Reservas
```http
GET /reserva
GET /reserva/:id
POST /reserva
PUT /reserva/:id
DELETE /reserva/:id
```

### Habitaciones
```http
GET /habitacion
GET /habitacion/:id
POST /habitacion
PUT /habitacion/:id
DELETE /habitacion/:id
GET /habitacion/tipo?tipo=doble
GET /habitacion/estado?estado=libre
```

### Huéspedes
```http
GET /huesped
GET /huesped/:id
POST /huesped
PUT /huesped/:id
DELETE /huesped/:id
```

### Facturas
```http
GET /factura
GET /factura/:id
POST /factura
PUT /factura/:id
DELETE /factura/:id
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Configuración principal
│   ├── app.module.ts      # Módulo raíz
│   └── main.ts           # Punto de entrada
├── auth/                  # Autenticación
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── jwt.strategy.ts
├── reserva/              # Módulo de reservas
├── habitacion/           # Módulo de habitaciones
├── huesped/              # Módulo de huéspedes
├── factura/              # Módulo de facturación
└── shared/               # Recursos compartidos
```

## 🔒 Seguridad

### Autenticación
- JWT con expiración configurable
- Refresh tokens
- Blacklisting de tokens

### Autorización
- Roles: admin, recepcionista
- Guards personalizados
- Decoradores de roles

### Protección
- Rate limiting
- CORS configurado
- Helmet para headers HTTP
- Validación de datos

## 🔄 Base de Datos

### Configuración TypeORM
```typescript
TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.URL,
  port: 30306,
  username: process.env.USUARIO,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
  autoLoadEntities: true,
  synchronize: true,
})
```

### Entidades Principales
- Reserva
- Habitacion
- Huesped
- Factura
- Usuario
- ContactoEmergencia

## 🚀 Despliegue

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
```

### Kubernetes
- Configuraciones en `/deploy`
- Services y Deployments
- ConfigMaps y Secrets

## 📊 Monitoreo y Logging

### Logging
- Winston para logs estructurados
- Niveles: ERROR, WARN, INFO, DEBUG
- Rotación de logs

### Métricas
- Endpoints de health check
- Prometheus metrics
- Grafana dashboards

## 🤝 Contribución

### Estándares de Código
- Seguir guía de estilo TypeScript
- Documentar con JSDoc
- Tests unitarios para nueva funcionalidad
- Mantener la arquitectura modular

### Proceso
1. Fork del repositorio
2. Crear rama feature
3. Commit cambios
4. Push a la rama
5. Crear Pull Request

## 📄 Licencia

Este proyecto pertenece a Deyver Rios - ASIR

---

**Hospeda+ Backend** - API Robusta para Gestión Hotelera Profesional
