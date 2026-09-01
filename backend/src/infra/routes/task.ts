import { Router } from 'express';
import { authMiddleware } from '../../middlewares/Auth.js';
import { TaskController } from '../../controllers/Task.js';

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.use(authMiddleware);

taskRoutes.post('/', taskController.create);
taskRoutes.get('/', taskController.list);
taskRoutes.get('/:id', taskController.getById);
taskRoutes.put('/:id', taskController.update);
taskRoutes.delete('/:id', taskController.delete);

export { taskRoutes };
