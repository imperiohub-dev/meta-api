import { Router } from 'express';
import * as visionController from '../controllers/vision.controller';

const router = Router();

// GET /api/visiones
router.get('/', visionController.getAll);

// GET /api/visiones/:id
router.get('/:id', visionController.getById);

// POST /api/visiones (upsert)
router.post('/', visionController.upsert);

// DELETE /api/visiones/:id
router.delete('/:id', visionController.deleteById);

export default router;
