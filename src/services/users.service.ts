import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import { CreateUserDto, UpdateUserDto, UserPublic } from '../types/users.types';

// Campos seguros que devolvemos al cliente (sin passwordHash)
const USER_SELECT = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
} satisfies Prisma.UserSelect;

export const usersService = {

  // Obtener todos los usuarios
  async findAll(): Promise<UserPublic[]> {
    return prisma.user.findMany({
      select: USER_SELECT,
      orderBy: { createdAt: "desc" },
    });
  },

  // Obtener usuario por ID
  async findById(id: string): Promise<UserPublic | null> {
    return prisma.user.findUnique({
      where: { id },
      select: USER_SELECT,
    });
  },

  // Crear usuario
  async create(data: CreateUserDto): Promise<UserPublic> {
    // NOTA: En Clase 3 usaremos bcrypt para hashear el password.
    // Por ahora lo guardamos en texto plano solo para desarrollo.
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.password, // TODO Clase 3: bcrypt.hash(data.password, 10)
      },
      select: USER_SELECT,
    });
  },

  // Actualizar usuario
  async update(id: string, data: UpdateUserDto): Promise<UserPublic> {
    return prisma.user.update({
      where: { id },
      data,
      select: USER_SELECT,
    });
  },

  // Eliminar usuario
  async remove(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  },

  // Verificar si un email ya existe (útil para evitar duplicados)
  async existsByEmail(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user !== null;
  },
};
