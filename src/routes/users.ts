import { Router } from 'express';
import { usersController } from '../controllers/users.controller';
const router = Router();
router.get('/', usersController.getAll); // GET /api/users
router.get('/:id', usersController.getById); // GET /api/users/:id
router.post('/', usersController.create); // POST /api/users
router.put('/:id', usersController.update); // PUT /api/users/:id
router.delete('/:id', usersController.remove); // DELETE /api/users/:id
export default router;
 