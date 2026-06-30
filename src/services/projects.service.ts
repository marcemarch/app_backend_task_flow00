import prisma from '../config/prisma';
import { CreateProjectDto, UpdateProjectDto, ProjectPublic } from
'../types/project.types';
export const projectsService = {
// Lista todos los proyectos con el conteo de tareas de cada uno
async findAll() {
return prisma.project.findMany({
orderBy: { createdAt: "desc" },
include: {
// _count agrega un campo con el número de registros relacionados
// Es mucho más eficiente que cargar todas las tareas
_count: { select: { tasks: true } },
},
});
},
// Obtiene un proyecto con su dueño y el conteo de tareas
async findById(id: string) {
return prisma.project.findUnique({
where: { id },
include: {
    owner: { select: { id: true, name: true, email: true } },
_count: { select: { tasks: true } },
},
});
},
async create(data: CreateProjectDto): Promise<ProjectPublic> {
return prisma.project.create({
data: {
name: data.name,
description: data.description,
ownerId: data.ownerId,
},
});
},
async update(id: string, data: UpdateProjectDto): Promise<ProjectPublic> {
return prisma.project.update({
where: { id },
data,
});
},
async remove(id: string): Promise<void> {
await prisma.project.delete({ where: { id } });
},
};