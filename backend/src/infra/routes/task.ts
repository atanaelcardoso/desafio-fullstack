import { Router } from 'express';
import { authMiddleware } from '../../middlewares/Auth.js';
import { TaskController } from '../../controllers/Task.js';

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.use(authMiddleware);

taskRoutes.post('/', (req, res) => taskController.create(req, res));
taskRoutes.get('/', (req, res) => taskController.list(req, res));
taskRoutes.get('/:id', (req, res) => taskController.getById(req, res));
taskRoutes.put('/:id', (req, res) => taskController.update(req, res));
taskRoutes.delete('/:id', (req, res) => taskController.delete(req, res));

export { taskRoutes };
