import type { Request, Response } from 'express';
import { CreateTaskUseCase } from '../domain/useCase/auth/Create.js';
import { ListTasksUseCase } from '../domain/useCase/tasks/List.js';
import { GetTaskByIdUseCase } from '../domain/useCase/tasks/GetTaskByIdUseCase.js';
import { UpdateTaskUseCase } from '../domain/useCase/tasks/Update.js';
import { DeleteTaskUseCase } from '../domain/useCase/tasks/Delete.js';
import type { TaskStatus } from '../domain/entity/Task.js';

export class TaskController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.body;
      const userId = req.userId!; 
      const createTaskUseCase = new CreateTaskUseCase();
      const task = await createTaskUseCase.execute(title, userId);
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const status = req.query.status as TaskStatus | undefined;
      const listTasksUseCase = new ListTasksUseCase();
      const tasks = await listTasksUseCase.execute(userId, status);
      res.json(tasks);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const userId = req.userId!;
      const getTaskByIdUseCase = new GetTaskByIdUseCase();
      const task = await getTaskByIdUseCase.execute(id, userId);
      res.json(task);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const { title, status } = req.body;
      const userId = req.userId!;
      const updateTaskUseCase = new UpdateTaskUseCase();
      const task = await updateTaskUseCase.execute(id, userId, title, status);
      res.json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const userId = req.userId!;
      const deleteTaskUseCase = new DeleteTaskUseCase();
      await deleteTaskUseCase.execute(id, userId);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
