import { Router } from 'express';
import { usersController } from '../controllers/users.controller';

const router = Router();

// GET  /api/users       — Listar todos los usuarios
router.get('/',    usersController.getAll);

// GET  /api/users/:id   — Obtener usuario por ID
router.get('/:id', usersController.getById);

// POST /api/users       — Crear nuevo usuario
router.post('/',   usersController.create);

// PUT  /api/users/:id   — Actualizar usuario
router.put('/:id', usersController.update);

// DELETE /api/users/:id — Eliminar usuario
router.delete('/:id', usersController.remove);

export default router;
