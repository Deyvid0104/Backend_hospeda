# Build stage
FROM node:16-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Production stage
FROM node:16-alpine

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar la aplicación construida desde el stage anterior
COPY --from=builder /app/dist ./dist
COPY deploy/start.sh ./

# Dar permisos de ejecución al script de inicio
RUN chmod +x start.sh

# Exponer el puerto
EXPOSE 4000

# Iniciar la aplicación
ENTRYPOINT ["./start.sh"]
