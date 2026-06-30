import { Router } from 'express';
import { projectsController } from '../controllers/projects.controller';
const router = Router();
router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getById);
router.post('/', projectsController.create);
router.put('/:id', projectsController.update);
router.delete('/:id', projectsController.remove);
export default router;  