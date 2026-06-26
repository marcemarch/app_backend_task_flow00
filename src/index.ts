import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import healthRouter from './routes/health';
import usersRoute from './routes/users';
import { swaggerSpec } from './config/swagger';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares globales ──────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Documentación Swagger ────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Rutas ────────────────────────────────────────
app.use('/health', healthRouter);
app.use('/api/users', usersRoute);

// Ruta raíz informativa
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: '🚀 TaskFlow API — Clase 1',
    version: '1.0.0',
    docs: '/api-docs',
  });
});

// ── Middleware de errores no encontrados ─────────
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ── Iniciar servidor ─────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Servidor TaskFlow corriendo en http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
});

export default app;
