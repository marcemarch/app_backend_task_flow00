import { Project } from '@prisma/client';

export type ProjectPublic = Project;

export interface CreateProjectDto {
    name: string;
    description?: string;
    ownerId: string;
}
export interface UpdateProjectDto {
    name?: string;
    description?: string;
}