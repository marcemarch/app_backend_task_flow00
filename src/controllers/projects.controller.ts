import { Request, Response } from 'express';
import { projectsService } from '../services/projects.service';
import { CreateProjectDto, UpdateProjectDto } from '../types/project.types';
export const projectsController = {
async getAll(req: Request, res: Response): Promise<void> {
try {
const projects = await projectsService.findAll();
res.json({ data: projects, count: projects.length });
} catch (error) {
res.status(500).json({ error: "Error al obtener proyectos" });
}
},
async getById(req: Request, res: Response): Promise<void> {
try {
const project = await projectsService.findById(req.params.id);
if (!project) {
res.status(404).json({ error: "Proyecto no encontrado" });
return;
}
res.json({ data: project });
} catch (error) {
res.status(500).json({ error: "Error al obtener el proyecto" });
}
},
async create(req: Request, res: Response): Promise<void> {
try {
const { name, description, ownerId } = req.body as CreateProjectDto;
if (!name || !ownerId) {
res.status(400).json({ error: "name y ownerId son requeridos" });
return;
}
const project = await projectsService.create({ name, description, ownerId
});
res.status(201).json({ data: project });
} catch (error: any) {
if (error?.code === 'P2003') {
// P2003 = Foreign key constraint: el ownerId no existe en users
res.status(400).json({ error: "El ownerId no existe como usuario" });
return;
}
res.status(500).json({ error: "Error al crear el proyecto" });
}
},
async update(req: Request, res: Response): Promise<void> {
try {
const { name, description } = req.body as UpdateProjectDto;
const project = await projectsService.update(req.params.id, { name,
description });
res.json({ data: project });
} catch (error: any) {
if (error?.code === 'P2025') {
res.status(404).json({ error: "Proyecto no encontrado" });
return;
}
res.status(500).json({ error: "Error al actualizar el proyecto" });
}
},
async remove(req: Request, res: Response): Promise<void> {
try {
await projectsService.remove(req.params.id);
res.status(204).send();
} catch (error: any) {
if (error?.code === 'P2025') {
res.status(404).json({ error: "Proyecto no encontrado" });
return;
}
res.status(500).json({ error: "Error al eliminar el proyecto" });
}
},
};