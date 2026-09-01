import { inMemoryDatabase } from "../../../infra/database/Database.js";
import type { Task, TaskStatus } from "../../entity/Task.js";

export class UpdateTaskUseCase {
  async execute(id: string, userId: string, title?: string, status?: TaskStatus): Promise<Task> {
    const taskIndex = inMemoryDatabase.tasks.findIndex(t => t.id === id && t.userId === userId);

    if (taskIndex === -1) {
      throw new Error('Tarefa não encontrada.');
    }

    const currentTask = inMemoryDatabase.tasks[taskIndex];
    if (!currentTask) {
      throw new Error('Tarefa não encontrada no banco de dados.');
    }

    if (currentTask.status === 'concluído') {
      throw new Error('Tarefas concluídas não podem ser editadas.');
    }

    if (title) currentTask.title = title;
    if (status) currentTask.status = status;

    inMemoryDatabase.tasks[taskIndex] = currentTask;
    return currentTask;
  }
}
