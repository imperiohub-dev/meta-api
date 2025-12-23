import { Router } from 'express';
import * as objetivoController from '../controllers/objetivo.controller';

const router = Router();

// GET /api/objetivos
router.get('/', objetivoController.getAll);

// GET /api/objetivos/:id
router.get('/:id', objetivoController.getById);

// POST /api/objetivos (upsert)
router.post('/', objetivoController.upsert);

// DELETE /api/objetivos/:id
router.delete('/:id', objetivoController.deleteById);

export default router;
