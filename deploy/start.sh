#!/bin/sh

SCRIPT_DIR=$(dirname "$0")
cd "$SCRIPT_DIR"

LOGFILE="$SCRIPT_DIR/startup.log"
echo "=== Iniciando script start.sh ===" > "$LOGFILE"

log() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") - $1" >> "$LOGFILE"
}

log "Directorio actual: $SCRIPT_DIR"

# Cargar variables de entorno
if [ -z "$PUERTO" ]; then
  if [ -f "$SCRIPT_DIR/.env" ]; then
    log "Modo Docker local: cargando variables desde .env..."
    set -o allexport
    . "$SCRIPT_DIR/.env"
    set +o allexport
  else
    log "Archivo .env no encontrado y variable PUERTO no definida."
  fi
else
  log "Modo Kubernetes: las variables ya están definidas por el entorno."
fi

# Verificación de variables críticas
if [ -z "$PUERTO" ] || [ -z "$DBNAME" ] || [ -z "$URL" ]; then
  log "❌ Variables de entorno críticas no definidas. Abortando."
  echo "Error: Variables de entorno críticas no definidas."
  exit 1
fi

log "✅ Variables cargadas:"
log "PUERTO=$PUERTO"
log "DBNAME=$DBNAME"
log "URL=$URL"
log "PUERTO_DB=$PUERTO_DB"
log "USUARIO=$USUARIO"
log "PASSWORD=********"
log "PASSWORD_KEY=********"

log "🚀 Iniciando aplicación en el puerto $PUERTO..."
node dist/main >> "$LOGFILE" 2>&1

if [ $? -ne 0 ]; then
  log "❌ La aplicación terminó con error."
else
  log "✅ Aplicación iniciada correctamente."
fi

log "🕵️ Shell de espera activa para inspección del contenedor..."
tail -f /dev/null
