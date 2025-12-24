import { Router } from 'express';
import * as misionController from '../controllers/mision.controller';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();

router.use(authenticateToken);

// GET /api/misiones
router.get('/', misionController.getAll);

// GET /api/misiones/:id
router.get('/:id', misionController.getById);

// POST /api/misiones (upsert)
router.post('/', misionController.upsert);

// DELETE /api/misiones/:id
router.delete('/:id', misionController.deleteById);

export default router;
