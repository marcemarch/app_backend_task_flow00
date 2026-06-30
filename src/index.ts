import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health';
import usersRouter from './routes/users';
import projectsRouter from './routes/projects';
dotenv.config();
const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/health', healthRouter);
app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.get('/', (req: Request, res: Response) => {
res.json({
project: 'TaskFlow API',
version: '1.1.0',
clase: 2,
endpoints: {
  health: 'GET /health',
users: '/api/users',
projects: '/api/projects',
},
});
});
app.use((req: Request, res: Response) => {
res.status(404).json({ error: "Ruta no encontrada", path: req.path });
});
app.listen(PORT, () => {
console.log(`\n🚀 TaskFlow API v2 — http://localhost:${PORT}`);
console.log(`👥 Usuarios: http://localhost:${PORT}/api/users`);
console.log(`📁 Proyectos: http://localhost:${PORT}/api/projects\n`);
});
export default app;
  