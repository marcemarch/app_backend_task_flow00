# TaskFlow API

API REST para la gestión de tareas, construida con Express 5 + TypeScript + PostgreSQL.

## Estado del proyecto

Proyecto en fase inicial. Por ahora se ha configurado la estructura base del servidor con un endpoint de health check que verifica la conexión a la base de datos.

## Stack tecnológico

- **Node.js** — Entorno de ejecución
- **Express 5** — Framework web
- **TypeScript 6.0** — Lenguaje con tipado estático
- **PostgreSQL + pg** — Base de datos relacional
- **ts-node-dev** — Recarga automática en desarrollo

## Requisitos previos

- Node.js >= 18
- PostgreSQL corriendo localmente

## Instalación

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd taskflow-api

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con los valores correspondientes

# 4. Iniciar en modo desarrollo
npm run dev
```

## Variables de entorno

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `PORT` | Puerto del servidor | `3000` |
| `DATABASE_URL` | Cadena de conexión a PostgreSQL | — |
| `NODE_ENV` | Entorno de ejecución | `development` |

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia servidor con recarga automática |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Ejecuta la compilación producida |

## Estructura del proyecto

```
taskflow-api/
├── src/
│   ├── index.ts              # Punto de entrada, middlewares globales, rutas y listen
│   ├── config/
│   │   └── database.ts       # Pool de conexión a PostgreSQL
│   └── routes/
│       └── health.ts         # GET /health — verifica estado del servidor y BD
├── dist/                     # Compilación (gitignorado)
├── .env                      # Variables de entorno (gitignorado)
├── .env.example              # Plantilla de variables de entorno
├── .gitignore
├── AGENTS.md                 # Guía para agentes de IA
├── package.json
├── tsconfig.json
└── README.md
```

## Endpoints

### `GET /`

Información general de la API.

```json
{
  "message": "TaskFlow API — Clase 1",
  "version": "1.0.0",
  "docs": "/health"
}
```

### `GET /health`

Verifica que el servidor y la conexión a PostgreSQL estén funcionando.

**Respuesta exitosa (200):**
```json
{
  "status": "ok",
  "message": "TaskFlow API funcionando correctamente",
  "database": {
    "status": "connected",
    "timestamp": "2026-06-23T..."
  },
  "environment": "development"
}
```

**Respuesta con error de BD (500):**
```json
{
  "status": "error",
  "message": "Error de conexión a la base de datos",
  "database": {
    "status": "disconnected"
  }
}
```

## Lo que se ha implementado

- [x] Configuración inicial del proyecto con TypeScript
- [x] Servidor Express 5 con middlewares globales (CORS, JSON, URL-encoded)
- [x] Pool de conexión a PostgreSQL usando `pg`
- [x] Endpoint `GET /health` con verificación de base de datos
- [x] Endpoint `GET /` con información de la API
- [x] Manejador de rutas no encontradas (404)
- [ ] CRUD de tareas (pendiente)
- [ ] Autenticación y autorización (pendiente)
