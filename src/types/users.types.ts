import { User } from '@prisma/client';

// Tipo público: excluye passwordHash de las respuestas de la API
export type UserPublic = Omit<User, 'passwordHash'>;

// DTO para crear un usuario (Data Transfer Object)
export interface CreateUserDto {
  name: string;
  email: string;
  password: string;  // Se guardará como passwordHash en Clase 3 con bcrypt
}

// DTO para actualizar un usuario (todos los campos opcionales)
export interface UpdateUserDto {
  name?: string;
  email?: string;
}
