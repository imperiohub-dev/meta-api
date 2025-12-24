import { Router } from 'express';
import * as metaController from '../controllers/meta.controller';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();

router.use(authenticateToken);

// GET /api/metas
router.get('/', metaController.getAll);

// GET /api/metas/:id
router.get('/:id', metaController.getById);

// POST /api/metas (upsert)
router.post('/', metaController.upsert);

// DELETE /api/metas/:id
router.delete('/:id', metaController.deleteById);

export default router;
