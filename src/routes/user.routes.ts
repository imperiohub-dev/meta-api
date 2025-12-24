import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();

router.use(authenticateToken);

// GET /api/users
router.get('/', userController.getAll);

// GET /api/users/:id
router.get('/:id', userController.getById);

// POST /api/users (upsert)
router.post('/', userController.upsert);

// DELETE /api/users/:id
router.delete('/:id', userController.deleteById);

export default router;
