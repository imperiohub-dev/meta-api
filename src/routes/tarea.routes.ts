import { Router } from 'express';
import * as tareaController from '../controllers/tarea.controller';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();

router.use(authenticateToken);

// GET /api/tareas
router.get('/', tareaController.getAll);

// GET /api/tareas/:id
router.get('/:id', tareaController.getById);

// POST /api/tareas (upsert)
router.post('/', tareaController.upsert);

// DELETE /api/tareas/:id
router.delete('/:id', tareaController.deleteById);

export default router;
